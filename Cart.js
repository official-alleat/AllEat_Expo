import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Dimensions, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import stores from './stores';

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function CartScreen({ navigation }) {
    const route = useRoute();
    const { storeId, menuData } = route.params;
    const [menuCountData, setMenuCountData] = useState(menuData);

    const handleDecrease = (menuName) => {
        if (menuCountData[menuName].count > 0) {
            setMenuCount(menuName, menuCountData[menuName].count - 1);
        }
    };

    const handleIncrease = (menuName) => {
        setMenuCount(menuName, menuCountData[menuName].count + 1);
    };

    const setMenuCount = (menuName, count) => {
        const updatedMenuCountData = {
            ...menuCountData,
            [menuName]: {
                ...menuCountData[menuName],
                count: count,
            },
        };
        setMenuCountData(updatedMenuCountData);
    };

    const renderCartItems = () => {
        return Object.keys(menuCountData).map((menuName, index) => (
            !!(menuCountData[menuName].count) && <View key={index} style={styles.menuCell}>
                <Text style={styles.menuName}>{menuName}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.menuPrice}>{menuCountData[menuName].price}원</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button color='#D0A9F5' title="-" onPress={() => handleDecrease(menuName)} />
                        <Text style={styles.menuCount}>{menuCountData[menuName].count}</Text>
                        <Button color='#D0A9F5' title="+" onPress={() => handleIncrease(menuName)} />
                    </View>
                </View>
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
                <Text style={styles.headerText}>{stores[storeId].name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.menuList}>
                {renderCartItems()}
            </ScrollView>
            <View style={styles.footer}>
                <View style={{flexDirection: 'row', padding: 50}}>
                    <Text style={{flex: 7, fontSize: 20, fontWeight: '600'}}>총 주문금액</Text>
                    <Text style={{flex: 3, fontSize: 20, alignItems: 'flex-end'}}>{calculateTotalPrice()}원</Text>
                </View>
                <View style={styles.payButton}>
                    <Button
                        color='#D0A9F5'
                        title="결제하기"
                        onPress={() => navigation.navigate('Pay')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        height: '7%',
        padding: 10,
        backgroundColor: '#8B00FF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    },
    menuList: {
      margin: 10,
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    menuCell: {
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#DEDEDE',
      padding: 5,
    },
    menuName: {
      fontSize: 22,
      fontWeight: '500',
      marginBottom: 10,
    },
    menuPrice: {
      fontSize: 20,
    },
    menuCount: {
      fontSize: 20,
      marginHorizontal: 20,
    },
    footer: {
      width: SCREEN_WIDTH,
      position: 'relative',
      padding: 16,
      alignItems: 'center',
    },
    payButton: {
        marginHorizontal: 8,
        borderRadius: 5,
        width: '100%',
      }
});