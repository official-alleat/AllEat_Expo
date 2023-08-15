import { StyleSheet, Dimensions, Button, TouchableWithoutFeedback, Pressable, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Badge, Snackbar, Card, Title, Portal, Modal, Paragraph, Button as PaperButton } from 'react-native-paper';
import stores from './stores';
import { ceil } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function MenuScreen({ route, navigation }) {
    const { storeId, tableNum, customerNum } = route.params;
    const store = stores[storeId];
    const menu_data = store.menu;

    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const initialMenuData = menu_data.reduce((data, menuItem) => {
      data[menuItem.menu_name] = { price: menuItem.price, count: 0 };
      return data;
    }, {});    

    const [menuData, setMenuData] = useState(initialMenuData);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

    const increaseCount = () => {
      setCount(count + 1);
    };
  
    const decreaseCount = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };

    const handleCardPress = (item) => {
      setSelectedItem(item);
      setVisible(true);
      setCount(menuData[item.menu_name]?.count);
    };

    const setMenuCount = () => {
      // Update the quantity for the selected item
      setMenuData((prevData) => ({
        ...prevData,
        [selectedItem.menu_name]: {
          ...prevData[selectedItem.menu_name],
          count: count,
        },
      }));
      setVisible(false);
      setCount(0);
      setShowMessage(true);
    };

    const totalCount = Object.values(menuData).reduce((total, item) => total + item.count, 0); 

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 22, fontWeight: '500' }}>{stores[storeId].name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.headerText}>테이블 번호: {tableNum}</Text>
            <Text style={styles.headerText}>인원수: {customerNum}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.menuContainer}>
        {menu_data.map((item, index) => (
          <Card key={index} style={styles.menuCard} onPress={() => handleCardPress(item)}>
            <Card.Cover source={item.image} resizeMode="cover" style={{height: 120}}/>
            <Card.Content style={{ alignItems: 'center', paddingTop: 5}}>
              <Title>{item.menu_name}</Title>
              <Paragraph>{item.price.toLocaleString()}원</Paragraph>
            </Card.Content>
          </Card>
        ))}
        </ScrollView>
        {!!totalCount && <View style={styles.footer}>
        <PaperButton
          mode='contained'
          onPress={() => navigation.navigate('Cart', {storeId: storeId, tableNum: tableNum, customerNum: customerNum, menuData: menuData})}
          disabled={!totalCount}
          style={styles.cartButton}
        >장바구니 확인 후 결제하기</PaperButton>
          <Badge
            style={{ position: 'absolute', top: 10, right: +70 }}
          >{totalCount}</Badge>
        </View>}

        {/* <Modal animationType="fade" transparent={true} visible={visible}>
          <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
            <View style={{flex: 1}}></View>
          </TouchableWithoutFeedback>
          <View style={styles.centeredView}>

                <Title>{selectedItem?.menu_name}</Title>
                <Paragraph>{selectedItem?.price}원</Paragraph>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                  <Button title="-" color='#D0A9F5' onPress={decreaseCount} />
                  <Text>{count}</Text>
                  <Button title="+" color='#D0A9F5' onPress={increaseCount} />
            </View>
                <PaperButton icon="plus" onPress={setMenuCount}>
                  담기
                </PaperButton>

          </View>
        </Modal> */}
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)}>
            <Card>
              <Card.Content>
                <Title>{selectedItem?.menu_name}</Title>
                <Paragraph>{selectedItem?.price}원</Paragraph>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                <Pressable style={styles.button} onPress={decreaseCount}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                  <Text>{count}</Text>
                  <Pressable style={styles.button} onPress={increaseCount}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
                <PaperButton icon="plus" onPress={setMenuCount}>
                  담기
                </PaperButton>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>
        <Snackbar
          visible={showMessage}
          onDismiss={() => setShowMessage(false)}
          action={{
            label: '확인',
            onPress: () => setShowMessage(false),
          }}
        >
          메뉴가 장바구니에 담겼습니다
        </Snackbar>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: SCREEN_WIDTH,
    height: '10%',
    padding: 10,
    backgroundColor: 'white', 
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
  },
  menuContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
  },
  menuCard: {
    width: '32%',
    marginBottom: 16,
    backgroundColor: 'white',
  },
  menuList: {
    width: SCREEN_WIDTH,
  },
  menu: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
  },
  total: {
    fontSize: 80,
    backgroundColor: "yellow",
  },
  footer: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cartButton: {
    width: '90%',
    backgroundColor: '#8B00FF', // 배경색 추가
    alignItems: 'center', // 텍스트 가운데 정렬
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#8B00FF',
  },

  centeredView: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});