const hl7 = require('simple-hl7');

const message = 'MSH|^~\\&|OXV|1|Local^Reciver|Local^Facility|20230405||PPR^PC1|642d09ce35141bf3221f28fa|P642d09ce35141bf3221f28fa|2.3\nEVN||20230405|||||20230405\nPID|1|642d095935141bf3221f2875|undefined|642d095935141bf3221f2875|U2FsdGVkX18R40wQuhNn277BVhTdcotfMyHuKLqOBxA=^undefined||20230405|undefined||1|||undefined|||||||||||||||||||||||||||||||||||||\nNTE|1|L|Johns Spo2 is at high Risk';

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
    EventTypeCode: hl7msg.getSegment('EVN').getField(1),
    DateTime: hl7msg.getSegment('EVN').getField(2),
    RecordedDateTime: hl7msg.getSegment('EVN').getField(3),
    UserID: hl7msg.getSegment('EVN').getField(4),
    EventTypeReasonCode: hl7msg.getSegment('EVN').getField(5),
    OperatorID: hl7msg.getSegment('EVN').getField(6),
    EventOccurred: hl7msg.getSegment('EVN').getField(7),
  },
  PID: {
    SetID: hl7msg.getSegment('PID').getField(1),
    PatientID: hl7msg.getSegment('PID').getField(2),
    PatientIdentifierList: hl7msg.getSegment('PID').getField(3),
    AlternatePatientId:hl7msg.getSegment('PID').getField(4),
    PatientName: hl7msg.getSegment('PID').getField(5),
    DateTimeOfBirth: hl7msg.getSegment('PID').getField(7),
    AdministrativeSex: hl7msg.getSegment('PID').getField(8),
    PatientAddress:hl7msg.getSegment('PID').getField(11),
    PhoneNumber:hl7msg.getSegment('PID').getField(13)
},
NTE:{
  SetID: hl7msg.getSegment('NTE').getField(1),
  Comment: hl7msg.getSegment('NTE').getField(3),
}
}
console.log("🚀 ~ file: msg.js:41 ~ jsonmsg:", jsonmsg)
