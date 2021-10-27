import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainProps} from '../utils/Navigator';

const Main = ({navigation}: MainProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Icon name="lamp" size={50} color="black" style={styles.icon} />
      <TouchableOpacity
        style={styles.writeBtn}
        onPress={() => navigation.navigate('Write')}>
        <Text style={styles.text}>일기 쓰기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.readBtn}
        onPress={() => navigation.navigate('Read')}>
        <Text style={styles.text}>일기 보기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  writeBtn: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'black',
  },
  readBtn: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Main;
