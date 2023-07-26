import { useRoute } from '@react-navigation/native';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';

export default function CartScreen({ navigation }) {
    const route = useRoute();
    const { menuCountData } = route.params;

    const renderCartItems = () => {
        return Object.keys(menuCountData).map((menuName, index) => (
            !!(menuCountData[menuName].count) && <View key={index} style={styles.menuContainer}>
                <Text style={{flex: 5}}>{menuName}</Text>
                <Text style={{flex: 2}}>{menuCountData[menuName].count}</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{menuCountData[menuName].price}</Text>
            </View>
        ));
      };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        Object.keys(menuCountData).forEach((menuName) => {
          totalPrice += menuCountData[menuName].price * menuCountData[menuName].count;
        });
        return totalPrice;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>장바구니 메뉴 확인</Text>
            </View>
            <ScrollView contentContainerStyle={styles.menuList}>
                <View style={styles.menuContainer}>
                    <Text style={{flex: 5}}>메뉴명</Text>
                    <Text style={{flex: 2}}>수량</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>가격</Text>
                </View>
                {renderCartItems()}
            </ScrollView>
            <View style={{flexDirection: 'row', padding: 50}}>
                <Text style={{flex: 7}}>총액</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{calculateTotalPrice()}</Text>
            </View>
            <Button
                title="결제하기"
                onPress={() => navigation.navigate('Pay')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: 'red',
      justifyContent: 'space-between',
    },
    menuList: {
        padding: 30,
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    footer: {
      position: 'relative',
      padding: 16,
      alignItems: 'center',
      flexDirection: 'row',
    },
});