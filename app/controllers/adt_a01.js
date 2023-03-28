var hl7 = require('simple-hl7');
//<-------------------------------------- SERVER ------------------------------------>
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
    console.log(msa)
    msa.setField(1, 'AR');
    res.ack.addSegment('ERR', err.message);
    res.end();
}); 

//Listen on port 7777
app.start(7777); //optionally pass encoding here, app.start(1234, 'latin-1');
//<-------------------------------------- SERVER ------------------------------------>
//<-------------------------------------- CLIENT ------------------------------------>


var client = hl7.Server.createTcpClient('localhost', 7777);


//create a message
var msg = new hl7.Message("OXV",
    "SendingFac",
    "ReceivingApp",
    "ReceivingFac",
    "20200303144501",
    "",
    "ADT^A02^ADT_A02",
    "MSGID123456789",
    "P",
    "2.5",
    "",
    "",
    "",
    "",
    ""
)

msg.addSegment("EVN",
    "A02",
    "20200303144501",
    "",
    "",
    "John^Smith"
)

msg.addSegment("PID",
    "1",
    "",
    "12345^^^HospitalA^MR",
    "",
    "Smith^John^^^Mr.",
    "",
    "19851004",
    "M",
    "",
    "",
    "1234 Main St.^^Anytown^MI^48000^USA",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "12345"
)

msg.addSegment("PV1",
    "",
    "E",
    "^^^WardA^RoomA",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "9876543210^Dr. Smith"
)

console.log('******sending message*****')
client.send (msg, function (err, ack) {
    console.log('******ack received*****')
});