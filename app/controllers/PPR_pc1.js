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


var client = hl7.Server.createTcpClient('localhost', 7777);
//create a message
var msg = new hl7.Message("OXV",
    "SENDING_FACILITY",
    "RECEIVING_APPLICATION",
    "RECEIVING_FACILITY",
    "20230321090000",
    "",
    "PPR^PC1",
    "1234567",
    "P",
    "2.5",
    "", "", "", "", ""
)

msg.addSegment("PID",
    "1",
    "",
    "1234567^^^SENDING_FACILITY^MRN",
    "",
    "DOE^JANE^",
    "",
    "19800101",
    "F",
    "","",
    "123 Main St^^Anytown^NY^12345",
    "",
    "(555)555-1234",
    "", "", "S", "",
    "123456789",
    "123-45-6789",
    "", "", "", ""
)

msg.addSegment("PV2",
    "","","","", "", "", "",
    "20230321"
)

msg.addSegment("NTE",
    "1",
    "L",
    "Johns Spo2 is at high Risk"
)

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    //   console.log(ack.log());
});