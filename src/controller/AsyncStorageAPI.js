import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
}

export async function readData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Removed key ' + key);
  } catch (error) {
    console.log(error);
  }
}

export function getTotalPoints(log) {
  let sum = 0;
  for (const item of log) {
    sum += Number(item.points);
  }
  return sum;
}
