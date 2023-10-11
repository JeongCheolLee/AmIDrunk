import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {images} from '../../assets/index';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.HOME_BEER_IMAGE} style={styles.image} />
      <Text style={styles.text}>
        지금 술을 마시고 계신가요? 아래 테스트를 통해 취하셨는지 확인해보세요.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game1')}>
        <Text style={styles.buttonText}>게임 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game2')}>
        <Text style={styles.buttonText}>게임 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue', // 버튼 배경색
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
