import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Main from '../screen/Main';
import Write from '../screen/Write';
import Read from '../screen/Read';
import WriteText from '../screen/WriteText';
import Result from '../screen/Result';
import ReadText from '../screen/ReadText';

type StackParamList = {
  Main: undefined;
  Read: undefined;
  Write: undefined;
  WriteText: {day: string};
  Result: {sentiments: number[]};
  ReadText: {day: string; diary: string};
};

const Stack = createStackNavigator<StackParamList>();

export type MainProps = StackScreenProps<StackParamList, 'Main'>;
export type ReadProps = StackScreenProps<StackParamList, 'Read'>;
export type WriteProps = StackScreenProps<StackParamList, 'Write'>;
export type WriteTextProps = StackScreenProps<StackParamList, 'WriteText'>;
export type ResultProps = StackScreenProps<StackParamList, 'Result'>;
export type ReadTextProps = StackScreenProps<StackParamList, 'ReadText'>;

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Read" component={Read} />
      <Stack.Screen name="Write" component={Write} />
      <Stack.Screen name="WriteText" component={WriteText} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="ReadText" component={ReadText} />
    </Stack.Navigator>
  );
};

export default Navigator;
