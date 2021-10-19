/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ReadProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {Calendar} from 'react-native-calendars';
import {useState} from 'react';

const Read = ({navigation}: ReadProps) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'일기 확인'}
      />
      <Calendar
        current={today}
        onDayPress={day => {
          console.log('push', day);
          setSelectedDay(day.dateString);
          setIsSelected(true);
        }}
        markedDates={{[selectedDay]: {selected: true}}}
      />
      <TouchableOpacity
        style={[styles.btn, isSelected && {backgroundColor: 'skyblue'}]}
        disabled={!isSelected ? true : false}
        onPress={() => {
          navigation.navigate('ReadText', {day: selectedDay});
        }}>
        <Text style={styles.btnText}>
          {isSelected
            ? '일기 확인하러 가기'
            : '일기를 확인할 날짜를 선택해주세요.'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
  btn: {
    marginTop: 20,
    width: '100%',
    backgroundColor: 'gray',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  btnText: {
    fontSize: 15,
    color: 'white',
  },
});

export default Read;
