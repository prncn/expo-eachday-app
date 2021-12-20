import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import t from 'twrnc';
import ExpoFastImage from 'expo-fast-image';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Select({ navigation }) {
  function CloseScreen() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={t.style(
          'bg-black rounded-full w-14 h-14 justify-center items-center absolute top-0 right-2'
        )}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    );
  }

  function Section({ cells, name, children }) {
    cells = cells.reduce(
      (rows, key, index) =>
        (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows,
      []
    );

    return (
      <>
        <View style={t.style('flex-row items-center', 'self-start mt-6')}>
          {children}
          <Text style={t.style('text-2xl', 'font-bold', 'ml-4')}>{name}</Text>
        </View>
        {cells.map((cell, i) => (
          <View key={i} style={t.style('flex-row')}>
            <Cell name={cell[0].name} points={cell[0].points} />
            <Cell name={cell[1].name} points={cell[1].points} />
          </View>
        ))}
      </>
    );
  }

  function Cell({ name, points }) {
    return (
      <TouchableOpacity
        style={t.style(
          'w-1/2 h-30 rounded-lg bg-gray-50 m-1 bg-gray-900 p-3 justify-center flex-row overflow-hidden'
        )}
        onPress={() =>
          navigation.navigate('Main', {
            action: name,
            points,
          })
        }
      >
        <Text
          style={t.style('text-lg py-2 text-white w-3/4', {
            fontFamily: 'PlayfairDisplay_400Regular',
          })}
        >
          {name}
        </Text>
        {name === 'Rhetorics' && (
          <ExpoFastImage
            style={style.img}
            source={require(`../../assets/img/crayon-upgrade.png`)}
          />
        )}
        {name === 'Organising' && (
          <ExpoFastImage
            style={style.img}
            source={require(`../../assets/img/crayon-bad-gateway-2.png`)}
          />
        )}
      </TouchableOpacity>
    );
  }

  const Actions = [
    { name: 'Cardio', points: '150' },
    { name: 'Strength', points: '150' },
    { name: 'Meditation', points: '150' },
    { name: 'Creative Work', points: '150' },
    { name: 'Research', points: '150' },
    { name: 'Rhetorics', points: '150' },
    { name: 'Paperwork', points: '150' },
    { name: 'Cleaning', points: '150' },
    { name: 'Building', points: '150' },
    { name: 'Organising', points: '150' },
  ];

  return (
    <View style={t.style('bg-gray-50')}>
      <ScrollView
        style={t.style('mt-10')}
        contentContainerStyle={t.style('items-center p-3 bg-gray-50')}
      >
        <CloseScreen />
        <Section cells={Actions.slice(0, 2)} name="Body">
          <Ionicons name="barbell-outline" size={24} color="black" />
        </Section>
        <Section cells={Actions.slice(2, 6)} name="Mind">
          <FontAwesome5 name="brain" size={24} color="black" />
        </Section>
        <Section cells={Actions.slice(6)} name="Chores">
          <FontAwesome5 name="briefcase" size={24} color="black" />
        </Section>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -20,
    right: -150,
  },
});
