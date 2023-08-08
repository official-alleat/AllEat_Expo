import React, { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function PayScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const phoneNum = '+821099042887'
    const TWILIO_ACCOUNT_SID = 'ACb5f6ce67650ff3df0ae47dcf440893a6';
    const TWILIO_AUTH_TOKEN = '8be44209c8fda816e596fff0c8ada026';
    const TWILIO_PHONE_NUMBER = '+17622499376';

    async function handleSendNotification(){
      if (phoneNumber) {
        try {
          const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/ACb5f6ce67650ff3df0ae47dcf440893a6/Messages.json', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)
            },
            body: new URLSearchParams({
              'To': phoneNum,
              'From': TWILIO_PHONE_NUMBER,
              'Body': 'message from Twilio',
            })
          });
  
          const json = await response.json();
          console.log(json);
  
          if (response.status === 201) {
            console.log('Message sent successfully:', response.data);
            Alert.alert(
              '예약 완료',
              '송금 확인 후 예약 확정 문자가 전송됩니다.',
              [
                { text: 'OK', onPress: () => navigation.navigate('Store') }
              ]
            );
          }
          else {
            console.log('Error sending message:', response.data);
            Alert.alert('문자 전송 실패', '예약 확정 문자 전송에 실패했습니다. 나중에 다시 시도해주세요.');
          }
        } catch (error) {
          console.log(error)
          Alert.alert('문자 전송 실패', '예약 확정 문자 전송에 실패했습니다. 나중에 다시 시도해주세요.');
        }
      }
      else {
        setSnackbarVisible(true);
      }


    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30 }}>올잇 계좌번호</Text>
        <Text style={{ fontSize: 20 }}>333-3333-3333</Text>
        <Text style={{ color: 'red', margin: 30 }}>30분 이내에 식당에 도착하지 않을 시에 자리가 보장되지 않을 수 있습니다.</Text>

        <TextInput
          style={{ marginTop: 20, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1, margin: 30 }}
          placeholder="전화번호 입력 (010-1234-5678)"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Button title="예약하기" onPress={handleSendNotification} />

        <Button
          title="돌아가기"
          onPress={() => navigation.navigate('Store')}
        />
        <Text style={{ margin: 20 }}>예약 문자가 오지 않을 경우 010-1111-1111로 문의 주세요.</Text>
      
        <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: '확인',
              onPress: () => setSnackbarVisible(false),
            }}
            duration={2000}
        >
            전화번호를 입력해주세요.
        </Snackbar>
      </View>
    );
  }