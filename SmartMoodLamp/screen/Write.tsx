import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {WriteProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {getDBconnection, saveDiary} from '../utils/DB';
import axios from 'axios';

const Write = ({navigation, route}: WriteProps) => {
  const [diary, setDiary] = useState<string>('');
  const [sentiments, setSentiments] = useState<Array<number>>([]);

  const addDiary = async (date: string, text: string) => {
    try {
      console.log(date);
      const db = await getDBconnection();
      await saveDiary(db, date, text, '');
      console.log('diary save 성공');
      fetchText();
    } catch (error) {
      console.error(error);
    }
  };
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      navigation.navigate('Result', {
        day: route.params.day,
        sentiments: sentiments,
      });
    }
  }, [sentiments, navigation, route.params.day]);

  //작성한 text 전송
  const fetchText = async () => {
    try {
      const res = await axios.post('http://54.172.94.216:3000/api/text', {
        text: diary,
      });
      setSentiments(res.data.sentiments);
    } catch (e) {
      console.log(e);
    }
  };

  const day: string = route.params.day.split('-').join('.');

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader />
      <View style={styles.padding}>
        <View style={styles.day}>
          <Text style={styles.dayText}>{day}</Text>
          <View style={styles.bar} />
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'일기를 작성해 주세요'}
          onChangeText={text => {
            setDiary(text);
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => addDiary(route.params.day, diary)}>
          <Text style={styles.btnText}>감정{'\n'}확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#E9E9E9',
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  day: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dayText: {
    fontFamily: '나눔손글씨 느릿느릿체',
    fontSize: 35,
  },
  bar: {
    height: 3,
    backgroundColor: 'black',
    width: 100,
  },
  textInput: {
    fontFamily: '나눔손글씨 느릿느릿체',
    flex: 1,
    borderWidth: 1,
    textAlignVertical: 'top',
    fontSize: 25,
    color: 'black',
  },
  btn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: 16,
    right: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: '나눔손글씨 느릿느릿체',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Write;
