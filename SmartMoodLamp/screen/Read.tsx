import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ReadProps} from '../utils/Navigator';

const Read = ({navigation}: ReadProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Text>일기 보기 화면</Text>
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

export default Read;
