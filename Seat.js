import { Pressable, StyleSheet, Alert, Dimensions, Button, Text, View } from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get("window")

export default function SeatScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Pressable style={styles.seat} onPress={() => Alert.alert('Simple Button pressed')}>
            <Text style={styles.seatName}>좌석1</Text>
          </Pressable>
          <View style={styles.seat}>
            <Text style={styles.seatName}>좌석2</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.seat}>
            <Text style={styles.seatName}>좌석3</Text>
          </View>
          <View style={styles.seat}>
            <Text style={styles.seatName}>좌석4</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.seat}>
            <Text style={styles.seatName}>좌석5</Text>
          </View>
          <View style={styles.seat}>
            <Text style={styles.seatName}>좌석6</Text>
          </View>
        </View>
        
        <Button
          title="Go to Menu"
          onPress={() => navigation.navigate('Menu')}
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
  row: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: "space-between",
  },
  seat: {
    justifyContent: "center",
    backgroundColor: "yellow",
    margin: 10,
  },
  seatName: {
    fontSize: 50,
    fontWeight: "500",
  },
});