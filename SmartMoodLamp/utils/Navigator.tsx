import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Main from '../screen/Main';
import Write from '../screen/Write';
import Read from '../screen/Read';

type StackParamList = {
  Main: undefined;
  Read: undefined;
  Write: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export type MainProps = StackScreenProps<StackParamList, 'Main'>;
export type ReadProps = StackScreenProps<StackParamList, 'Read'>;
export type WriteProps = StackScreenProps<StackParamList, 'Write'>;

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Read" component={Read} />
      <Stack.Screen name="Write" component={Write} />
    </Stack.Navigator>
  );
};

export default Navigator;
