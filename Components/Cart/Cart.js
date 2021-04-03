import { stopLocationUpdatesAsync } from 'expo-location';
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView,TouchableOpacity} from 'react-native'
import { getValue, setValue } from '../../configs/CacheManager'
import keys from '../../configs/KEYS'
import ServiceSpecific from '../ServiceSpecific/ServiceSpecific.js';
import styles from './styles.js';
import SchedulePickup from "../SchedulePickup/SchedulePickup"
function Cart({ currentView,setcurrentView,currentUser,setcurrentUser}) {
    const [data,setData] = useState(null);
    var vdata = {}
    const [total,setTotal] = useState(0);
    const [didMount, setDidMount] = useState(false);
    const[proceed,setProceed] = useState(false);
    const [date, setDate] = useState(null)
    const [time, setTime] = useState("4 - 5 PM")
    console.disableYellowBox = true;
    useEffect(()=>{
        setDidMount(true);
        getValue(keys.storage.CART).then((value)=>{
            if(value==null){
                setData(null);
                setTotal(0);
            }
            else{
                
                setData(value)
               
            }
        })
        return ()=>{setDidMount(false);
        }
    })
    useEffect(()=>{
        setDidMount(true);
        if(data==null){
            setTotal(0);
        }
        else{
            list_of_headings = Object.keys(data)
            // console.log(list_of_headings)
                var price = 0
                for(i=0;i<list_of_headings.length;i++){
                    list_of_titles = Object.keys(data[list_of_headings[i]])
                    for(j=0;j<list_of_titles.length;j++){
                        list_of_types =Object.keys(data[list_of_headings[i]][list_of_titles[j]])
                        for(k=0;k<list_of_types.length;k++){
                            price+=data[list_of_headings[i]][list_of_titles[j]][list_of_types[k]].countitem * data[list_of_headings[i]][list_of_titles[j]][list_of_types[k]].price;
                        }
                    }
                }
                setTotal(price)
        }
        return ()=>{setDidMount(false)}
    },[data])
    if(!didMount){
        return null;
    }
    return (
        proceed==true?
        <View><SchedulePickup date={date} time={time} setDate={setDate} setTime={setTime} /></View>:
        <View style={styles.bigcontainer}>
        <ScrollView style = {styles.container}>
           
        
            <View style = {styles.allservices}>
            
            {data!=null && Object.keys(data).map((item,key)=>{return(<View key = {key} style={styles.services}>
                
                
                <ServiceSpecific data={data[item]} serviceSelected={item} currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView}>

                </ServiceSpecific> 
             
                </View>
                
                
            )})}
            
          
           
            {data==null &&<View><Text>CART IS EMPTY</Text></View>}
            </View>
           
        </ScrollView>
        {<TouchableOpacity disabled={(data==null)||(total==0)} onPress={()=>{
           setProceed(true);
        }} style={styles.total}><Text style={styles.totaltext}>Total Amount is {total}</Text><Text style={styles.totaltext}>(Click to Proceed)</Text></TouchableOpacity>}
        </View>
    )
}

export default Cart
