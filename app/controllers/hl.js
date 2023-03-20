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
    "ORU^R01", // Message Type
    "12345", //Message Control ID
    "P", //Processing ID
    "2.5",
    "",
    "",
    "AL",
    "NE",
    "")

msg.addSegment("PID",
    "1",
    "ABC123DF", //Patient ID
    "AND234DA_PID3", //Patient Identifier List
    "PID_4_ALTID", //Alternate Patient ID - PID
    "Patlast^Patfirst^Mid", //Patient Name
    "",
    "19670202",  //Date/Time of Birth
    "F",
    "",
    "",
    "4505 21 st^^LAKE COUNTRY^BC^V4V 2S7", //Patient Address
    "",
    "222-555-8484", //Phone Number
    "",
    "",
    "",
    "",
    "MF0050356/15" //Patient Account Number
)

msg.addSegment("OBR",
    "1",
    "",
    "12376", //Filler Order Number
    "oxv^Spo2", //Universal Service Identifier
    "R", //Priority_OBR
    "",
    "20120410160227", //Observation Date/Time
    "",
    "",
    "22^GOOF^GOOFY", //Collector identifier
    "",
    "",
    "Fasting: No",
    "201204101625", //Specimen recieved Date/Time
    "",
    "71^DUCK^DONALD", //Ordering Provider
    "",
    "",
    "",
    "",
    "",
    "201204101630", //Results Rpt/Status Chng - Date/Time
    "",
    "",
    "F", //Result Status
    "",
    "^^^^^R", //Quantity Time
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
    "85025" //Procedure Code
)

msg.addSegment("OBX",
    "1",
    "TX",  //Value Type
    "301.0500^Observation Type",   //Observation Identifier
    "",
    "Spo2",  //Observation Value
    "",
    "",
    "",
    "",
    "",
    "F",   //Observation Result Status 
    ""
)
msg.addSegment("OBX", "2", "TX", "301.0600^Observation Value", "", "83", "", "", "", "", "", "F", "")
msg.addSegment("OBX", "3", "TX", "301.0700^Parameter Type", "", "range", "", "", "", "F", "")
msg.addSegment("OBX", "4", "TX", "301.0900^Manufacturer", "", " OXV", "", "", "", "", "", "F", "")
msg.addSegment("OBX", "5", "TX", "301.1100^Status", "", "complete", "", "", "", "", "", "F", "")
msg.addSegment("OBX", "5", "TX", "301.1100^Type", "", "Low", "", "", "", "", "", "F", "")
msg.addSegment("OBX", "6", "TX", "301.1300^App Version / Firmware Version", "", "1.12 / 2.15", "", "", "", "", "", "F", "")
console.log('******sending message*****')
client.send(msg, function (err, ack) {
    console.log('******ack received*****')
    //   console.log(ack.log());
});
///////////////////CLIENT/////////////////////