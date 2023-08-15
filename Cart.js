import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Dimensions, StyleSheet, Button, Text, View, ScrollView, Pressable, TouchableWithoutFeedback } from 'react-native';
import stores from './stores';

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function CartScreen({ navigation }) {
    const route = useRoute();
    const { storeId, tableNum, customerNum, menuData } = route.params;
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
                        <Pressable style={styles.button} onPress={() => handleDecrease(menuName)}>
                            <Text style={styles.buttonText}>-</Text>
                        </Pressable>
                        <Text style={styles.menuCount}>{menuCountData[menuName].count}</Text>
                        <Pressable style={styles.button} onPress={() => handleIncrease(menuName)}>
                            <Text style={styles.buttonText}>+</Text>
                        </Pressable>
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
                <Text style={{ fontSize: 22, fontWeight: '500' }}>{stores[storeId].name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headerText}>테이블 번호: {tableNum}</Text>
                <Text style={styles.headerText}>인원수: {customerNum}</Text>
            </View>
            </View>
            <ScrollView contentContainerStyle={styles.menuList}>
                {renderCartItems()}
            </ScrollView>
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', padding: 14, justifyContent: 'space-between' }}>
                    <Text style={{ flex: 7, fontSize: 20, fontWeight: '600' }}>총 주문금액</Text>
                    <Text style={{ flex: 3, fontSize: 20, textAlign: 'right' }}>{calculateTotalPrice()}원</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Pay', {totalPrice: calculateTotalPrice()})}>
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
    menuList: {
      marginVertical: 10,
      backgroundColor: 'white',
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
      marginVertical: 10,
    },
    menuPrice: {
      fontSize: 20,
    },
    menuCount: {
      fontSize: 20,
      marginHorizontal: 20,
    },
    footer: {
      // width: SCREEN_WIDTH,
      position: 'relative',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
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