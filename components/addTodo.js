
import React ,{useState} from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default function AddTodo({submitHandler}){
  const[text,setText] = useState('')

  const changeHandler = (val)=>{
    setText(val);
    
  }

  return(
    <View style ={styles.header}>
      <TextInput 
        clearButtonMode="always"
        style = {styles.input}
        placeholder='type here'
        onChangeText={changeHandler}  
      />
      <Button onPress={()=>submitHandler(text)} title='add todo' color='grey'/>
    </View>
  )
}


const styles = StyleSheet.create({
 input: {
   padding: 16,
    marginTop: 16,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'grey',
    overflow: 'hidden',
 }
})
