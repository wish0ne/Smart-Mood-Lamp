import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ReadProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';

const Read = ({navigation}: ReadProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'일기 확인'}
      />
      <Text>일기 보기 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
});

export default Read;
