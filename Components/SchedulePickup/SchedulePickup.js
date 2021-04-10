import React, { useState } from 'react'
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { TextInput } from 'react-native';
import keys from "../../configs/KEYS"
import * as Crypto from 'expo-crypto';
import * as firebase from 'firebase';
import { removeValue } from "../../configs/CacheManager"

/*
    Child of SchedulePickup
    UI component that allows user to select 
    prefereable time slot for pickup of clothes
*/
function TimePickerList({ time, setTime }) {
    const Slots = ["9 - 10 AM",
        "10 - 11 AM",
        "11 - 12 AM",
        "12 - 1 PM",
        "1 - 2 PM",
        "2 - 3 PM",
        "3 - 4 PM",
        "4 - 5 PM"]

    return <Picker style={styles.picker} mode="dropdown" selectedValue={time} onValueChange={(itemValue, itemIndex) => { setTime(itemValue) }}>
        {Slots.map((item) => <Picker.Item key={item} label={item} value={item} />)}
    </Picker>

}
/*
    Child of SchedulePickup
    UI Component responsible for allowing user to switch it's address
    <Address is only switchable if it has been added in manage address>
*/
function AddressPicker({ currentUser, address, setAddress }) {
    const Slots = ["home", "office", "other"]
    return <View>
        <Picker style={styles.picker} mode="dropdown" selectedValue={address} onValueChange={(itemValue) => {
            if (currentUser[itemValue] == "") {
                Alert.alert("Address Not found", "Go to Profile -> Manage Address to Add address")
                return;
            }
            setAddress(itemValue)
        }}>
            {Slots.map((item) => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
        <TextInput style={{ margin: 10, textAlign: 'center', fontSize: 15 }} editable={false} multiline={true} value={currentUser[address]} />
    </View>


}

/*
    Father Component of this module
    Responsible for taking final information related to placing order
    and updating the order placing information into the database
*/
function SchedulePickup({ setcurrentView, currentUser, data, amount }) {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState("4 - 5 PM")
    const [address, setAddress] = useState("home")
    const maxDate = new Date(new Date().setDate(new Date().getDate() + 7))
    const [pickDate, setPickDate] = useState(false);
    const [pressable, setPressable] = useState(true);

    /*
        This function is responsible for placing order
        order id is generated as an hash of concatenation of user id and orderTime string
        SHA1 is used for generating the hash
        This function also updates/pushes the order related information into the database
    */
    function placeOrder() {
        setPressable(false)
        const oTime = new Date()
        Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, currentUser.uid + oTime.toString())
            .then((hash) => {
                const orderInfo = {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    phoneNumber: currentUser.phoneNumber,
                    orderItems: data,
                    pickUpAddress: currentUser[address],
                    pickUpDate: date,
                    pickUpTimeSlot: time,
                    orderTime: oTime,
                    orderTimeString: oTime.toString(),
                    addressLabel: address,
                    totalAmount: amount,
                    pickUpTimeSlotStart: parseInt(time.split(" ")[0]),
                    pickUpTimeSlotEnd: parseInt(time.split(" ")[2]),
                    orderStatus: keys.orderStatus.PLACED,
                    oid: hash
                }
                firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).get().then((record) => {
                    if (record.exists) {
                        firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).update({
                            [orderInfo.oid]: orderInfo
                        }).then(() => {
                            Alert.alert("Success", "Your order has been placed successfully, go to profile to see more details")
                            removeValue(keys.storage.CART)
                        }).then(() => {
                            setcurrentView({
                                screen: keys.screens.HOME,
                                header: true,
                                footer: true
                            })
                        })

                    }
                    else {
                        firebase.firestore().collection("incompleteOrders").doc(currentUser.uid).set({
                            [orderInfo.oid]: orderInfo
                        }).then(() => {
                            Alert.alert("Success", "Your order has been placed successfully, go to My orders to see more details")
                            removeValue(keys.storage.CART)
                        }).then(() => {
                            setcurrentView({
                                screen: keys.screens.HOME,
                                header: true,
                                footer: true
                            })
                        })
                    }
                })
            })
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.touchable} onPress={() => { setPickDate(true) }} >
                <Text style={styles.dateText} >{date == null ? "Select Pickup Date" : date.toDateString()}</Text>
            </TouchableOpacity>
            {pickDate && <RNDateTimePicker minimumDate={new Date()} maximumDate={maxDate} value={date == null ? new Date() : date} onChange={(e, newSelectedDate) => { setPickDate(false); setDate(newSelectedDate) }} />}
            <TimePickerList time={time} setTime={setTime} />
            <AddressPicker currentUser={currentUser} address={address} setAddress={setAddress} />
            <Button title={"Place Order"} disabled={date == null || time == null || !pressable} onPress={placeOrder} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        textAlign: 'center',
        justifyContent: "center",
    },
    touchable: {

    },
    picker: {
        textAlign: 'center',
        justifyContent: "center",
        margin: 10,
        borderRadius: 10,
    },
    dateText: {
        textAlign: 'center',
        justifyContent: "center",
        margin: 10,
    }
})

export default SchedulePickup
