import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ResultProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';

const Result = ({navigation}: ResultProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'감정 분석 결과'}
      />
      <Text>결과 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
});

export default Result;
