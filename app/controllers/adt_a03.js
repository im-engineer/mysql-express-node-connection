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
    "1",
    "",
    "",
    "20050112154645",
    "",
    "ADT^A03",
    "59912415",
    "P",
    "2.3",
    "",
    ""
)

msg.addSegment("EVN",
    "A03",
    "20220319120000"
)

msg.addSegment("PID",
    "1",
    "",
    "10006579^^^1^MRN^1",
    "",
    "DUCK^DONALD^D",
    "",
    "19241010",
    "M",
    "",
    "1",
    "111^DUCK ST^^FOWL^CA^999990000^^M",
    "1",
    "8885551212",
    "8885551212",
    "1",
    "2",
    "",
    "40007716^^^AccMgr^VN^1",
    "123121234",
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
    "NO"
)

msg.addSegment("PV1",
    "1",
    "I",
    "IN1^214^1^1^^^S",
    "3",
    "",
    "IN1^214^1",
    "37^DISNEY^WALT^^^^^^AccMgr^^^^CI",
    "","",
    "01",
    "","","",
    "1",
    "","",
    "37^DISNEY^WALT^^^^^^AccMgr^^^^CI",
    "2",
    "40007716^^^AccMgr^VN",
    "4",
    "","","","","","", "", "", "", "", "", "", "", "", "",
    "1",
    "", "",
    "1",
    "",
    "P",
    "", "",
    "20050110045253",
    "20050112152000",
    "3115.89",
    "3115.89",
    "",
    ""
)

msg.addSegment("OBX",
    "1",
    "TX",
    "Discharge Note",
    "",
    "Patient discharged with stable vital signs and improved symptoms",
    "F",
    "",
    "",
    "",
    "",
    "",
    ""
)

console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
});