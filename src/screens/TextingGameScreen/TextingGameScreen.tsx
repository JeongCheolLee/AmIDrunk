// @ts-expect-error
import {Stopwatch} from 'react-native-stopwatch-timer';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';

const GameScreen: React.FC = () => {
  const [elapsedTimeInSec, setElapsedTimeInSec] = useState<number>(0);
  const [inputText, setInputText] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const [firstTrial, setFirstTrial] = useState<number>(0);
  const [secondTrial, setSecondTrial] = useState<number>(0);
  const [thirdTrial, setThirdTrial] = useState<number>(0);

  const [firstTrialTime, setFirstTrialTime] = useState<string>('');
  const [secondTrialTime, setSecondTrialTime] = useState<string>('');
  const [thirdTrialTime, setThirdTrialTime] = useState<string>('');

  const [stopwatchReset, setStopwatchReset] = useState<boolean>(false);

  const currentRandomString =
    '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다.';

  // const currentRandomString = '테스트 랜덤 스트리잉';

  const startGame = () => {
    if (thirdTrialTime !== '') {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: '모든 회치에 기록이 끝났습니다!',
        textBody: '아래 버튼을 누르면 초기화됩니다.',
        button: '닫기',
        onPressButton: () => {
          setFirstTrial(0);
          setSecondTrial(0);
          setThirdTrial(0);
          setFirstTrialTime('');
          setSecondTrialTime('');
          setThirdTrialTime('');
        },
        autoClose: 500,
      });

      return;
    }
    setGameStarted(true);
    setStopwatchReset(false);
    setElapsedTimeInSec(0);
    setInputText('');
  };

  const stopGame = () => {
    let drunk = false;

    if (gameStarted) {
      setGameStarted(false);
      setStopwatchReset(true);

      if (firstTrial === 0) {
        setFirstTrial(elapsedTimeInSec);
        setFirstTrialTime(new Date().toLocaleString());
        drunk = false;
      } else if (secondTrial === 0) {
        setSecondTrial(elapsedTimeInSec);
        setSecondTrialTime(new Date().toLocaleString());
        if (elapsedTimeInSec >= firstTrial) {
          drunk = true;
        }
      } else if (thirdTrial === 0) {
        setThirdTrial(elapsedTimeInSec);
        setThirdTrialTime(new Date().toLocaleString());
        if (elapsedTimeInSec >= secondTrial) {
          drunk = true;
        }
      }
    }

    if (inputText !== currentRandomString.trim()) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: '틀렸습니다!',
        textBody: '혹시 취하신 건 아니죠?!',
        button: '닫기',
      });
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
  };

  const getFormattedTime = (time: number) => {
    setElapsedTimeInSec(time);
  };

  return (
    <AlertNotificationRoot>
      <View style={{...styles.container}}>
        <Text style={styles.headerText}>받아쓰기</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.gameText}>{currentRandomString}</Text>
      </View>
      <View style={styles.stopWatch}>
        <Stopwatch
          style={styles.stopWatch}
          msecs
          start={gameStarted}
          reset={stopwatchReset}
          getTime={getFormattedTime}
        />
      </View>
      <View style={styles.container}>
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
        {gameStarted}
      </View>
      <View style={styles.container}>
        <Text style={styles.record}>
          1차기록 :{' '}
          {firstTrial !== 0
            ? firstTrial.toString().slice(-6) + ' 초' + '\n'
            : '시작전'}
        </Text>
        <Text>
          {firstTrialTime ? '음주 측정 시간: ' + firstTrialTime.slice(11) : ''}
        </Text>
        <Text style={styles.record}>
          2차기록 :{' '}
          {secondTrial !== 0
            ? secondTrial.toString().slice(-6) + ' 초' + '\n'
            : '시작전'}
        </Text>
        <Text>
          {secondTrialTime
            ? '음주 측정 시간: ' + secondTrialTime.slice(11)
            : ''}
        </Text>
        <Text style={styles.record}>
          3차기록 :{' '}
          {thirdTrial !== 0
            ? thirdTrial.toString().slice(-6) + ' 초' + '\n'
            : '시작전'}
        </Text>
        <Text>
          {thirdTrialTime ? '음주 측정 시간: ' + thirdTrialTime.slice(11) : ''}
        </Text>
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
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  stopWatch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
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
