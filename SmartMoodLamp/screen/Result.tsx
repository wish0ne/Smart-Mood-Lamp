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
import {LineChart, PieChart} from 'react-native-chart-kit';

//감정 결과 : 0~1 사이 소수. 0.2단위로 구분

const Result = ({navigation, route}: ResultProps) => {
  const day: string = route.params.day.split('-').join('.');

  let labelArr: string[] = [];
  const [sentiments, setSentiments] = useState<Array<number>>(
    route.params.sentiments,
    //[0.1, 0.75, 0.43, 0.12, 0.78, 0.23, 0.43, 0.95, 1.0, 0.04],
  );

  for (let i = 1; i <= sentiments.length; i++) {
    labelArr.push(i.toString());
  }

  //linechart data
  const data = {
    labels: labelArr,
    datasets: [{data: sentiments}],
  };

  //piechart
  let excited: number = 0;
  let happy: number = 0;
  let neutral: number = 0;
  let sad: number = 0;
  let cry: number = 0;

  for (let i of sentiments) {
    if (i < 0.2) {
      cry += 1;
    } else if (i < 0.4) {
      sad += 1;
    } else if (i < 0.6) {
      neutral += 1;
    } else if (i < 0.8) {
      happy += 1;
    } else {
      excited += 1;
    }
  }

  const pieData = [
    {
      name: 'Excited',
      population: excited,
      color: '#C8DAD3',
      legendFontColor: 'black',
      legendFontSize: 13,
    },
    {
      name: 'Happy',
      population: happy,
      color: '#719192',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Neutral',
      population: neutral,
      color: '#5588A3',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Sad',
      population: sad,
      color: '#465881',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Cry',
      population: cry,
      color: '#63707E',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationHeader />

      <View style={styles.padding}>
        <View style={styles.day}>
          <Text style={styles.dayText}>{day}</Text>
          <View style={styles.bar} />
        </View>
        <View style={styles.tipView}>
          <View style={styles.numberBackground}>
            <View style={styles.number}>
              <Text style={styles.numberText}>0</Text>
            </View>
            <View style={styles.number}>
              <Text style={styles.numberText}>0.2</Text>
            </View>
            <View style={styles.number}>
              <Text style={styles.numberText}>0.4</Text>
            </View>
            <View style={styles.number}>
              <Text style={styles.numberText}>0.6</Text>
            </View>
            <View style={[styles.number, styles.endNumber]}>
              <Text style={styles.numberText}>0.8</Text>
              <Text style={styles.numberText}>1.0</Text>
            </View>
          </View>
          <View style={styles.barBackground}>
            <View style={styles.cry}>
              <Text style={styles.text}>CRY</Text>
            </View>
            <View style={styles.sad}>
              <Text style={styles.text}>SAD</Text>
            </View>
            <View style={styles.neutral}>
              <Text style={styles.text}>NEUTRAL</Text>
            </View>
            <View style={styles.happy}>
              <Text style={styles.text}>HAPPY</Text>
            </View>
            <View style={styles.excited}>
              <Text style={styles.text}>EXCITED</Text>
            </View>
          </View>
        </View>
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
                    r: '8',
                  },
                }}
                width={Dimensions.get('window').width - 40}
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                style={styles.chart}
                getDotColor={(dataPoint, dataPointIndex) => {
                  if (dataPoint < 0.2) {
                    return '#63707E';
                  } else if (dataPoint < 0.4) {
                    return '#465881';
                  } else if (dataPoint < 0.6) {
                    return '#5588A3';
                  } else if (dataPoint < 0.8) {
                    return '#719192';
                  } else {
                    return '#C8DAD3';
                  }
                }}
              />
            </ScrollView>
          </View>
          <View style={styles.percentage}>
            <Text style={styles.title}>감정 비율 분석</Text>
            <ScrollView>
              <PieChart
                data={pieData}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                width={Dimensions.get('window').width - 40}
                height={200}
                accessor={'population'}
                backgroundColor={'white'}
                paddingLeft={'30'}
                style={styles.pieChart}
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
  pieChart: {
    borderRadius: 16,
  },
  day: {
    alignItems: 'center',
    marginBottom: 30,
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
  tipView: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  barBackground: {
    backgroundColor: 'blue',
    width: '100%',
    height: 30,
    flexDirection: 'row',
  },
  excited: {
    backgroundColor: '#C8DAD3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  happy: {
    backgroundColor: '#719192',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neutral: {
    backgroundColor: '#5588A3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sad: {
    backgroundColor: '#465881',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cry: {
    backgroundColor: '#63707E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: '나눔손글씨 느릿느릿체',
    fontSize: 20,
  },
  numberBackground: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
  },
  number: {
    flex: 1,
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 25,
    fontFamily: '나눔손글씨 느릿느릿체',
  },
  endNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Result;
