// import * as React, {useState}from 'react';

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/addTodo'

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1', selected: false},
    {text: 'buy shoes', key: '2', selected: false},
    {text: 'code', key: '3',selected: false},
    {text: 'eat', key: '4', selected: false},
    {text: 'workout', key: '5', selected: false},
    {text: 'haha', key: '6',selected: false},
    {text: 'selfteach', key: '7',selected: false},
    {text: 'wathever', key: '8',selected: false},
  ]);

  const[text, onChangeText]=useState("new item")
  const[labelone, setLabelOne] = useState("label one")
  const[labeltwo, setLabelTwo] = useState("label two")

  const pressHandler=(key)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo=> todo.key != key)
    });
  }

  const longPressHandler=(key)=>{
    setTodos((todos)=>{

      todos.forEach(todo => {
        if (todo.key === key){
          todo.selected = true
          
          alert(todo.selected)
        }
      });
      
      return todos;
    })
  }


  const submitHandler=(text)=>{
    
    setTodos((prevTodos)=>{
     
      if(text == ""){
        
        return prevTodos
      }
      
      return [
        {text: text, key: Math.random().toString(), selected: false},
        ...prevTodos
      ];

      
    })
  }

  const splitItem = ()=>{
    var labels = text.split(',')
    setLabelOne(labels[0])
    setLabelTwo(labels[1])
  }

  const joinItem = (text)=>{
    var newText = labelone + "," + labeltwo
    onChangeText(newText)
  }

  return (
    
    <View style={styles.container}> 
     <Header/>
      <View style={styles.header}>

      </View>
      {/**content */}
      <View style={styles.content}>
        <AddTodo submitHandler = {submitHandler}/>
        <View style={styles.buttonContainer}>
          <Button title="Split" onPress={()=>splitItem()} color = 'grey'/>
          <Button title="Join" onPress={()=>joinItem()} color = 'grey'/>
        </View>
        <View style ={styles.list}>
          <FlatList
            data = {todos}
            onChangeText={onChangeText}
            value = {text}
            renderItem={({item})=>(
              <TodoItem item = {item} pressHandler={pressHandler} longPressHandler = {longPressHandler}/>
            )}
          />

        </View>
     
      </View>  
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'black'
  },
  content: {
    margin: -30,
    marginBottom: 100,
    padding: 40,
  },
  list:{
    marginTop: 20,
  },
  buttonContainer:{
    flex:1
  }
 
});
