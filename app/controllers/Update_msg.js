const hl7 = require('simple-hl7');

const message = 'MSH|^~\&|OXV|1|Local^Reciver|Local^Facility|20230405||ADT^A08|642d446a5377166fd69415a0|P642d446a5377166fd69415a0|2.3\nEVN||20230405|||||20230405 PID|1|642be4961c875fa18a687af2|7777777778|642be4961c875fa18a687af2|Siddhant^undefined||20230427|male||1|||444444444444|||||||||||||||||||||||||||||||||||||';

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
    EventFaclitiy: hl7msg.getSegment('EVN').getField(7),
    Unknown: hl7msg.getSegment('EVN').getField(8),
    ControlId: hl7msg.getSegment('EVN').getField(9),
    MRN: hl7msg.getSegment('EVN').getField(10),
    ID: hl7msg.getSegment('EVN').getField(11),
    Name: hl7msg.getSegment('EVN').getField(12),
    DateTime: hl7msg.getSegment('EVN').getField(14),
    Sex: hl7msg.getSegment('EVN').getField(15),
    Unknown: hl7msg.getSegment('EVN').getField(17),
    PhoneNumber: hl7msg.getSegment('EVN').getField(20),
    Unknown: hl7msg.getSegment('EVN').getField(57),

  }
}
console.log("🚀 ~ file: msg.js:41 ~ jsonmsg:", jsonmsg)
