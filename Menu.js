import { StyleSheet, Dimensions, Button, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Badge, Snackbar, Card, Title, Paragraph, Portal, Modal, Button as PaperButton } from 'react-native-paper';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

const menu_data = [
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup', price: 1000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup1', price: 2000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup2', price: 3000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup3', price: 1000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup4', price: 1000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup5', price: 1000 },
  { image: require('./assets/mm.jpg'), menu_name: 'Noodle soup6', price: 1000 },
  // Add more menu items here
];

const initialMenuData = menu_data.reduce((data, menuItem) => {
  data[menuItem.menu_name] = { price: menuItem.price, count: 0 };
  return data;
}, {});

export default function MenuScreen({ route, navigation }) {
    const { tableNum, customerNum } = route.params;
    const [menuData, setMenuData] = useState(initialMenuData);
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

    const increaseCount = () => {
      setCount(count + 1);
    };
  
    const decreaseCount = () => {
      if (count > 0) {
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
          <Text>테이블 번호: {tableNum}</Text>
          <Text>인원수: {customerNum}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.menuContainer}>
        {menu_data.map((item, index) => (
          <Card key={index} style={styles.menuCard} onPress={() => handleCardPress(item)}>
            <Card.Cover source={item.image} />
            <Card.Content>
              <Title>{item.menu_name}</Title>
              <Paragraph>{item.price.toLocaleString()}원</Paragraph>
            </Card.Content>
          </Card>
        ))}
        </ScrollView>
        {!!totalCount && <View style={styles.footer}>
        <PaperButton
          mode='contained'
          onPress={() => navigation.navigate('Cart', {menuCountData: menuData})}
          disabled={!totalCount}
          style={styles.cartButton}
        >장바구니 확인 후 결제하기</PaperButton>
          <Badge
            style={{ position: 'absolute', top: 10, right: +70 }}
          >{totalCount}</Badge>
        </View>}
        {/* Modal */}
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)}>
            <Card>
              <Card.Content>
                <Title>{selectedItem?.menu_name}</Title>
                <Paragraph>{selectedItem?.price}원</Paragraph>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                  <Button title="-" onPress={decreaseCount} />
                  <Text>{count}</Text>
                  <Button title="+" onPress={increaseCount} />
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
            label: 'Dismiss',
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
    flex: 1
  },
  header: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuCard: {
    width: '32%',
    marginBottom: 16,
  },
  menuList: {
    width: SCREEN_WIDTH,
  },
  menu: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 80,
    backgroundColor: "yellow",
  },
  footer: {
    position: 'relative',
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'blue',
    borderRadius: 5,
  }
});