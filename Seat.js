import { Pressable, TouchableWithoutFeedback, Modal, StyleSheet, Alert, Dimensions, Button, Text, View } from 'react-native';

import stores from './stores.json';
import * as React from 'react';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function SeatScreen({ route, navigation }) {
    const { storeName } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    const renderContent = () => (
      <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          padding: 16,
          height: 100,
        }}
      >
        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 'auto',}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text>성인</Text>
              <Button title="+" onPress={() => setAdultCount(pre => pre + 1)} />
              <Text>{adultCount}</Text>
              <Button title="-" onPress={() => setAdultCount(pre => pre - 1)} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text>유아</Text>
              <Button title="+" onPress={() => setChildCount(pre => pre + 1)} />
              <Text>{childCount}</Text>
              <Button title="-" onPress={() => setChildCount(pre => pre - 1)} />
            </View>
        </View>
        <Button
            title="메뉴 고르기"
            onPress={() => navigation.navigate('Menu')}
          />
      </View>
    );

    const sheetRef = React.createRef();

    const getSeat = (storeName) => {
      var store = stores[storeName];
      var seats = store["seat"];

      return(
        seats.map(seatRow => (
          <View style={{flexDirection: 'row'}}>
            {
              seatRow.map(seat => (
                seat ? 
                <Pressable style={styles.seat} onPress={() =>
                  Alert.alert('좌석을 예약하시겠습니까?', '', [
                  {text: "취소", style: 'cancel',},
                  {text: "네", onPress: () => navigation.navigate('Menu')}
                  ])
              }>
                  <Text style={styles.seatName}>좌석</Text>
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
          <Text style={styles.titleName}>{storeName}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {getSeat(storeName)}

          <View style={styles.row}>
            <Pressable style={styles.seat} onPress={() =>
              setModalVisible(!modalVisible)}>
              <Text style={styles.seatName}>좌석1</Text>
            </Pressable>
            <Pressable style={styles.seat} onPress={() => 
              sheetRef.current.snatpTo(1)}>
              <Text style={styles.seatName}>좌석2</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <View style={styles.seat}>
              <Text style={styles.seatName}>좌석3</Text>
            </View>
            <View style={styles.seat}>
              <Text style={styles.seatName}>좌석4</Text>
            </View>
          </View>
        </View>
        {/* <BottomSheet
          initialSnap={2}
          ref={sheetRef}
          snapPoints={[300, 200, 0]}
          renderContent={renderContent}
          borderRadius={10}>
        </BottomSheet> */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "white", padding: 10, borderRadius: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                <Text>성인</Text>
                <Button title="+" onPress={() => setAdultCount(pre => pre + 1)} />
                <Text>{adultCount}</Text>
                <Button title="-" onPress={() => adultCount != 0 ? setAdultCount(pre => pre - 1) : setAdultCount(pre => pre)} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                <Text>유아</Text>
                <Button title="+" onPress={() => setChildCount(pre => pre + 1)} />
                <Text>{childCount}</Text>
                <Button title="-" onPress={() => childCount != 0 ? setChildCount(pre => pre - 1) : setChildCount(pre => pre)} />
              </View>
              <Button
                title="메뉴 고르기"
                onPress={() => navigation.navigate('Menu')}
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