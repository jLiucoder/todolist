// import * as React, {useState}from 'react';

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, VirtualizedList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from './components/header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/addTodo';
import { Alert, SectionList } from 'react-native-web';

export default function App() {

  let loadUrlAddress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=jiayuliu"
  let saveUrlAddress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=jiayuliu"
  let InitialLoadUrl = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=jerry"
  tempString = ''
  
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: Math.random().toString(), selected: false},
    {text: 'buy shoes', key: Math.random().toString(), selected: false},
    {text: 'code', key: Math.random().toString(),selected: false},
    {text: 'eat', key: Math.random().toString(), selected: false},
    {text: 'workout', key: Math.random().toString(), selected: false},  
    {text: 'haha', key: Math.random().toString(),selected: false},
    {text: 'selfteach', key: Math.random().toString(),selected: false},
    {text: 'wathever', key: Math.random().toString(),selected: false},
    
  ]);

  useEffect(() => {
    loadList(InitialLoadUrl, todos)
  }, [])
  
 
  
  // Alert.alert('loaded remote source')
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



  async function loadList(url, list){
    const response = await fetch(url)
    const names = await response.json()

    names.forEach((item)=>{
      list.push({text:item.text, key:Math.random().toString(), selected:false})
    })

    const newList = list.map((item)=>{return item})
    setTodos(newList)
    
  } 

 
  async function saveList(url, list){
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(list)
    }
    const response = await fetch(url, requestOptions)
    
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
        <Button
          title="Load list"
          onPress={()=>loadList(loadUrlAddress, todos)}
        />
        <Button
          title="Save list"
          onPress={()=>saveList(saveUrlAddress, todos)}
        />
      </View>
        <View style ={styles.list}>
          <VirtualizedList
            data = {todos}
            onChangeText={onChangeText}
            value = {text}  
            getItem={(data, index) => data[index]}
            getItemCount={data => data.length}
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
    flex:1,
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

 
});
