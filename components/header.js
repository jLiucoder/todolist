import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function Header(){
  return(
    <View style ={styles.header}>
      <Text style={styles.title}>My Todos</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  header:{
    height:80,
    paddingTop: 38,
    backgroundColor: 'grey'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#fff',

  }
})
