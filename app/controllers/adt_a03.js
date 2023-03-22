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
var msg = new hl7.Message("OXV",
    "SENDING_FACILITY",
    "RECEIVING_APPLICATION",
    "RECEIVING_FACILITY",
    "20220319120000",
    "",
    "ADT^A03",
    "MESSAGE_CONTROL_ID",
    "P",
    "2.5"
)

msg.addSegment("EVN",
    "A03",
    "20220319120000"
)

msg.addSegment("PID",
    "",
    "",
    "PATIENT_ID_NUMBER",
    "",
    "PATIENT_LAST_NAME^PATIENT_FIRST_NAME^",
    "",
    "20220304",
    "M",
    "",
    "",
    "1234 Main St^^Springfield^IL^11111^USA^",
    "",
    "555-555-1234",
    "",
    "",
    "S",
    "",
    "PATIENT_ACCOUNT_NUMBER",
    "",
    "PATIENT_SOCIAL_SECURITY_NUMBER"
)

msg.addSegment("PV1",
    "",
    "I",
    "WARD_123^ROOM_456^BED_789^",
    "","","","","","","","","","","","","", "",
    "REFERRING_DOCTOR_LAST_NAME^REFERRING_DOCTOR_FIRST_NAME^",
    "", "",
    "ADMITTING_DOCTOR_LAST_NAME^ADMITTING_DOCTOR_FIRST_NAME^",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "20220319120000"
)

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
});