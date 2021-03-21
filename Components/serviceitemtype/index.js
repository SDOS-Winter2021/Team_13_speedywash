import React,{Component, useState} from 'react';
import {View,Text, ImageBackground, Pressable,Image, Button, TouchableOpacity} from 'react-native';
import styles from './styles';

const ServiceItemType= (props) => {
  const [count,setCount] = useState(0);
  const {type,price,image} = props;
  return (
    <View style={styles.Container}>

        

        <View style={styles.box}>
            <Image source={require('../../assets/images/sample.png')} resizeMode="stretch" style={styles.image} defaultSource={require('../../assets/images/sample.png')}></Image>
        </View>

        <View style={styles.type}><Text style={styles.typetext}>{type}</Text></View>
        <View style={styles.type2}><Text style={styles.typetext}>{price}₹/Qty</Text></View>
        
        <View style = {styles.counter} >
            <TouchableOpacity onPress={()=>{setCount(count+1)}} style = {styles.button}>
                <Text style = {styles.buttontext}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{if(count>0) {setCount(count-1)}}}  style = {styles.button}>
                <Text style = {styles.buttontext }>-</Text>
            </TouchableOpacity>
            {/* <Button title = { "+" } onPress={()=>{setCount(count+1)}} style = {styles.button}></Button> */}
            <Text style={styles.typetext}>{count}</Text>
            
            {/* <Button title = { "-" } onPress={()=>{if(count>0) {setCount(count-1)}}} style = {styles.button}></Button> */}
        
        </View>
        
  </View>
  );
};

export default ServiceItemType;