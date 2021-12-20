import { Calendar } from 'react-native-calendars';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import t from 'twrnc';
import { AreaChart, Grid, LineChart, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Menubar } from './Main';
import { useEffect, useState } from 'react';

export default function Stats({ route, navigation }) {
  const { points } = route.params || 0;
  const [data, setData] = useState([50, 90, 0, 95, -4, -24, 0]);
  const today = new Date().getDate();

  useEffect(() => {
    if (points !== undefined) {
      setData([50, 90, 0, 95, -4, -24, Number(points / 10)]);
      console.log(data);
      console.log(route?.params);
      console.log(points);
    }
  }, [points]);

  return (
    <LinearGradient
      style={t`flex bg-gray-50 flex-1 p-5 pt-15 h-full`}
      colors={['#f3f4f6', '#e6dcf1']}
    >
      <Calendar
        minDate={'2021-05-10'}
        maxDate={'2022-05-30'}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        monthFormat={'MMM d, yyyy'}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        firstDay={1}
        hideDayNames={true}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        theme={{
          selectedDayBackgroundColor: 'red',
          selectedDayTextColor: 'red',
          todayTextColor: 'red',
          textDisabledColor: 'linen',
          dotColor: '#fca5a5',
          selectedDotColor: '#ffffff',
          monthTextColor: '#fca5a5',
          indicatorColor: 'red',
          textSectionTitleColor: 'red',
          arrowColor: 'black',
        }}
        style={t.style('rounded-lg')}
      />
      <View
        style={t.style(
          'my-7 rounded-lg bg-gray-800 h-52 shadow-2xl',
          style.shadow
        )}
      >
        <Text style={t.style('text-white absolute top-2 left-2')}>
          Last 7 Days
        </Text>
        <LineChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ stroke: '#fca5a5' }}
        />
        <XAxis
          style={{ marginHorizontal: -10, marginTop: 20 }}
          data={data}
          formatLabel={(value, index) => (index + today - 6) % 31}
          contentInset={{ left: 30, right: 30 }}
          svg={{ fontSize: 20, fill: 'black' }}
        />
      </View>
      <Menubar navigation={navigation} />
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  shadow: {
    shadowRadius: 20,
    shadowOffset: { width: 6 },
    shadowColor: '#1f2937',
    shadowOpacity: 0.6,
    elevation: 10,
  },
});
