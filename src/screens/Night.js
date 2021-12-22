import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import t from 'twrnc';
import { Menubar } from './Main';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Night({ navigation }) {
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    if (!playing) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/audio/mixkit-light-rain-looping-1249.mp3')
      );
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
    } else {
      sound.unloadAsync();
    }

    setPlaying(!playing);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  return (
    <LinearGradient
      style={t`flex bg-gray-50 flex-1 p-5 pt-15 h-full`}
      colors={['#0d4749', '#1b222d']}
    >
      <Image
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          top: -50,
          right: -50,
        }}
        source={require('../../assets/img/scribbles-scribbles-41.png')}
      />
      <View style={t`mb-5`}>
        <Text
          style={t.style('text-3xl py-2 text-white', {
            fontFamily: 'PlayfairDisplay_600SemiBold',
          })}
        >
          eachNight
        </Text>
        <Text style={t`text-gray-400 text-lg font-medium`}>
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      <Text
        style={t.style('text-5xl w-3/4 mt-40 mb-10 text-white', {
          fontFamily: 'PlayfairDisplay_600SemiBold',
        })}
      >
        Sleep scheduling goes here.
      </Text>
      <TouchableOpacity
        style={t.style(
          'justify-center items-center p-4 rounded-full bg-green-200 w-3/4',
          style.shadow
        )}
        onPress={playSound}
      >
        {playing ? (
          <Feather name="pause" size={24} color="black" />
        ) : (
          <Feather name="play" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Menubar navigation={navigation} night />
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  shadow: {
    shadowRadius: 20,
    shadowOffset: { width: 6 },
    shadowColor: '#bbf7d0',
    shadowOpacity: 0.3,
    elevation: 10,
  },
});
