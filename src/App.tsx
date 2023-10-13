import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TextingGameScreen from './screens/TextingGameScreen/TextingGameScreen';
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TextingGame"
          component={TextingGameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Game2"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
