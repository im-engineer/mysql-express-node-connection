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
var msg = new hl7.Message("SENDING_APPLICATION",
    "SENDING_FACILITY",
    "RECEIVING_APPLICATION",
    "RECEIVING_FACILITY",
    "202203221200",
    "",
    "ADT^A08",
    "MSG00001",
    "P",
    "2.3.1"
)

msg.addSegment("EVN",
    "A08",
    "202203221200","","","USERNAME"
)

msg.addSegment("PID",
    "",
    "",
    "PATIENT_ID",
    "",
    "Smith^John",
    "",
    "19700101",
    "GENDER",
    "", "", "", "PHONE_NUMBER", "", "",
    "OTHER_ID",
    "","",""
)

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    //   console.log(ack.log());
});