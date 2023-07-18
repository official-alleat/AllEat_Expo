import { Button, Text, View } from 'react-native';

export default function PayScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Go to Home</Text>
        <Button
          title="Go"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }