import { Image, Pressable, TouchableWithoutFeedback, Modal, StyleSheet, Alert, Dimensions, Button, Text, View } from 'react-native';

import stores from './stores.json';
import React, { useState, useRef, useEffect } from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get("window")
const {BUTTON_COLOR} = "#D0A9F5"

export default function SeatScreen({ route, navigation }) {
    const { storeId } = route.params;
    var store = stores[storeId];

    const [modalVisible, setModalVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [tableNum, setTableNum] = useState(0);
    const [seatsStatus, setSeatsStatus] = useState([]);

    const ws = new WebSocket("ws://192.168.219.103:8080");

    // 웹소켓 서버 생성
    useEffect(() => {

      ws.onopen = () => {
        // connection opened
        console.log('Connection is open.');
        ws.send(JSON.stringify({'storeId': storeId, 'tableNum': -1, 'command': 'get'}));
        // ws.send('something');  // send a message
      };
    
      ws.onmessage = (event) => {
        console.log('Received from server:', event.data);
  
        var jsonData = JSON.parse(event.data); // storeId, tableNum, command
        var storeId = jsonData[0];
        var newStatus = jsonData[1]['available'];
        setSeatsStatus(newStatus);
      };
    
      ws.onerror = (error) => {
        console.log('WebSocket error:', error);
      };

      return () => {
        ws.close();
        console.log('Connection is closed.');
      };
    }, []);
  
    const getSeat = (storeId) => {
      var store = stores[storeId];
      var seats = store["seat"];

      return(
        seats.map((seatRow, row) => (
          <View key={row} style={{flexDirection: 'row'}}>
            {
              seatRow.map((seat, col) => (
                seat ? 
                seatsStatus[seat] ?
                <Pressable key={row * 100 + col} style={styles.availableSeat} onPress={() =>
                  {setModalVisible(!modalVisible), setTableNum(seat)}}>
                  <Text style={styles.seatName}>좌석{seat}</Text>
                </Pressable>
                :
                <Pressable key={row * 100 + col} style={styles.reservedSeat} onPress={() =>
                  {setTableNum(seat)}}>
                  <Text style={styles.seatName}>좌석{seat}</Text>
                </Pressable>
                :
                <View key={row * 100 + col} style={styles.notSeat}></View>
              ))
            }
          </View>
        ))
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.storeCell}>
          <View style={styles.storeDescription}>
            <Image source={{uri: store.image}} style={styles.storeImage}></Image>
            <View>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeTag}>{store.tag}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.seats}>
        <View style={{alignItems: 'center'}}>
          {getSeat(storeId)}
          <Button title="예약하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'reserve'}))}/>
          <Button title="취소하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'cancel'}))}/>
        </View>
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "white", padding: 10, borderRadius: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                <Text>성인</Text>
                <Button title="-" onPress={() => adultCount != 0 ? setAdultCount(pre => pre - 1) : setAdultCount(pre => pre)} />
                <Text>{adultCount}</Text>
                <Button title="+" onPress={() => setAdultCount(pre => pre + 1)} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                <Text>유아</Text>
                <Button title="-" onPress={() => childCount != 0 ? setChildCount(pre => pre - 1) : setChildCount(pre => pre)} />
                <Text>{childCount}</Text>
                <Button title="+" onPress={() => setChildCount(pre => pre + 1)} />
              </View>
              <Button
                color={BUTTON_COLOR}
                title="메뉴 고르기"
                onPress={() => navigation.navigate('Menu', {tableNum: tableNum, customerNum: adultCount + childCount})}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
  },
  title: {
    height: "7%",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleName: {
    fontSize: 30,
    fontWeight: "500",
  },
  row: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  availableSeat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 7,
    height: 50,
    width: 50,
  },
  reservedSeat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#616161",
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 7,
    height: 50,
    width: 50,
  },
  seatName: {
    fontSize: 13,
    fontWeight: "500",
  },
  notSeat: {
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    borderRadius: 7,
    height: 50,
    width: 50,
  },
  storeName: {
    fontSize: 22,
    fontWeight: "500",
  },
  storeImage: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 7,
  },
  storeTag: {

  },
  storeCell: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 7,
    margin: 5,
    
    // Shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowColor: 'black',
    // Elevation for Android (comment this out if you're using iOS shadow properties)
    elevation: 3,
  },
  storeDescription: {
    flexDirection: "row",
    alignItems: "center",
  },
  seats: {
    flex: 8,
    backgroundColor: "white",
    borderRadius: 7,
    margin: 5,
  }
});