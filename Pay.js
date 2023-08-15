import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { client_email, private_key } from './keyfile.json';
// const { google } = require('googleapis');

const apiKey = 'AIzaSyARv8q-_ka1FrgrqwWsl7FuqmMWrJsbwj4';
const spreadsheetId = '1UETIkUMu1D7VnxgYUaKJzHxewGuC2aVpJF0uk7qKzXI';

async function sendDataToGoogleSheets() {
  const rowData = ['Value1', 'Value2', 'Value3']; // 입력할 데이터
  const range = 'Sheet1!A1:C1'; // 입력할 범위

//   try {
    // const auth = new google.auth.JWT(client_email, null, private_key, [
    //   'https://www.googleapis.com/auth/spreadsheets',
    // ]);
    // const sheets = google.sheets({ version: 'v4', auth: auth });

    // const response = await fetch(
    //   `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       values: [rowData],
    //     }),
    //   }
    // );

//     console.log('Data sent to Google Sheets:', response.data);
//   } catch (error) {
//     console.error('Error sending data to Google Sheets:', error);
//   }
  try {
    let data = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch {
    console.log("Error");
  }
}

export default function PayScreen({ route, navigation }) {
    const { totalPrice } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const phoneNum = '+821099042887'
    const TWILIO_ACCOUNT_SID = 'ACb5f6ce67650ff3df0ae47dcf440893a6';
    const TWILIO_AUTH_TOKEN = '8be44209c8fda816e596fff0c8ada026';
    const TWILIO_PHONE_NUMBER = '+17622499376';
  
    function handleReservation() {
      Alert.alert(
        '예약 완료',
        '송금 확인 후 예약 확정 문자가 전송됩니다.',
        [
          { text: '확인', onPress: () => { navigation.navigate('Store') }}
        ]
      );
    }

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
                { text: 'OK', onPress: () => { navigation.navigate('Store') }}
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
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      //   <Text style={{ fontSize: 30 }}>올잇 계좌번호</Text>
      //   <Text style={{ fontSize: 20 }}>333-3333-3333</Text>
      //   <Text style={{ color: 'red', margin: 30 }}>30분 이내에 식당에 도착하지 않을 시에 자리가 보장되지 않을 수 있습니다.</Text>

      //   <TextInput
      //     style={{ marginTop: 20, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1, margin: 30 }}
      //     placeholder="전화번호 입력 (010-1234-5678)"
      //     onChangeText={(text) => setPhoneNumber(text)}
      //   />
      //   <Button title="예약하기" onPress={handleSendNotification} />

      //   <Button
      //     title="돌아가기"
      //     onPress={() => {navigation.navigate('Store'), sendDataToGoogleSheets()}}
      //   />
      //   <Text style={{ margin: 20 }}>예약 문자가 오지 않을 경우 010-1111-1111로 문의 주세요.</Text>
      
      //   <Snackbar
      //       visible={snackbarVisible}
      //       onDismiss={() => setSnackbarVisible(false)}
      //       action={{
      //         label: '확인',
      //         onPress: () => setSnackbarVisible(false),
      //       }}
      //       duration={2000}
      //   >
      //       전화번호를 입력해주세요.
      //   </Snackbar>
      // </View>
      <View style={ styles.container }>
        <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 10 }}>
          <Text style={ styles.title }>예약자 정보</Text>
          <View style={ styles.infoCell }>
            <Text style={ styles.infoTitle }>이름</Text>
            <TextInput
              style={ styles.infoTextBox }
              placeholder="이름 입력"
            />
          </View>
          <View style={ styles.infoCell }>
            <Text style={ styles.infoTitle }>전화번호</Text>
            <TextInput
              style={ styles.infoTextBox }
              placeholder="전화번호 입력 (010-1234-5678)"
            />
          </View>
        </View>
        <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 10 }}>
          <Text style={ styles.title }>결제수단</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={ styles.payText }>카카오페이</Text>
            <Text style={ styles.payText }>네이버페이</Text>
            <Text style={ styles.payText }>토스페이</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', padding: 14, justifyContent: 'space-between' }}>
              <Text style={{ flex: 7, fontSize: 20, fontWeight: '600' }}>총 주문금액</Text>
              <Text style={{ flex: 3, fontSize: 20, textAlign: 'right' }}>{totalPrice}원</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => handleReservation()}>
              <View style={styles.payButton}>
                  <Text style={styles.payButtonText}>결제하기</Text>
              </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 25,
      fontWeight: '500',
      marginBottom: 10,
    },
    infoCell: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
    },
    infoTitle: {
      flex: 3,
      fontSize: 20,
      color: 'grey',
    },
    infoTextBox: {
      flex: 7,
      paddingHorizontal: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    payText: {
      fontSize: 20,
      color: 'grey',
      margin: 10,
    },
    payButton: {
      width: '90%',
      backgroundColor: '#8B00FF', // 배경색 추가
      alignItems: 'center', // 텍스트 가운데 정렬
      paddingVertical: 3,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#8B00FF',
    },
    payButtonText: {
        color: 'white',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 24,
    },
    footer: {
      // width: SCREEN_WIDTH,
      position: 'relative',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'white',
    },
});