/**
 * @module
 */
import React, { useEffect, useState } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

/**
 * Show user their current order and past order, for current order allows them to see amount to be paid, 
 * Current status/stage and cancel orders.
 * @param {Object} obj - An object
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setcurrentUser - current user setter
 * @param {function} obj.setcurrentView - set current visible/selected view
 * @returns {View} - React Coponent View
 */
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
                // BELOW 2 LINES ARE ONLY FOR TWO TESTING PURPOSES. BE SURE TO COMMENT THEM FOR CORRECT WORKING
                setCompletedOrders(record.data());
                setCompletedOrdersList(Object.keys(record.data()));
            }
        })
    }, [])
    
    //console.log(completedOrdersList);
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

    const onConfirmedDelete = (item) =>{
        //console.log("Delete confirmed");
        
        const temp = {...incompleteOrders};
        delete temp[item];
        setIncompleteOrdersList(Object.keys(temp));
        setIncompleteOrders(temp);
        firebase.firestore()
        .collection("incompleteOrders").doc(currentUser.uid).set(temp);
    };

    const onClickCancel = (item) => {
        Alert.alert(
            "Confirm Cancellation",
            "Are you sure you want to delete this order?",
            [
                {
                    text: "Confirm",
                    onPress: () => { onConfirmedDelete(item) },
                    style: "cancel"
                },
                {
                    text: "Dismiss",
                    style: "destructive"
                }
            ]
        );

    };

    const _renderIncompleteItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        
        // return <View><Text>djhf</Text><Button title="kdjf" onPress={()=>{onClickCancel(item)}}></Button></View>
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
                    <Text style={styles.pickupText}>Pickup Date</Text>
                    <Text style={styles.pickupDate}>{pickupDate.getDate()+"/"+pickupDate.getMonth()+"/"+pickupDate.getFullYear()}</Text>
                    <Text style={styles.pickupSlot}>{incompleteOrders[item]["pickUpTimeSlot"]}</Text>
                </View>
            </View>
            <Text style={styles.amountToBe}>{"Amount to Pay : "+incompleteOrders[item]["totalAmount"]}</Text>
            <View style={styles.statusBar}> 
                <TouchableOpacity
                disabled="true">
                    <View style={styles.statusBox}>
                        <Text style={styles.statusText}>{incompleteOrders[item]["orderStatus"]["message"]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{ onClickCancel(item) }}>
                    <View style={styles.cancelBox}>
                        <Text style={styles.cancelText}>CANCEL ORDER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    };

    const _renderCompletedItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        
        // return <View><Text>djhf</Text><Button title="kdjf" onPress={()=>{onClickCancel(item)}}></Button></View>
        pickupDate = completedOrders[item]["pickUpDate"].toDate();
        // Uncomment below line when database is updated with drop dates
        // dropDate = completedOrders[item]["dropDate"].toDate();
        return <View style={styles.outerBox} key={item}> 

            <View style={{flexDirection: "row"}}>
                <View style={{flex: 0.5, flexDirection: "column", justifyContent: 'space-around'}}>     
                    {
                        Object.keys(completedOrders[item]["orderItems"]).map((current)=>{
                            return <Text
                            style={styles.orderDetails} 
                            key={current}>{current}</Text>
                        })
                    }
                </View>
                <View style={{flex: 0.5, flexDirection: "column", justifyContent: 'center'}}>
                    <Text style={styles.pickupText}>Pickup Date</Text>
                    <Text style={styles.pickupSlot}>{pickupDate.getDate()+"/"+pickupDate.getMonth()+"/"+pickupDate.getFullYear()}</Text>
                    <Text style={styles.pickupText}>Drop Off Date</Text>
                    <Text style={styles.pickupSlot}>17/4/2021</Text>
                </View>
            </View>
            <Text style={styles.amountToBe}>{"Total Cost : "+completedOrders[item]["totalAmount"]}</Text>
            <View style={styles.statusBar}> 
                <TouchableOpacity
                disabled="true">
                    <View style={styles.completeBox}>
                        <Text style={styles.completeText}>ORDER COMPLETED</Text>
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
            (orderType==1 && completedOrdersList.map(_renderCompletedItem))
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
    pickupText : {
        fontWeight: 'bold',
        fontSize: 18,
        margin: "2%",
        alignSelf: 'center'
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
    completeBox : {
        backgroundColor: "#BFE9B5"
    },
    statusBox :{
        backgroundColor: "#F0F3AA"
    },
    cancelBox : {
        backgroundColor: "#FCA19C"
    },
    completeText : {
        fontSize: 15,
        textTransform: 'uppercase',
        margin: '5%',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: "#14760F"
    },
    statusText : {
        fontSize: 15,
        textTransform: 'uppercase',
        margin: '5%',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: "#A79A1C"
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
    }
});
export default MyOrders