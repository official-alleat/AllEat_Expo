import React, { useState, useEffect } from 'react';
import { Image, Pressable, TouchableWithoutFeedback, Modal, StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import stores from './stores.js';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function RoundWhiteButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default function SeatScreen({ route, navigation }) {
    const { storeId } = route.params;
    const store = stores[storeId];
    const tables = store.tables;

    const [modalVisible, setModalVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [tableNum, setTableNum] = useState(0);
    const [tablesStatus, setTablesStatus] = useState([]);

    const ws = new WebSocket("ws://192.168.0.104:8080");

    useEffect(() => {
      ws.onopen = () => {
        console.log('Connection is open.');
        ws.send(JSON.stringify({'storeId': storeId, 'tableNum': -1, 'command': 'get'})); // 자리 정보 요청
      };
    
      ws.onmessage = (event) => {
        console.log('Received from server:', event.data);
  
        const jsonData = JSON.parse(event.data); // storeId, tableNum, command
        const newStatus = jsonData[1]['available'];
        setTablesStatus(newStatus);
      };
    
      ws.onerror = (error) => {
        console.log('WebSocket error:', error);
      };

      return () => {
        ws.close();
        console.log('Connection is closed.');
      };
    }, []);
  
    const getTables = () => {
      return(
        tables.map((tableRow, row) => (
          <View key={row} style={{ flexDirection: 'row' }}>
            {
              tableRow.map((table, col) => (
                table ? 
                tablesStatus[table] ?
                <Pressable key={row * 100 + col} style={styles.availableTable} onPress={() =>
                  {setModalVisible(!modalVisible), setTableNum(table)}}>
                  <Text style={styles.tableName}>좌석{table}</Text>
                </Pressable>
                :
                <Pressable key={row * 100 + col} style={styles.reservedTable} onPress={() =>
                  {setTableNum(table)}}>
                  <Text style={styles.tableName}>좌석{table}</Text>
                </Pressable>
                :
                <View key={row * 100 + col} style={styles.notTable}></View>
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
            <Image style={styles.storeImage} source={{ uri: store.image }}/>
            <View>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeTag}>{store.tag}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableGrid}>
          {getTables()}
          {/* <Button title="예약하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'reserve'}))}/>
          <Button title="취소하기" onPress={() => ws.send(JSON.stringify({'storeId': storeId, 'tableNum': tableNum, 'command': 'cancel'}))}/> */}
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modal}>
              <View style={styles.selectNumOfPeople}>
                <Text>성인</Text>
                <Pressable style={styles.button} onPress={() => adultCount > 0 && setAdultCount(pre => pre - 1)}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text>{adultCount}</Text>
                <Pressable style={styles.button} onPress={() => setAdultCount(pre => pre + 1)}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
              <View style={styles.selectNumOfPeople}>
                <Text>유아</Text>
                <Pressable style={styles.button} onPress={() => childCount > 0 && setChildCount(pre => pre - 1)}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text>{childCount}</Text>
                <Pressable style={styles.button} onPress={() => setChildCount(pre => pre + 1)}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
              <View style={{alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Menu', {storeId, storeId, tableNum: tableNum, customerNum: adultCount + childCount})}>
                <View style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>메뉴 고르기</Text>
                </View>
              </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeCell: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  storeDescription: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeImage: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 7,
  },
  storeName: {
    fontSize: 22,
    fontWeight: '500',
  },
  storeTag: {
  },
  storeLocation: {
  },
  tableGrid: {
    flex: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  availableTable: {
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
  reservedTable: {
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
  notTable: {
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    borderRadius: 7,
    height: 50,
    width: 50,
  },
  tableName: {
    fontSize: 13,
    fontWeight: "500",
  },
  modal: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  selectNumOfPeople: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
  },
  button: {
    backgroundColor: 'white', // 배경색을 하얀색으로 설정
    borderRadius: 25, // 동그란 버튼을 위해 반지름 값을 반 정도로 설정
    paddingVertical: 5,
    paddingHorizontal: 11,
    alignItems: 'center', // 텍스트 가운데 정렬
    borderWidth: 1,
    borderColor: 'gray', // 테두리 색상을 하얀색으로 설정
  },
  buttonText: {
    color: 'black', // 텍스트 색상을 검은색으로 설정
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    width: '90%',
    backgroundColor: '#8B00FF', // 배경색 추가
    alignItems: 'center', // 텍스트 가운데 정렬
    paddingVertical: 3,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#8B00FF',
  },
  menuButtonText: {
      color: 'white',
      fontSize: 14,
      marginVertical: 10,
      marginHorizontal: 24,
  },
});