var hl7 = require('simple-hl7');
///////////////////SERVER/////////////////////
var app = hl7.tcp();
app.use(function (req, res, next) {
    //req.msg is the HL7 message
    console.log('******message received*****')
    console.log(req.msg.log());
    next();
})
app.use(function (req, res, next) {
    //res.ack is the ACK
    //acks are created automatically
    //send the res.ack back
    console.log('******sending ack*****')
    res.end()
})
app.use(function (err, req, res, next) {
    //error handler
    //standard error middleware would be
    console.log('******ERROR*****')
    console.log(err);
    var msa = res.ack.getSegment('MSA');
    msa.setField(1, 'AR');
    res.ack.addSegment('ERR', err.message);
    res.end();
});
//Listen on port 7777
app.start(7777); //optionally pass encoding here, app.start(1234, 'latin-1');
///////////////////SERVER/////////////////////
///////////////////CLIENT/////////////////////
var client = hl7.Server.createTcpClient('localhost', 7777);
//create a message
var msg = new hl7.Message("OXV", //Sending Application
    "SendingFac", //Sending Facility
    "ReceivingApp", // Reciving Application
    "ReceivingFac", //Reciving Facility
    "202203171436", //Date/Time of message
    "",
    "PPR^PC1", // Message Type
    "12345", //Message Control ID
    "P", //Processing ID
    "2.5",
    "",
    "",
    "AL",
    "NE",
    ""
)

msg.addSegment("EVN",
    "PPR^PC1",
    "20210321120000",
    "",
    ""
)

msg.addSegment("PID",
    "1",
    "",
    "123456789",
    "^^^^PI",
    "",
    "DOE^JOHN^^^^^L",
    "", "19600101",
    "M",
    "",
    "",
    "123 Main St^^Anytown^MI^48000^^M~456 Maple Ave^^Othertown^MI^48111^^P",
    "",
    "555-1234",
    "",
    "",
    "M",
    "",
    "",
    "1234567890"
)

msg.addSegment("PV1",
    "1",
    "O",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
)

msg.addSegment("PRB",
    "1",
    "",
    "Hypertension",
    "20220321"
)

msg.addSegment("NTE",
    "1",
    "",
    "Allergies: Peanuts"
)

msg.addSegment("NTE",
    "1",
    "",
    "Notes: Patient has a history of high blood pressure"
)

msg.addSegment("NTE",
    "1",
    "",
    "Other: Patient is a smoker"
)

msg.addSegment("IN1",
    "1",
    "Payer123",
    "",
    "1234^Blue Cross^MI",
    "PO Box 12345^^Anytown^MI^48000",
    "",
    "555-5678",
    "","","","","","","",
    "123456789",
    "DOE^JOHN^^^^^L",
    "123 Main St^^Anytown^MI^48000^^M",
    "19600101",
    "M",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "20210321")


console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    //   console.log(ack.log());
});