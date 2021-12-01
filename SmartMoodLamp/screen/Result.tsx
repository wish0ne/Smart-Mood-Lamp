/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Dimensions} from 'react-native';
import {ResultProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {BarChart} from 'react-native-chart-kit';

//감정 결과 : 0~1 사이 소수. 0.2단위로 구분

const Result = ({navigation, route}: ResultProps) => {
  let labelArr: string[] = [];
  const [sentiments, setSentiments] = useState<Array<number>>(
    route.params.sentiments,
  );

  for (let i = 1; i <= sentiments.length; i++) {
    labelArr.push(i.toString());
  }

  const data = {
    labels: labelArr,
    datasets: [{data: sentiments}],
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader
        goBack={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        title={'감정 분석 결과'}
      />
      <Text>각 문장당 감정 분석 결과</Text>
      <BarChart
        data={data}
        chartConfig={{
          backgroundGradientFrom: '#DFD8CA',
          backgroundGradientTo: '#EEEBDD',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        width={Dimensions.get('window').width - 60}
        height={300}
        yAxisLabel=""
        yAxisSuffix=""
        style={styles.chart}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 30,
    flex: 1,
  },
  chart: {
    borderRadius: 16,
  },
});

export default Result;
