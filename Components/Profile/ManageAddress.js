import React, { useState } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import * as firebase from 'firebase';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { getValue } from "../../configs/CacheManager"
import CurrentLocationPicker from "../CurrentLocationPicker/CurrentLocationPicker"
import { Alert } from 'react-native';

function parseLocation(location) {
    return `${location.name == null ? '' : location.name} ${location.steet == null ? '' : location.street} ${location.district == null ? '' : location.district} ${location.city == null ? '' : location.city} ${location.postalCode == null ? '' : location.postalCode} ${location.subregion == null ? '' : location.subregion} ${location.region == null ? '' : location.region} ${location.country == null ? '' : location.country}`
}

function AddressUpdater({ currentAddresses, selectedAddress, setSelectedAddress }) {
    const slots = ["home", "office", "other"]
    return <Picker mode="dropdown" selectedValue={selectedAddress} onValueChange={(itemValue) => {
        setSelectedAddress(itemValue)
    }}>
        {slots.map((item) => <Picker.Item key={item} label={item} value={item} />)}
    </Picker>
}

function ManageAddress({ currentUser, setcurrentUser, setcurrentView }) {
    const [currentAddresses, setcurrentAddresses] = useState({
        home: currentUser.home,
        office: currentUser.office,
        other: currentUser.other
    })
    const [selectedAddress, setSelectedAddress] = useState("home");
    const [location, setlocation] = useState(null)
    const [numericalLocationObject, setNumericalLocationObject] = useState(null)
    // const addressList = [
    //     {
    //         id: "1",
    //         name: "Home",
    //         state: "New Delhi",
    //         address: "G-3, Milap Nagar, Uttam Nagar",
    //         pincode: "110059"

    //     },
    //     {
    //         id: "2",
    //         name: "Work",
    //         state: "New Delhi",
    //         address: "Boys hostel, IIITD, Okhla,",
    //         pincode: "110020"
    //     },
    //     {
    //         id: "3",
    //         name: "Work",
    //         state: "New Delhi",
    //         address: "Boys hostel, IIITD, Okhla,",
    //         pincode: "110020"
    //     }
    // ]
    // const [addresses,setAddress] = useState(addressList);

    // function deleteAddress(curr_id){
    //     if(addresses.length == 1){
    //         Alert.alert("Atleast one address required") ;
    //     }
    //     else{
    //         setAddress(addresses.filter((item) => (item.id != curr_id)))
    //     }
    // }

    // function _renderAddress(curr_address) {
    //     return (
    //         <View style={styles.card}>
    //             <View >
    //                 <Text style={styles.cardText}>
    //                     {curr_address.name}
    //                 </Text>
    //                 <Text style={styles.cardText}>
    //                     {curr_address.address}
    //                 </Text>
    //                 <Text style={styles.cardText}>
    //                     {curr_address.state}
    //                 </Text>
    //                 <Text style={styles.cardText}> 
    //                     {curr_address.pincode}
    //                 </Text>
    //             </View> 
    //             <TouchableOpacity style={styles.icons} onPress={()=>deleteAddress(curr_address.id)}>
    //                 <MaterialIcons style={styles.cardImage} name='delete' size={30} color={'grey'}/>  
    //             </TouchableOpacity>  
    //         </View>);
    // }   

    function updateAddress() {
        if (currentAddresses.home.trim() == "") {
            Alert.alert("Empty Address", "Home Address Must not be empty")
            return;
        }
        firebase.firestore().collection("users").doc(currentUser.uid).update({
            ...currentAddresses
        }).then(() => {
            AsyncStorage.setItem(keys.storage.USER, JSON.stringify({ ...currentUser, ...currentAddresses }))
                .then(() => {
                    AsyncStorage.getItem(keys.storage.USER)
                        .then((value) => {
                            setcurrentUser(JSON.parse(value))
                            Alert.alert("Success", "Address Updated Successfully")
                            setcurrentView({ screen: keys.screens.PROFILE, header: true, footer: true })
                        })
                })
        })
    }

    function LiveLocationSetter(newLocation){
        if(newLocation!=null)
        {
            setlocation(newLocation)
            setcurrentAddresses((prev)=>({
                ...prev,
                [selectedAddress]: parseLocation(newLocation)
            }))
        }
    }

    return (
        <View style={styles.homeScreen}>
            {/* <Text
                style={styles.ManageAddressTitle}>
                Manage Address
            </Text> 
            <SafeAreaView style={{ flex: 1, marginBottom: 15 }}>
                {
                    addresses.map(_renderAddress)
                }
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
                <View style={styles.submitButton}>
                    <Button onPress={()=>setcurrentView({screen: keys.screens.PROFILE, header: true, footer: true})} title="Go Back"/>
                    <Button onPress={()=> addresses.length == 3 ? Alert.alert("Address limit reached") : 
                        setcurrentView({screen: keys.screens.ADDADDRESS, header: true, footer: true})} 
                        title="Add Address" />
                </View>
            </SafeAreaView> */}
            <View style={styles.subView}>
                <AddressUpdater currentAddresses={currentAddresses} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />

                <TextInput
                    autoFocus
                    style={styles.addressField}
                    value={currentAddresses[selectedAddress]}
                    onChangeText={(text) => setcurrentAddresses((prev) => ({ ...prev, [selectedAddress]: text }))}
                    multiline={true} />
                <CurrentLocationPicker setLocation={LiveLocationSetter} setNumericalLocationObject={setNumericalLocationObject} />

                <View style={styles.ButtonView}>
                    <Button title={"Update"} onPress={updateAddress} />
                </View>
                <View style={styles.ButtonView}>
                    <Button onPress={() => setcurrentView({ screen: keys.screens.PROFILE, header: true, footer: true })} title="Go Back" />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    ButtonView: {
        marginVertical: 10,
    },
    subView: {
        textAlign: 'center',
        margin: 20,
    },
    addressField: {
        fontSize: 15,
        marginBottom: 20
        // textAlign: 'center',
        // margin: 20
    },
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    },
    ManageAddressTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        color: keys.colors.MAIN,
        marginVertical: '2%'
    },

    icons: {
        alignSelf: 'center'
    },

    card: {
        backgroundColor: "white",
        width: '92%',
        height: "25%",
        borderStyle: 'solid',
        borderWidth: 1,
        marginHorizontal: '4%',
        borderRadius: 15,
        marginBottom: "2%",
        marginTop: "2%",
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',

    },
    cardImage: {
        alignSelf: 'flex-end',
        marginBottom: '4%',
        justifyContent: 'flex-end'
    },
    cardText: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 18,
        color: keys.colors.MAIN,
        padding: "1%",
        paddingHorizontal: '5%',
        marginHorizontal: "1%",

    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '46%',
        height: undefined,
        aspectRatio: 1 / 0.185,
        fontSize: 18,
        marginHorizontal: '4%',
        marginVertical: '1%',

    },
});
export default ManageAddress
