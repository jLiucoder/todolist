import React from 'react';
import { Text, StyleSheet, TouchableOpacity,} from 'react-native';


export default function TodoItem({item, pressHandler,longPressHandler}){
  
  return(
    <TouchableOpacity onPress={()=>pressHandler(item.key) }color='white' onLongPress={()=>longPressHandler(item.key)}>
      <Text style= {[styles.item, item.selected===true? styles.itemtrue : styles.itemfalse]}>
              {item.text} 
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemfalse: {
    padding: 16,
    marginTop: 16,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#030b2b',
    overflow: 'hidden',
    color: 'white',
    textAlign: 'center'
  },
  itemtrue: {
    padding: 16,
    marginTop: 16,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#6a7394',
    overflow: 'hidden',
    color: 'white',
    textAlign: 'center'
  }
  
})