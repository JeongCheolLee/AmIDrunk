// @ts-expect-error
import {Stopwatch} from 'react-native-stopwatch-timer';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-community/async-storage';

const GameScreen: React.FC = () => {
  const [elapsedTimeInSec, setElapsedTimeInSec] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const [firstTrial, setFirstTrial] = useState<string>('');
  const [secondTrial, setSecondTrial] = useState<string>('');
  const [thirdTrial, setThirdTrial] = useState<string>('');

  const [firstTrialTime, setFirstTrialTime] = useState<string>('');
  const [secondTrialTime, setSecondTrialTime] = useState<string>('');
  const [thirdTrialTime, setThirdTrialTime] = useState<string>('');

  const [stopwatchReset, setStopwatchReset] = useState<boolean>(false);

  useEffect(() => {
    async function getFirstTrial() {
      const trial = await AsyncStorage.getItem('firstTrial');
      if (trial) {
        setFirstTrial(trial);
      }

      const time = await AsyncStorage.getItem('firstTrialTime');
      if (time) {
        setFirstTrialTime(time);
      }
    }

    async function getSecondTrial() {
      const trial = await AsyncStorage.getItem('secondTrial');
      if (trial) {
        setSecondTrial(trial);
      }

      const time = await AsyncStorage.getItem('secondTrialTime');
      if (time) {
        setSecondTrialTime(time);
      }
    }

    async function getThirdTrial() {
      const trial = await AsyncStorage.getItem('thirdTrial');
      if (trial) {
        setThirdTrial(trial);
      }

      const time = await AsyncStorage.getItem('thirdTrialTime');
      if (time) {
        setThirdTrialTime(time);
      }
    }

    if (firstTrial === '') {
      getFirstTrial();
    }
    if (secondTrial === '') {
      getSecondTrial();
    }
    if (thirdTrial === '') {
      getThirdTrial();
    }
  }, [firstTrial, secondTrial, thirdTrial]);

  //TODO 추후에 추가
  const currentRandomString =
    '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다';

  const validateInputString = (drunk: boolean) => {
    if (inputText !== currentRandomString.trim()) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: '틀렸습니다!',
        textBody: '혹시 취하신 건 아니죠?!',
        button: '닫기',
      });

      return false;
    } else {
      if (drunk) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: '맞긴 한데...',
          textBody: '지난 번 시도보다 시간이 늘었어요! 취하진 않았나요?',
          button: '닫기',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: '정확합니다!',
          textBody: '음~ 아직은 괜찮은 것 같네요!',
          button: '닫기',
        });
      }
    }

    return true;
  };

  const startGame = () => {
    if (thirdTrialTime !== '') {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: '모든 회치에 기록이 끝났습니다!',
        textBody: '아래 버튼을 누르면 초기화됩니다.',
        button: '닫기',
        onPressButton: resetStates,
        autoClose: 500,
      });

      return;
    }
    setGameStarted(true);
    setStopwatchReset(false);
    setElapsedTimeInSec('');
    setInputText('');
  };

  const resetStates = () => {
    setFirstTrial('');
    setSecondTrial('');
    setThirdTrial('');
    setFirstTrialTime('');
    setSecondTrialTime('');
    setThirdTrialTime('');

    AsyncStorage.clear();

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: '초기화 완료',
      button: '닫기',
    });

    return;
  };

  const stopGame = () => {
    let drunk = false;

    if (gameStarted) {
      if (firstTrial === '') {
        drunk = false;
        const result = validateInputString(drunk);

        if (result) {
          const now = new Date().toLocaleString();
          setFirstTrial(elapsedTimeInSec);
          setFirstTrialTime(now);

          setGameStarted(false);
          setStopwatchReset(true);

          AsyncStorage.setItem('firstTrial', elapsedTimeInSec);
          AsyncStorage.setItem('firstTrialTime', now);
        } else {
          return;
        }
      } else if (secondTrial === '') {
        if (elapsedTimeInSec >= firstTrial) {
          drunk = true;
        }
        const result = validateInputString(drunk);

        if (result) {
          const now = new Date().toLocaleString();
          setSecondTrial(elapsedTimeInSec);
          setSecondTrialTime(now);

          setGameStarted(false);
          setStopwatchReset(true);

          AsyncStorage.setItem('secondTrial', elapsedTimeInSec.toString());
          AsyncStorage.setItem('secondTrialTime', now);
        } else {
          return;
        }
      } else if (thirdTrial === '') {
        if (elapsedTimeInSec >= secondTrial) {
          drunk = true;
        }

        const result = validateInputString(drunk);

        if (result) {
          const now = new Date().toLocaleString();
          setThirdTrial(elapsedTimeInSec);
          setThirdTrialTime(now);

          setGameStarted(false);
          setStopwatchReset(true);

          AsyncStorage.setItem('thirdTrial', elapsedTimeInSec.toString());
          AsyncStorage.setItem('thirdTrialTime', now);
        } else {
          return;
        }
      }
    }
  };

  let resetButton;
  if (firstTrial !== '') {
    resetButton = <Button title="초기화" onPress={resetStates} color={'red'} />;
  }

  const getFormattedTime = (time: Number) => {
    setElapsedTimeInSec(time.toString());
  };

  return (
    <AlertNotificationRoot>
      <View style={{...styles.container}}>
        <Text style={styles.headerText}>받아쓰기</Text>
        <Text style={styles.gameText}>{currentRandomString}</Text>
      </View>
      <View style={styles.container}>
        <Stopwatch
          style={styles.stopWatch}
          msecs
          start={gameStarted}
          reset={stopwatchReset}
          getTime={getFormattedTime}
        />
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="위 텍스트를 입력해주세요!"
          editable={gameStarted}
        />
        <Button
          title={gameStarted ? '제출!' : '시작!'}
          onPress={gameStarted ? stopGame : startGame}
          color={'blue'}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.record}>
          1차기록 :{' '}
          {firstTrial !== '' ? firstTrial.slice(-6) + ' 초' + '\n' : '시작전'}
        </Text>
        <Text>
          {firstTrialTime ? '음주 측정 시간: ' + firstTrialTime.slice(11) : ''}
        </Text>
        <Text style={styles.record}>
          2차기록 :{' '}
          {secondTrial !== '' ? secondTrial.slice(-6) + ' 초' + '\n' : '시작전'}
        </Text>
        <Text>
          {secondTrialTime
            ? '음주 측정 시간: ' + secondTrialTime.slice(11)
            : ''}
        </Text>
        <Text style={styles.record}>
          3차기록 :{' '}
          {thirdTrial !== '' ? thirdTrial.slice(-6) + ' 초' + '\n' : '시작전'}
        </Text>
        <Text>
          {thirdTrialTime ? '음주 측정 시간: ' + thirdTrialTime.slice(11) : ''}
        </Text>
        {resetButton}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    alignItems: 'center',
  },
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: '#f0e6d6',
    flex: 1,
  },
  stopWatch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  introductionText: {
    marginTop: 50,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  randomText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
  },
  gameText: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 300,
  },
  input: {
    width: 300,
    height: 70,
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'center',
  },
  record: {
    fontSize: 20,
  },
  recordNumber: {
    fontSize: 20,
  },
});

export default GameScreen;
