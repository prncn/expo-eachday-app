import { View, Text, TouchableOpacity } from 'react-native';
import t from 'twrnc';

export default function Card({ name, removeCard }) {
  return (
    <TouchableOpacity
      style={t.style(
        'w-full h-20 p-4 bg-white rounded-lg flex-row justify-between my-1'
      )}
      onLongPress={removeCard}
    >
      <View>
        <Text style={t.style('text-lg', 'font-medium')}>
          {name} for One Hour
        </Text>
        <Text style={t.style('text-gray-400')}>Physical Activity</Text>
      </View>
      <View>
        <Text style={t.style('text-green-400')}>+150</Text>
      </View>
    </TouchableOpacity>
  );
}
