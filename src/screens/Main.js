import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import t from 'twrnc';
import Card from '../components/Card';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { Easing, ScrollView } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { readData, storeData } from '../../App';

export default function Main({ route, navigation }) {
  const { action, points } = route.params || 'none';
  const [actions, setActions] = useState([]);
  const [progress, setProgress] = useState(0);
  const progressWheel = useRef();

  useEffect(() => {
    (async () => {
      const current_key = `@${new Date().toDateString()}`;
      if (actions.length === 0) {
        const stored = readData(current_key);
        setActions(stored);
        setProgress(getTotalPoints(stored));
      } else {
        storeData(current_key, actions);
      }
    })();

    if (action) {
      setActions([...actions, { name: action, points }]);
      setProgress(progress + points / 10);
      progressWheel.current.animateTo(
        progress + points / 10,
        1000,
        Easing.bezier(0.175, 0.885, 0.32, 1.275)
      );
    }
  }, [action, points]);

  function getTotalPoints(log) {
    return log.reduce((a, b) => a.points + b.points);
  }

  function getCurrentDate() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date().toLocaleDateString('de-DE', options);
  }

  const removeCard = useCallback(
    (action, i) => {
      setActions(actions.filter((item, index) => i !== index));
      const newProgess = progress - action.points / 10;
      setProgress(newProgess);
      progressWheel.current.animateTo(
        newProgess,
        1000,
        Easing.bezier(0.175, 0.885, 0.32, 1.275)
      );
    },
    [progress]
  );

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
            fontFamily: 'PlayfairDisplay_400Regular',
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
        <Text style={t`font-medium text-2xl text-white w-1/2`}>
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
              'text-white absolute top-1/2 left-1/3 text-right text-xl',
              { textAlign: 'center' }
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
              name={action.name}
              removeCard={() => removeCard(action, i)}
            />
          ))}
        </ScrollView>
      </View>
      <Menubar navigation={navigation} points={progress} />
    </LinearGradient>
  );
}

export function Menubar({ navigation, points }) {
  return (
    <View style={t`flex flex-row justify-around items-center mt-auto mb-10`}>
      <TouchableOpacity>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Calendar', {
            points,
          })
        }
      >
        <Feather name="calendar" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={t.style(
          'w-18 h-18 items-center justify-center bg-gray-800 rounded-full shadow-md',
          style.shadow
        )}
        onPress={() => navigation.navigate('Select')}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Feather name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="bell" size={24} color="black" />
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
