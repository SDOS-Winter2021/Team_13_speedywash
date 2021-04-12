import React, { useEffect, useState } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

function MyOrders({ currentUser, setcurrentUser, setcurrentView }) {
    const [orderType, setOrderType] = useState(0);
    const [incompleteOrders, setIncompleteOrders] = useState({});
    const [completedOrders, setCompletedOrders] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [incompleteOrdersList, setIncompleteOrdersList] = useState(null);
    const [completedOrdersList, setCompletedOrdersList] = useState(null);
    const [Order, setOrder] = useState({});
    useEffect(() => {
        firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).get().then((record) => {
            console.log("Incompleted Orders Requested");
            //console.log(record.data());
            if (record && record.data()) {
                //console.log(Object.keys(record.data()));
                setIncompleteOrders(record.data());
                setIncompleteOrdersList(Object.keys(record.data()));
            }
        })
        .then((record) => {
            console.log("Completed Orders Requested");
            //console.log(record.data());
            if (record && record.data()) {
                //console.log(Object.keys(record.data()));
                setCompletedOrders(record.data());
                setCompletedOrdersList(Object.keys(completedOrders));
            }
        })
    }, [])
    
    
    console.log(incompleteOrdersList);
    function TopBar(){
        return <View style={styles.topBar}>
        <TouchableOpacity 
        style={orderType == 0 ? styles.selectedTypeButton : styles.unselectedTypeButton}
        onPress={()=>{
            orderType == 1 && setSelectedOrder(null);
            setOrderType(0)
            }}>
            <Text style={styles.orderTypeText}>Active Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={orderType == 1 ? styles.selectedTypeButton : styles.unselectedTypeButton}
        onPress={()=>{
            orderType == 1 && setSelectedOrder(null);
            setOrderType(1)
            }}>
            <Text style={styles.orderTypeText}>Past Orders</Text>
        </TouchableOpacity>
    </View>
    }



    const _renderIncompleteItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        pickupDate = incompleteOrders[item]["pickUpDate"].toDate();
        return <View style={styles.outerBox} key={item}> 

            <View style={{flexDirection: "row"}}>
                <View style={{flex: 0.5, flexDirection: "column", justifyContent: 'space-around'}}>     
                    {
                        Object.keys(incompleteOrders[item]["orderItems"]).map((current)=>{
                            return <Text
                            style={styles.orderDetails} 
                            key={current}>{current}</Text>
                        })
                    }
                </View>
                <View style={{flex: 0.5, flexDirection: "column", justifyContent: 'center'}}>
                    <Text style={styles.pickupDate}>{pickupDate.getDate()+"/"+pickupDate.getMonth()+"/"+pickupDate.getFullYear()}</Text>
                    <Text style={styles.pickupSlot}>{incompleteOrders[item]["pickUpTimeSlot"]}</Text>
                </View>
            </View>
            <Text style={styles.amountToBe}>{"Amount to Pay : "+incompleteOrders[item]["totalAmount"]}</Text>
            <View style={styles.statusBar}> 
                <TouchableOpacity
                disabled="true">
                    <View style={styles.statusBox}>
                        <Text style={styles.statusText}>Pickup Pending</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.cancelBox}>
                        <Text style={styles.cancelText}>CANCEL ORDER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    };

    return <ScrollView 
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.wholePage}>
        <TopBar></TopBar>
        {
            incompleteOrdersList==null ||
            (orderType==0 && incompleteOrdersList.map(_renderIncompleteItem))
        }
        {
            completedOrdersList==null ||
            (orderType==1 && completedOrdersList.map(_renderIncompleteItem))
        }
    </ScrollView>
}

const styles = StyleSheet.create({
    wholePage: {
        flex: 1,
        width: "100%"
    },
    amountToBe : {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: 'bold',
        margin: "3%"
    },
    orderDetails : {
        fontWeight: 'bold',
        fontSize: 16,
        margin: "2%",
        textAlign: 'center'
    },
    pickupDate : {
        fontWeight: 'bold',
        fontSize: 17,
        margin: "2%",
        alignSelf: 'center'
    },
    pickupSlot : {
        fontSize: 15,
        margin: "2%",
        alignSelf: 'center'
    },
    topBar: {
        width: "100%",
        height: undefined,
        aspectRatio: 1/0.12,
        flexDirection: "row"
    },
    outerBox : {
        width: "94%",
        alignSelf: 'center',
        marginVertical: "2%",
        backgroundColor: "#F4F0F0"
    },
    statusBar :{
        marginBottom: "5%",
        width: "100%",
        height: undefined,
        aspectRatio: 1/0.10,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    statusBox :{
        backgroundColor: "#BFE9B5"
    },
    cancelBox : {
        backgroundColor: "#FCA19C"
    },
    statusText : {
        fontSize: 15,
        textTransform: 'uppercase',
        margin: '5%',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: "#14760F"
    },
    cancelText : {
        fontSize: 15,
        color: "#9D1010",
        textTransform: 'uppercase',
        margin: '5%',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    orderTypeText : {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'
    },
    selectedTypeButton: {
        borderWidth: 6,
        borderColor: "#C8C6C6",
        backgroundColor: "white",
        flex: 0.5,
        justifyContent: 'center'
    },
    unselectedTypeButton: {
        borderWidth: 6,
        borderColor: "#C8C6C6",
        backgroundColor: "#C8C6C6",
        flex: 0.5,
        justifyContent: 'center'
    },
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    }
});
export default MyOrders