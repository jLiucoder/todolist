// import * as React, {useState}from 'react';

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/addTodo'
import { setDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';

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
    setTodos((todos)=>{

      todos.forEach(todo => {
        if (todo.key === key && todo.selected === false){
          todo.selected = true
          alert(todo.selected)
        }else if(todo.key === key && todo.selected === true ){
          todo.selected = false
          alert(todo.selected)
        } 
      });
       
      return todos;  
    })
  } 

  const longPressHandler=(key)=>{
    setTodos((prevTodos)=>{
          return prevTodos.filter(todo=> todo.key != key)
        });

     
  }


  const submitHandler=(text)=>{
    
    setTodos((prevTodos)=>{
     
      if(text == ""){
        alert("nothing to add!")
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

  const joinItem = ()=>{
     
    // setTodos((todos)=>{

    //   todos.forEach(todo => {
    //     if ( todo.selected === true){
    //       tempString.push(todo.text + '/')
          
    //     }
    //     } 
    //   );
      
    //   return [
    //     {text: tempString, key: Math.random().toString(), selected: false},
    //     ...todos
    //   ];
    // })
  }

  return (
    
    <View style={styles.container}> 
     <Header/>
      <View style={styles.header}>

      </View>
      {/**content */}
      <View style={styles.content}>
        <AddTodo submitHandler = {submitHandler}/>
        <View style={styles.fixToText}>
        <Button
          title="Split"
          onPress={() => {splitItem}}
        />
        <Button
          title="Join"
          onPress={joinItem()}
        />
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
    backgroundColor : '#030b2b'
  },
  content: {
    margin: -30,
    marginBottom: 100,
    padding: 40,
  },
  list:{
    marginTop: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  buttonContainer:{
    flex:1
  },
  true:{

  }

 
});
