import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ReadTextProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';

const ReadText = ({navigation, route}: ReadTextProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'일기 확인'}
      />
      <Text>{route.params.day}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
});

export default ReadText;
