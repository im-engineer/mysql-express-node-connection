const hl7 = require('simple-hl7');

const message = 'MSH|^~\&|OXVIRTUAL|1|OXSIMULATOR|Local^Facility|20230405||ORU^R01|642d4adc57a84ebfad7ad1e0|P642d4adc57a84ebfad7ad1e0|2.3\nEVN||Wed Apr 05 2023 10:18:04 GMT+0000 (Coordinated Universal Time)|||||Wed Apr 05 2023 10:18:04 GMT+0000 (Coordinated Universal Time)\nPID|1|642cf7c92b2eec630ac34614|568548848|642cf7c92b2eec630ac34614|PT122^PTL22||20040401|male||1||1|4844848490||1|2||40007716^^^AccMgr^VN^1||||||||||||NO NK1|1||||||Y|||||||||||||\nOBX|1|TX|63eb299d9c8b589d12ca858a^Spo2||52|%|||||F';

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
OBX:{
  SetID: hl7msg.getSegment('OBX').getField(1),
  ValueType:hl7msg.getSegment('OBX').getField(2),
  ObservationIdentifier: hl7msg.getSegment('OBX').getField(3),
  ObservationValue: hl7msg.getSegment('OBX').getField(5),
  Units: hl7msg.getSegment('OBX').getField(6),
  ObservationResultStatus: hl7msg.getSegment('OBX').getField(11),
}
}
console.log("🚀 ~ file: msg.js:41 ~ jsonmsg:", jsonmsg)
