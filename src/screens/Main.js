import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import t from 'twrnc';
import Card from '../components/Card';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { Easing, ScrollView } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getTotalPoints,
  readData,
  removeValue,
  storeData,
} from '../controller/AsyncStorageAPI';

export default function Main({ route, navigation }) {
  const [actions, setActions] = useState([]);
  const [progress, setProgress] = useState(0);
  const progressWheel = useRef();

  useEffect(() => {
    (async () => {
      const current_key = `@${new Date().toDateString()}`;
      console.log(current_key);
      if (actions.length === 0) {
        const stored = await readData(current_key);
        if (stored != null) {
          setActions(stored);
        }
      } else {
        storeData(current_key, actions);
      }
    })();
  }, [actions]);

  useEffect(() => {
    if (route.params?.action != null) {
      setActions([
        ...actions,
        {
          name: route.params?.action,
          points: route.params?.points,
          type: route.params?.type,
        },
      ]);
    }
    route.params = {};
  }, [route.params]);

  useEffect(() => {
    setProgress(getTotalPoints(actions) / 10);
    progressWheel.current.animateTo(
      getTotalPoints(actions) / 10,
      1000,
      Easing.bezier(0.175, 0.885, 0.32, 1.275)
    );
  }, [actions]);

  function getCurrentDate() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date().toLocaleDateString('de-DE', options);
  }

  function removeCard(action, i) {
    setActions(actions.filter((item, index) => index !== i));
  }

  return (
    <LinearGradient
      style={t`flex bg-gray-50 flex-1 p-5 pt-20`}
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
        source={require('../../assets/img/scribbles-scribbles-40.png')}
      />
      <View style={t`mb-5`}>
        <Text
          style={t.style('text-3xl py-2', {
            fontFamily: 'PlayfairDisplay_600SemiBold',
          })}
        >
          eachDay
        </Text>
        <Text style={t`text-gray-400 text-lg font-medium`}>
          {getCurrentDate()}
        </Text>
      </View>
      <View
        style={t.style('w-full h-40 rounded-lg p-2 relative', style.shadow)}
      >
        <Text
          style={t.style('font-medium text-2xl text-white w-2/3', {
            fontFamily: 'Inter_500Medium',
          })}
        >
          What have you done today?
        </Text>
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
          }}
        >
          <AnimatedProgressWheel
            animateFromValue={0}
            duration={3000}
            width={5}
            size={100}
            color={'white'}
            backgroundColor={'gray'}
            ref={progressWheel}
          />
          <Text
            style={t.style(
              'text-white absolute top-10 left-8 text-right text-xl w-10',
              { textAlign: 'right' }
            )}
          >
            {progress}%
          </Text>
        </View>
      </View>
      <View style={t.style('my-5 h-1/2')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {actions.map((action, i) => (
            <Card
              key={i}
              action={action}
              removeCard={() => removeCard(action, i)}
            />
          ))}
        </ScrollView>
      </View>
      <Menubar navigation={navigation} points={progress} />
    </LinearGradient>
  );
}

export function Menubar({ navigation, night }) {
  return (
    <View style={t`flex flex-row justify-around items-center mt-auto mb-10`}>
      <TouchableOpacity onPress={() => navigation.navigate('Night')}>
        <Feather name="moon" size={24} color={night ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
        <Feather name="calendar" size={24} color={night ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={t.style(
          'w-18 h-18 items-center justify-center bg-gray-800 rounded-full shadow-md',
          style.shadow
        )}
        onPress={() => navigation.navigate('Select')}
      >
        <Feather name="plus" size={24} color={night ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Feather name="home" size={24} color={night ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notify')}>
        <Feather name="bell" size={24} color={night ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  shadow: {
    shadowRadius: 20,
    shadowOffset: { width: 6 },
    shadowColor: '#fca5a5',
    shadowOpacity: 0.6,
    backgroundColor: '#fca5a5',
    elevation: 10,
  },
});
