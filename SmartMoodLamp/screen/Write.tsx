import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {WriteProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';

const Write = ({navigation}: WriteProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'일기 작성'}
      />
      <Text>일기 쓰기 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
});

export default Write;
