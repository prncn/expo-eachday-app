import { View, Text, TouchableOpacity } from 'react-native';
import t from 'twrnc';

export default function Card({ action, removeCard }) {
  return (
    <TouchableOpacity
      style={t.style(
        'w-full h-20 p-4 bg-white rounded-lg flex-row justify-between my-1'
      )}
      onLongPress={removeCard}
    >
      <View>
        <Text style={t.style('text-lg', 'font-medium')}>
          {action.name} for One Hour
        </Text>
        <Text style={t.style('text-gray-400')}>{action.type}</Text>
      </View>
      <View>
        <Text style={t.style('text-green-400')}>+{action.points}</Text>
      </View>
    </TouchableOpacity>
  );
}
