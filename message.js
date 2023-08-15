import axios from 'axios';
import { Alert } from 'react-native';
import { encode } from 'base-64'; // base-64 패키지에서 encode 함수를 import

const TWILIO_ACCOUNT_SID = 'ACb5f6ce67650ff3df0ae47dcf440893a6';
const TWILIO_AUTH_TOKEN = '8be44209c8fda816e596fff0c8ada026';
const TWILIO_PHONE_NUMBER = '+17622499376';

const sendReservationNotification = (phoneNumber) => {
  const message = '송금 확인 후 예약 확정 문자가 전송됩니다.';

  const formData = new URLSearchParams();
  formData.append('To', phoneNumber);
  formData.append('From', TWILIO_PHONE_NUMBER);
  formData.append('Body', message);

  axios.post(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    formData,
    {
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      console.log(response.data);
      Alert.alert('예약 완료', '송금 확인 후 예약 확정 문자가 전송되었습니다.');
    })
    .catch(error => {
      console.error(error);
      Alert.alert('문자 전송 실패', '예약 확정 문자 전송에 실패했습니다. 나중에 다시 시도해주세요.');
    });
};

export default sendReservationNotification;
// import axios from 'axios';
// import React from 'react';

// import { encode as base64Encode } from 'base-64'; // base-64 library

// async function sendReservationNotification() {
//   const accountSid = 'ACb5f6ce67650ff3df0ae47dcf440893a6';
//   const authToken = '8be44209c8fda816e596fff0c8ada026';
//   const twilioPhoneNumber = '+17622499376';
//   const message = '예약이 완료되었습니다. 감사합니다!';
//   const toPhoneNumber = '+821099042887';

//   const sendSMS = async (toPhoneNumber) => {
//     try {
//       const response = await axios.post(
//         `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
//         `To=${toPhoneNumber}&From=${twilioPhoneNumber}&Body=${encodeURIComponent(message)}`,
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         console.log('Message sent successfully:', response.data);
//       } else {
//         console.error('Error sending message:', response.data);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
// }

// export default sendReservationNotification;

// import * as Crypto from 'expo-crypto';

// async function makeSignature() {
//   const serviceId = 'ncp:sms:kr:313269024129:alleat';
//   const space = " ";                            // one space
//   const newLine = "\n";                         // new line
//   const method = "GET";                         // method
//   const url = `/sms/v2/services/${serviceId}/messages`; // url (include query string)
//   const timestamp = Date.now().toString();              // current timestamp (epoch)
//   const accessKey = "5gNS8eSv96I4i5q7hcDg";              // access key id (from portal or Sub Account)
//   const secretKey = "W4lFE0JnMj2M4C9coO1AX8lm7B5xebnQWEpd4u6B";              // secret key (from portal or Sub Account)

//   const hmac = await Crypto.digestStringAsync(
//     Crypto.CryptoDigestAlgorithm.SHA256,
//     secretKey
//   );
//   await hmac.addData(method);
//   await hmac.addData(space);
//   await hmac.addData(url);
//   await hmac.addData(newLine);
//   await hmac.addData(timestamp);
//   await hmac.addData(newLine);
//   await hmac.addData(accessKey);

//   const hash = await hmac.digestAsync(Crypto.CryptoEncoding.BASE64);

//   return hash;
// }

// async function sendReservationNotification(phoneNumber) {
//   const serviceId = 'ncp:sms:kr:313269024129:alleat';
//   const accessKey = '5gNS8eSv96I4i5q7hcDg';
// //   const secretKey = "W4lFE0JnMj2M4C9coO1AX8lm7B5xebnQWEpd4u6B";
//   const timestamp = Date.now().toString();
// //   const url = `/sms/v2/services/${serviceId}/messages`;

// //   const hmac = Crypto.createHmac('sha256', secretKey);
// //   const hmacDigest = hmac
// //     .update(`POST ${url}\n${timestamp}\n${accessKey}`)
// //     .digest('base64');

//   const body = {
//     type: 'SMS',
//     contentType: 'COMM',
//     countryCode: '82',
//     from: '010-9904-2887', // 네이버 클라우드에서 발급받은 전화번호
//     content: '예약이 완료되었습니다. 감사합니다!',
//     messages: [{ to: phoneNumber }],
//   };
//   signature = makeSignature();
//   console.log(signature);
//   try {
//     const response = await fetch(`https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'x-ncp-apigw-timestamp': timestamp,
//         'x-ncp-iam-access-key': accessKey,
//         'x-ncp-apigw-signature-v2': {signature},
//       },
//       body: JSON.stringify(body),
//     });

//     if (response.ok) {
//       console.log('Message sent successfully');
//     } else {
//       console.error('Error sending message');
//       console.error(response.status);
//     }
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// }

