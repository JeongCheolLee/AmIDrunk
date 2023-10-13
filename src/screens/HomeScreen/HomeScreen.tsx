import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {images} from '../../assets/index';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.HOME_BEER_IMAGE} style={styles.image} />
      <Text style={styles.text}>지금 술을 마시고 계신가요?</Text>
      <Text style={styles.text}>
        아래 테스트를 통해 취하셨는지 확인해보세요!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TextingGame')}>
        <Text style={styles.buttonText}>받아쓰기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('준비중입니다!')}>
        <Text style={styles.buttonText}>coming soon!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0e6d6',
  },
  image: {
    resizeMode: 'repeat',
    height: 400,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e4aa43',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    height: 40,
  },
  buttonText: {
    color: '#f0e6d6',
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
});

export default HomeScreen;
