import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Main = ({navigation, route}) => {
  const {username} = route.params;

  return (
    <View style={styles.container}>
       <Text style={{color:"white",fontSize:20,fontWeight:"bold",paddingBottom:30}}>Hi, {username}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Todo')}>
        <Text style={styles.text}>TODO List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'grey'}]}
        onPress={() => navigation.navigate('Api')}>
        <Text style={styles.text}>Api Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    width: 200,
    height: 50,
    marginTop: 30,
    borderRadius: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
export default Main;
