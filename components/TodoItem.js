import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function TodoItem({item, pressHandler,longPressHandler}){
  
  return(
    <TouchableOpacity onPress={()=>pressHandler(item.key)} onLongPress={()=>longPressHandler(item.key)}>
      <Text style= {styles.item}>{item.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'grey',
    overflow: 'hidden',
  }
})