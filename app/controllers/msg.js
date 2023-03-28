const hl7 = require('simple-hl7');

const message = 'MSH|^~\\&|OXV|1|Local^Reciver|Local^Facility|Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)||ADT^A01|599102|P|2.3\nEVN||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)|||||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)\nPID|1|641944cddf5137cf674005f7|65465465|641944cddf5137cf674005f7|Ajinkya^ajinkya||2023-03-21|male||1|111 DUCK ST^^FOWL^CA^999990000^^M|1|654654655||1|2||40007716^^^AccMgr^VN^1||||||||||||NO NK1|1|DUCK^HUEY|SO|3583 DUCK RD^^FOWL^CA^999990000|8885552222||Y|||||||||||||\nPV1|1|O|PREOP^101^1^1^^^S|3';

const parser = new hl7.Parser({ segmentSeperator: '\n' });
const hl7msg = parser.parse(message);

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
}}
console.log("🚀 ~ file: msg.js:41 ~ jsonmsg:", jsonmsg)
