const hl7 = require('simple-hl7');

const message = `MSH|^~\\&|OXV|1|Local^Reciver|Local^Facility|Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)||ADT^A01|599102|P|2.3\rEVN||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)|||||Tue Mar 21 2023 11:16:56 GMT+0530 (India Standard Time)\rPID|1|641944cddf5137cf674005f7|65465465|641944cddf5137cf674005f7|Ajinkya^ajinkya||2023-03-21|male||1|111 DUCK ST^^FOWL^CA^999990000^^M|1|654654655||1|2||40007716^^^AccMgr^VN^1||||||||||||NO NK1|1|DUCK^HUEY|SO|3583 DUCK RD^^FOWL^CA^999990000|8885552222||Y|||||||||||||\rPV1|1|O|PREOP^101^1^1^^^S|3`;

const parser = new hl7.Parser({ segmentSeperator: '\r' });
const msg = parser.parse(message);

const segment = msg.getSegment('MSH');
const segment1 = msg.getSegment('EVN');
const segment2 = msg.getSegment('PID');
const segment3 = msg.getSegment('PV1');

const fields = segment2.getField();

console.log("fields "+ fields)
for (let i = 0; i < fields.length; i++) {
    // console.log(`Field ${i + 1}: ${fields[i].value[0]}`, "mmmmm");
    console.log('Field ' + (i + 1) + JSON.stringify(fields[i]));
}

// console.log(segment);
// console.log(segment1);
// console.log(segment2);
// console.log(segment3);


const sendingApp = segment1.getField(7);
console.log(sendingApp);
