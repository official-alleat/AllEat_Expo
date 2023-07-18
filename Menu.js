import { Pressable, StyleSheet, Alert, Dimensions, Button, Text, View } from 'react-native';
import { useState } from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function MenuScreen({ navigation }) {
    const [count, setCount] = useState(0);

    return (
      <View style={styles.container}>
        <View sytle={styles.menuList}>
          <View style={styles.menu}>
            <Text>메뉴1</Text>
            <Button title="+" onPress={() => setCount(pre => pre + 1)} />
            <Button title="-" onPress={() => setCount(pre => pre - 1)} />
          </View>
          <View style={styles.menu}>
            <Text>메뉴2</Text>
            <Button title="+" onPress={() => setCount(pre => pre + 1)} />
            <Button title="-" onPress={() => setCount(pre => pre - 1)} />
          </View>
          <View style={styles.menu}>
            <Text>메뉴3</Text>
            <Button title="+" onPress={() => setCount(pre => pre + 1)} />
            <Button title="-" onPress={() => setCount(pre => pre - 1)} />
          </View>
          <View style={styles.menu}>
            <Text>메뉴4</Text>
            <Button title="+" onPress={() => setCount(pre => pre + 1)} />
            <Button title="-" onPress={() => setCount(pre => pre - 1)} />
          </View>
        </View>
        <Text style={styles.total}>{count}</Text>
        <Button
          title="Go"
          onPress={() => navigation.navigate('Pay')}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-between',
    margin: 100,
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
  }
});