/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import {ResultProps} from '../utils/Navigator';
import {NavigationHeader} from '../components/Header';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

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
      <NavigationHeader />
      <View style={styles.padding}>
        <ScrollView>
          <View style={styles.sentense}>
            <Text style={styles.title}>문장 별 감정분석</Text>
            <ScrollView horizontal={true}>
              <LineChart
                data={data}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                width={Dimensions.get('window').width + 100}
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                style={styles.chart}
              />
            </ScrollView>
          </View>
          <View style={styles.percentage}>
            <Text style={styles.title}>감정 비율 분석</Text>
            <ScrollView horizontal={true}>
              <LineChart
                data={data}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                width={Dimensions.get('window').width + 100}
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                style={styles.chart}
              />
            </ScrollView>
          </View>
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
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  chart: {
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: '나눔손글씨 느릿느릿체',
    marginBottom: 10,
  },
  sentense: {
    alignItems: 'center',
    marginBottom: 20,
  },
  percentage: {
    alignItems: 'center',
  },
});

export default Result;
