const hl7 = require('simple-hl7');

const message = `MSH|^~\\&|OXV|1|Local^Reciver|Local^Facility|Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)||ADT^A01|599102|P|2.3\rEVN||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)|||||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)\rPID|1|641944cddf5137cf674005f7|65465465|641944cddf5137cf674005f7|Ajinkya^ajinkya||2023-03-21|male||1|111 DUCK ST^^FOWL^CA^999990000^^M|1|654654655||1|2||40007716^^^AccMgr^VN^1||||||||||||NO NK1|1|DUCK^HUEY|SO|3583 DUCK RD^^FOWL^CA^999990000|8885552222||Y|||||||||||||\rPV1|1|O|PREOP^101^1^1^^^S|3`;

const parser = new hl7.Parser({ segmentSeperator: '\r' });
const msg = parser.parse(message);


console.log("")
console.log("EVN DATA:")
const segment1 = msg.getSegment('EVN');
segment1.fields.forEach((field, index) => {
    console.log(`Field ${index + 1}: ${field.value}`);
});

console.log("")
console.log("PID DATA:")
const segments = msg.getSegment('PID');
segments.fields.forEach((field, index) => {
    console.log(`Field ${index + 1}: ${field.value}`);
});

console.log("")
console.log("PV1 DATA:")
const segment3 = msg.getSegment('PV1');
segment3.fields.forEach((field, index) => {
    console.log(`Field ${index + 1}: ${field.value}`);
});