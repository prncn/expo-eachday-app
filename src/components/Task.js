import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import t from 'twrnc';

export default function Task({ name, onPress }) {
  return (
    <View style={t`w-full bg-blue-100 rounded-lg p-3 my-2`}>
      <View style={t`flex flex-row items-center`}>
        <TouchableOpacity
          onPress={onPress}
          style={t`w-6 h-6 bg-blue-400 mr-4 rounded`}
        ></TouchableOpacity>
        <Text>{name}</Text>
      </View>
    </View>
  );
}
