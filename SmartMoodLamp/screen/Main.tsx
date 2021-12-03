/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {MainProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/core';
import {
  getDiaryItems,
  getDBconnection,
  createTable,
  DiaryItem,
  getDiaryItem,
} from '../utils/DB';

type dot = {
  [key: string]: {marked: boolean; dotColor: string};
};

const Main = ({navigation}: MainProps) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [writeDays, setWriteDays] = useState<dot>({});
  const tempDays: dot = {};
  const [selectedDiary, setSelectedDiary] = useState<string>('');

  const loadDatasCallback = useCallback(async () => {
    try {
      const db = await getDBconnection();
      await createTable(db);
      const storedDiary: Array<DiaryItem> = await getDiaryItems(db);
      for (let i of storedDiary) {
        tempDays[i.date] = {marked: true, dotColor: '#666768'};
      }
      setWriteDays(tempDays);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadDataCallback = useCallback(async (date: string) => {
    try {
      const db = await getDBconnection();
      await createTable(db);
      const storedText: string = await getDiaryItem(db, date);
      setSelectedDiary(storedText);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    //처음 로딩시 저장된 일기 날짜들 모두 불러옴 (dot)
    loadDatasCallback();
  }, [loadDatasCallback]);

  useFocusEffect(
    useCallback(() => {
      // screen is focused
      loadDatasCallback();
      loadDataCallback(selectedDay);
      return () => {
        // screen is unfocused
      };
    }, []),
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // 앱 처음 로딩시 오늘 날짜 클릭
      const year = today.getFullYear().toString();
      const month = (today.getMonth() + 1).toString();
      const day =
        today.getDate().toString().length === 1
          ? '0' + today.getDate().toString()
          : today.getDate().toString();
      setSelectedDay(year + '-' + month + '-' + day);
      isInitialMount.current = false;
    } else {
      //날짜 클릭할때마다 해당 날짜의 일기 텍스트 불러옴
      loadDataCallback(selectedDay);
    }
  }, [selectedDay]);

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader />
      <Calendar
        current={today}
        onDayPress={day => {
          setSelectedDay(day.dateString);
          setIsSelected(true);
        }}
        markedDates={{
          ...writeDays,
          [selectedDay]: {selected: true, selectedColor: '#BBBBBB'},
        }}
        theme={{
          calendarBackground: '#F0F0F0',
          textDayFontSize: 25,
          textDayFontFamily: '나눔손글씨 느릿느릿체',
          textMonthFontSize: 30,
          textMonthFontFamily: '나눔손글씨 느릿느릿체',
          textDayHeaderFontFamily: '나눔손글씨 느릿느릿체',
          textDayHeaderFontSize: 25,
          todayTextColor: '#2E7779',
          arrowColor: 'black',
        }}
      />
      <View style={styles.diary}>
        <View style={styles.row}>
          <Text style={styles.dayText}>{selectedDay.split('-').join('.')}</Text>
          {selectedDay !== '' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Write', {day: selectedDay})}>
              <Icon name="keyboard" size={30} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.diaryView}>
          <Text style={styles.diaryText}>{selectedDiary}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#E9E9E9',
  },
  diary: {
    backgroundColor: 'transparent',
    flex: 1,
    borderTopColor: 'rgba(73, 84, 100, 0.2)',
    borderTopWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dayText: {
    fontFamily: '나눔손글씨 느릿느릿체',
    fontSize: 25,
  },
  diaryView: {
    marginTop: 15,
    flex: 1,
  },
  diaryText: {
    fontSize: 25,
    fontFamily: '나눔손글씨 느릿느릿체',
  },
});

export default Main;
