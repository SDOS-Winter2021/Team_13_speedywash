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

    useEffect(() => {
        firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).get().then((record) => {
            console.log("Incompleted Orders Requested");
            //console.log(record.data());
            if (record && record.data()) {
                //console.log(Object.keys(record.data()));
                setIncompleteOrders(record.data());
            }
        })
    }, [])
    useEffect(() => {
        firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).get().then((record) => {
            console.log("Completed Orders Requested");
            //console.log(record.data());
            if (record && record.data()) {
                //console.log(Object.keys(record.data()));
                setCompletedOrders(record.data());
            }
        })
    }, [])
    
    const [incompleteOrdersList, setIncompleteOrdersList] = useState(Object.keys(incompleteOrders));
    const [completedOrdersList, setCompletedOrdersList] = useState(Object.keys(completedOrders));

    function TopBar(){
        return <View style={styles.topBar}>
        <TouchableOpacity 
        style={orderType == 0 ? styles.selectedTypeButton : styles.unselectedTypeButton}
        onPress={()=>{setOrderType(1-orderType); setSelectedOrder(null)}}>
            <Text style={styles.orderTypeText}>Active Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={orderType == 1 ? styles.selectedTypeButton : styles.unselectedTypeButton}
        onPress={()=>{setOrderType(1-orderType); setSelectedOrder(null)}}>
            <Text style={styles.orderTypeText}>Past Orders</Text>
        </TouchableOpacity>
    </View>
    }

    const _renderItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        return <View style={styles.serviceListItem}
            /* key won't be required while using FlatList*/
            key={item}>
            <TouchableOpacity>
                // onPress={() => setServiceSelected(item)}
                // style={styles.listItemTouchable}>
                // <View style={{ flex: 0.4 }}>
                //     <Image resizeMode="contain" style={styles.serviceImage} source={require("../../assets/favicon.png")} />
                // </View>
                // <View style={{ flex: 0.6 }}>
                //     <Text style={styles.ServiceNameStyle}>{item}</Text>
                // </View>
            </TouchableOpacity>
        </View>
    };

    return <ScrollView 
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.wholePage}>
        <TopBar></TopBar>

        <View style={{flex: 0.8}}>
            <Text>dlkjfldjl</Text>
        </View>
        {
            orderType==0 ? 
            incompleteOrdersList.map(_renderItem) :
            completedOrdersList.map(_renderItem)
        }
    </ScrollView>
}

const styles = StyleSheet.create({
    wholePage: {
        flex: 1,
        width: "100%"
    },
    topBar: {
        width: "100%",
        height: undefined,
        aspectRatio: 1/0.12,
        flexDirection: "row"
    },
    orderTypeText : {
        textAlign: "center",
        fontSize: 16,
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
    },
    EditProfileTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        color: keys.colors.MAIN
    },
    input: {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1 / 0.185,
        marginHorizontal: '4%',
        marginVertical: '1%',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20
    },
    card: {
        backgroundColor: "white",
        width: '92%',
        height: "25%",
        borderStyle: 'solid',
        borderWidth: 1,
        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 17,
        marginVertical: "2%",
        marginBottom: "8%",
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: keys.colors.MAIN,
    },
    cardText: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 18,
        color: keys.colors.MAIN,
        padding: "2%",
        marginHorizontal: "2%",
    },
    submitButton: {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1 / 0.185,
        marginHorizontal: '4%',
        marginVertical: '1%',
        borderRadius: 5
    },
    listItemTouchable: {
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    ServiceNameStyle: {
        fontSize: 20,
        alignSelf: 'center',
        margin: '10%'
    },
});
export default MyOrders