/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {WriteTextProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getDBconnection, saveDiary} from '../utils/DB';

const WriteText = ({navigation, route}: WriteTextProps) => {
  const [diary, setDiary] = useState<string>('');

  const addDiary = async (date: string, text: string) => {
    try {
      console.log(date);
      const db = await getDBconnection();
      await saveDiary(db, date, text, '');
      console.log('diary save 성공');
      navigation.navigate('Result');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'일기 작성하기'}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.dateText}>{route.params.day}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={'일기를 작성해 주세요'}
        multiline
        onChangeText={text => {
          setDiary(text);
        }}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addDiary(route.params.day, diary);
        }}>
        <Text style={styles.btnText}>감정 분석하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
  textInput: {
    height: '75%',
    width: '100%',
    borderWidth: 1,
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    color: 'white',
  },
  dateText: {
    fontSize: 15,
  },
});

export default WriteText;
