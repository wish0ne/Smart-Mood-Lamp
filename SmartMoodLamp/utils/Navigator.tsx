import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Main from '../screen/Main';
import Write from '../screen/Write';
import Result from '../screen/Result';

type StackParamList = {
  Main: undefined;
  Write: {day: string};
  Result: {day: string; sentiments: number[]};
};

const Stack = createStackNavigator<StackParamList>();

export type MainProps = StackScreenProps<StackParamList, 'Main'>;
export type WriteProps = StackScreenProps<StackParamList, 'Write'>;
export type ResultProps = StackScreenProps<StackParamList, 'Result'>;

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Write" component={Write} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

export default Navigator;
