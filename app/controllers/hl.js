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
    "OXV",
    "1",
    "Local^Reciver",
    "Local^Facility",
    "dateTime",
    "",
    "ORU^R01",
    "599102",
    "P",
    "2.3"
)
msg.addSegment("EVN",
    "",
    "dateTime",
    "",
    "",
    "Rohan",
)

msg.addSegment("PID",
    "",
    "",
    "1MT^0^M10",
    "",
    "Patient^Jonny^Dee^^DR",
    "Patient^Momma^Thee^^MS",
    "20040101000000",
    "M",
    "",
    "B",
    "555 Johnson Road^Apt. 555^Indianapolis^IN^46202^USA",
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
    "Indianapolis, IN",
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
)

msg.addSegment(
    "PV1",
    "1",
    "O",
    "^^^^^^^^MTRH^1^AMRS",
    "2",
    "",
    "",
    "1^Mamlin^Joseph^^^^^^^^8^M10^^AMRS",
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
    "",
    "",
    "",
    "",
    "20050217140000",
    "",
    "",
    "",
    "",
    "",
    "",
    "V"
)

msg.addSegment(
    "ORC",
    "RE",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "20050221130000",
    "1^Enterer^Ima^^^^^^^^^^^AMRS"
)

msg.addSegment(
    "OBR",
    "1",
    "",
    "",
    "1238^MEDICAL RECORD OBSERVATIONS^DCT",
    "",
    "",
    ""
)

msg.addSegment(
    "OBX",
    "1",
    "CE",
    "1082^REVIEW OF SYSTEMS, CENTRAL NERVOUS SYSTEM^DCT",
    "",
    "207^DEPRESSION^DCT",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "20050217204000"
)

msg.addSegment(
    "OBX",
    "2",
    "SN",
    "5497^CD4 COUNT^DCT",
    "",
    "<^10",
    "cells/mm3",
    "10-1500",
    "L",
    "",
    "",
    "F",
    "",
    "",
    "20050217204000"
)

msg.addSegment(
    "OBX",
    "3",
    "NM",
    "5089^WEIGHT (KG)^DCT",
    "",
    "25",
    "kg",
    "20-300",
    "L",
    "",
    "",
    "F",
    "",
    "",
    "20050217204000"
)

msg.addSegment(
    "OBX",
    "4",
    "TS",
    "1191^HISTORICAL DRUG STOP DATE^DCT",
    "",
    "20050101",
    "",
    "",
    "",
    "",
    "",
    "",
    "F",
    "",
    "",
    "",
    "20050217204000"
)

msg.addSegment(
    "MSA",
    "AR",
    "AMRS20050217152845"
)

msg.addSegment(
    "ERR",
    "",
    "PID^1^3^^2",
    "204",
    "E"
)

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    console.log(ack.log());
});