var hl7 = require('simple-hl7');
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
var msg = new hl7.Message(
    "FORMENTRY",
    "EPICADT",
    "AMRS",
    "HL7LISTENER",
    "AMRS",
    "20050217152845", //This field has 2 components
    "",
    "ORU^R01",
    "AMRS20050217152845",
    "P",
    "2.5",
    "1",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "1^AMRS-ELDORET^http://schemas.openmrs.org/2006/FormEntry/formId^URI",
    // "1817457",
    // "D",
    // "2.5"
);

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    console.log(ack.log());
});