import { Pressable, TouchableWithoutFeedback, Modal, StyleSheet, Alert, Dimensions, Button, Text, View } from 'react-native';

import stores from './stores.json';
import React, { useState } from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function SeatScreen({ route, navigation }) {
    const { storeId } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [tableNum, setTableNum] = useState(0);

    const getSeat = (storeId) => {
      var store = stores[storeId];
      var seats = store["seat"];

      return(
        seats.map(seatRow => (
          <View style={{flexDirection: 'row'}}>
            {
              seatRow.map(seat => (
                seat ? 
                <Pressable style={styles.seat} onPress={() =>
                  {setModalVisible(!modalVisible), setTableNum(seat)}}>
                  <Text style={styles.seatName}>좌석{seat}</Text>
                </Pressable>
                :
                <View style={styles.notSeat}></View>
              ))
            }
          </View>
        ))
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleName}>{stores[storeId]['name']}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {getSeat(storeId)}
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
    backgroundColor: '#fff',
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
  seat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    margin: 10,
    padding: 5,
    borderRadius: 7,
    height: 50,
    width: 50,
  },
  seatName: {
    fontSize: 15,
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
  }
});