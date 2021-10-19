import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {WriteProps} from '../utils/Navigator';

const Write = ({navigation}: WriteProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Text>일기 쓰기 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Write;
