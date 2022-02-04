// import * as React, {useState}from 'react';

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/addTodo';

export default function App() {
  tempString = ''
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
          tempString +="/"+todo.text
         
          alert('selected ' + todo.text)
        }else if(todo.key === key && todo.selected === true ){
          todo.selected = false   

          if(tempString ===""){
            tempString=""
          }else{
            tempString -=todo.text
          }
          alert('de-selected '+todo.text)
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
     
      if(text === ""){
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
    setTodos((prevTodos)=>{
      var todolist = []
      var templist = []
      prevTodos.forEach(todo => {
        if(!todo.selected){
          todolist.push(todo)
        }else{
          var newName = todo.text.split('/')
          newName.forEach(oneName =>{
            todolist.push({text: oneName, key:Math.random().toString(), selected: false})
          })
        }
        
      }); 
    todolist = todolist.filter(todolist =>todolist.text !=='')
     return todolist

   })
  }

  const joinItem = ()=>{
    
    setTodos((prevTodos)=>{
      
       prevTodos=prevTodos.filter(todo => todo.selected ===false)
      return [
        {text: tempString, key: Math.random().toString(), selected: false},
        ...prevTodos
      ];

    })
    
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
          onPress={splitItem}
        />
        <Button
          title="Join"
          onPress={joinItem}
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
