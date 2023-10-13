import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const GameScreen: React.FC = () => {
  const randomString = '랜덤문자열'; // 랜덤 문자열
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [inputText, setInputText] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTimes, setGameTimes] = useState<number[]>(Array(4).fill(0));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameStarted) {
      if (startTime === null) {
        setStartTime(Date.now());
        interval = setInterval(() => {
          setElapsedTime(Date.now() - (startTime || 0));
        }, 1000);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, startTime]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setInputText('');
  };

  const stopGame = () => {
    if (gameStarted) {
      setGameStarted(false);
      const elapsedTimeInSec = Math.floor(elapsedTime / 1000);
      if (elapsedTimeInSec < gameTimes.length) {
        gameTimes[elapsedTimeInSec] = elapsedTimeInSec;
        setGameTimes([...gameTimes]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameText}>1차 시기</Text>
      <Text>{`아래 문장을 입력해주세요: ${randomString}`}</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={text => setInputText(text)}
        placeholder="텍스트 입력"
        editable={gameStarted}
      />
      <Text>{`경과 시간: ${elapsedTime} 초`}</Text>
      <Button
        title={gameStarted ? '멈추기' : '시작하기'}
        onPress={gameStarted ? stopGame : startGame}
      />
      <Text>
        1차: {gameTimes[0]} 초, 2차: {gameTimes[1]} 초, 3차: {gameTimes[2]} 초,
        4차: {gameTimes[3]} 초
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    borderWidth: 1,
    marginTop: 10,
  },
});

export default GameScreen;
