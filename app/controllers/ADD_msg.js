const hl7 = require('simple-hl7');

const message = 'MSH|^~\&|OXV|1|Local^Reciver|Local^Facility|20230405||ADT^A01|642d40f664eab193efe93e23|P642d40f664eab193efe93e23|2.3\nEVN||20230405|||||20230405\nPID|1|642d40f464eab193efe93e1f|34564645|642d40f464eab193efe93e1f|JK^dk||20040401|male||1|||6546545656|||||||||||||||||||||||||||||||||||||\nPV1|1|O|PREOP^101^1^1^^^S|3	';

const evnFields = message.split('|');
console.log(evnFields[2]);



const parser = new hl7.Parser({ segmentSeperator: '\n' });
const hl7msg = parser.parse(message);
console.log("🚀 ~ file: msg.js:12 ~ hl7msg:", hl7msg)

const jsonmsg = {
  MSH: {
    FieldSeparator: hl7msg.header.fieldSeparator,
    EncodingCharacters: hl7msg.header.encodingCharacters,
    SendingApplication: hl7msg.header.sendingApplication,
    SendingFacility: hl7msg.header.sendingFacility,
    ReceivingApplication: hl7msg.header.receivingApplication,
    DateTime: hl7msg.header.dateTime,
    MessageType: hl7msg.header.messageType,
    MessageControlID: hl7msg.header.messageControlID,
    ProcessingID: hl7msg.header.processingID,
    VersionID: hl7msg.header.versionID,
  },
  EVN: {
    RecordedDateTime: hl7msg.getSegment('EVN').getField(2),
    EventFacility: hl7msg.getSegment('EVN').getField(7),
  },
  PID: {
    SetID: hl7msg.getSegment('PID').getField(1),
    PatientID: hl7msg.getSegment('PID').getField(2),
    PatientIdentifierList: hl7msg.getSegment('PID').getField(3),
    AlternatePatientId:hl7msg.getSegment('PID').getField(4),
    PatientName: hl7msg.getSegment('PID').getField(5),
    DateTimeOfBirth: hl7msg.getSegment('PID').getField(7),
    AdministrativeSex: hl7msg.getSegment('PID').getField(8),
    Race:hl7msg.getSegment('PID').getField(10),
    PhoneNumber:hl7msg.getSegment('PID').getField(13)
},
PV1:{
  SetID: hl7msg.getSegment('PV1').getField(1),
  PatientClass:hl7msg.getSegment('PV1').getField(2),
  AssignPatientLocation: hl7msg.getSegment('PV1').getField(3),
  AdmissionType: hl7msg.getSegment('PV1').getField(4),
}
}
console.log("🚀 ~ file: msg.js:41 ~ jsonmsg:", jsonmsg)
