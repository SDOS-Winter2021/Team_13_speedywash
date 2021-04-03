import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React,{Component, useEffect, useState} from 'react';
import { InputAccessoryView } from 'react-native';
import {View,Text, ImageBackground, Pressable,Image, Button, TouchableOpacity} from 'react-native';
import { getValue, setValue,cleanCache} from '../../configs/CacheManager';
import keys from '../../configs/KEYS';
import styles from './styles';

const ServiceItemType= (props) => {
    const {type,price,image,heading,title} = props;
    useEffect(()=>{
            let isMounted = true;
            getValue(keys.storage.CART).then((value)=>{
                if(value==null){
                    
                    setCount(0);
                }
                else{   
                    // cleanCache();         
                    if(value[heading]==null){
                        value[heading] = {};
                    }
                    if(value[heading][title]==null){
                        value[heading][title] = {};
                    }
                    if(value[heading][title][type]==null){
                        value[heading][title][type] = {countitem:0,price:price};
                         
                    }
                    // console.log(value);
                    // console.log(value[heading][title][type][countitem);
                    setCount(value[heading][title][type].countitem)
                    // console.log("end");
                }
            })
            return ()=>{isMounted=false};
        }
    );
    const [count,setCount] = useState(0);
    
    const [data,setData] = useState(null);
    var isactive = false;
    function increment(){
        isactive = true;
        getValue(keys.storage.CART).then((value)=>{
            if(value==null){
                var map_count = {};
                map_count[heading] = {}
                map_count[heading][title] = {}
                map_count[heading][title][type] = {countitem:0, price:price}
                setValue(keys.storage.CART,map_count,keys.time.DAY)
                setData(map_count);
                setCount(0);
            }
            else{

            
                if(value[heading]==null){
                    value[heading] = {};
                }
                if(value[heading][title]==null){
                    value[heading][title] = {};
                }
                if(value[heading][title][type]==null){
                    value[heading][title][type] = {countitem:0, price:price};
                }
                // console.log("hii")
                value[heading][title][type].countitem+=1
                setCount(value[heading][title][type].countitem)
                // console.warn("ITEM ADDED TO CART")
                setValue(keys.storage.CART,value,keys.time.DAY).then((value1)=>{
                    
                    isactive = false
                })
                // console.log(value);
                // console.log("ppp");
            }
        })
    };
    function decrement(){
        isactive = true;
        getValue(keys.storage.CART).then((value)=>{
            if(value==null){
                var map_count = {};
                map_count[heading] = {}
                map_count[heading][title] = {}
                map_count[heading][title][type] = {countitem:0, price:price}
                setValue(keys.storage.CART,map_count,keys.time.DAY)
                setData(map_count);
                setCount(0);
            }
            else{            
                if(value[heading]==null){
                    value[heading] = {};
                }
                if(value[heading][title]==null){
                    value[heading][title] = {};
                }
                if(value[heading][title][type]==null){
                    value[heading][title][type] = {countitem:0, price:price};
                }

                if(value[heading][title][type].countitem>0){
                    value[heading][title][type].countitem-=1
                    setCount(value[heading][title][type].countitem)
                    
                    
                    // console.warn("ITEM REMOVED FROM CART")
                }
                // console.log(value);
                if( value[heading][title][type].countitem==0){
                    delete(value[heading][title][type]);
                }
                if(Object.keys(value[heading][title]).length==0){
                    delete(value[heading][title]);
                }
                if(Object.keys(value[heading]).length==0){
                    delete(value[heading]);
                }
                // console.log(value);
                setValue(keys.storage.CART,value,keys.time.DAY).then((value1)=>{
                    
                    isactive = false
                })
                // console.log(value);  
                // console.log("llll");  
            }
        })
    
    };
    return (
        <View style={styles.Container}>

            

            <View style={styles.box}>
                <Image source={require('../../assets/images/sample.png')} resizeMode="stretch" style={styles.image} defaultSource={require('../../assets/images/sample.png')}></Image>
            </View>

            <View style={styles.type}><Text style={styles.typetext}>{type}</Text></View>
            <View style={styles.type2}><Text style={styles.typetext}>{price}₹/Qty</Text></View>
            
            <View style = {styles.counter} >
                <TouchableOpacity disabled={isactive} onPress={increment} style = {styles.button}>
                    <Text style = {styles.buttontext}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={isactive} onPress={decrement}  style = {styles.button}>
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