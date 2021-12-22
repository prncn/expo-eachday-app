import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import t from 'twrnc';
import { Menubar } from './Main';
import { useEffect, useState } from 'react';

export default function Notify({ navigation }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    async function getapi() {
      const url = 'https://zenquotes.io/api/random/';
      const response = await fetch(url);
      var data = await response.json();
      console.log(data);
      setQuote(`${data[0].q}`);
    }

    getapi();
  }, []);

  return (
    <LinearGradient
      style={t`flex bg-gray-50 flex-1 p-5 pt-15 h-full`}
      colors={['#f3f4f6', '#e6dcf1']}
    >
      <Image
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          top: -20,
          right: -150,
        }}
        source={require('../../assets/img/scribbles-scribbles-3.png')}
      />
      <Text
        style={t.style('text-5xl w-3/4 mt-40 mb-10', {
          fontFamily: 'PlayfairDisplay_600SemiBold',
        })}
      >
        Notify me when when I have been inactive.
      </Text>
      <Text style={t.style('w-2/3 text-gray-500')}>{quote}</Text>
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
