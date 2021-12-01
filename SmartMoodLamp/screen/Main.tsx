/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {MainProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDiaryItems, getDBconnection, createTable} from '../utils/DB';

const Main = ({navigation}: MainProps) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBconnection();
      await createTable(db);
      const storedDiary = await getDiaryItems(db);
      console.log('storedDiary', storedDiary);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader />
      <Calendar
        current={today}
        onDayPress={day => {
          console.log('push', day);
          setSelectedDay(day.dateString);
          setIsSelected(true);
        }}
        markedDates={{
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
          todayTextColor: '#719192',
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
});

export default Main;
