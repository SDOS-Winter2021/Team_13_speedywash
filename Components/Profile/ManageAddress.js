import React, {useState} from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import {StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import { Alert } from 'react-native';

function ManageAddress({ currentUser, setcurrentUser, setcurrentView }) {
    const addressList = [
        {
            id: "1",
            name: "Home",
            state: "New Delhi",
            address: "G-3, Milap Nagar, Uttam Nagar",
            pincode: "110059"
    
        },
        {
            id: "2",
            name: "Work",
            state: "New Delhi",
            address: "Boys hostel, IIITD, Okhla,",
            pincode: "110020"
        },
        {
            id: "3",
            name: "Work",
            state: "New Delhi",
            address: "Boys hostel, IIITD, Okhla,",
            pincode: "110020"
        }
    ]
    const [addresses,setAddress] = useState(addressList);

    function deleteAddress(curr_id){
        if(addresses.length == 1){
            Alert.alert("Atleast one address required") ;
        }
        else{
            setAddress(addresses.filter((item) => (item.id != curr_id)))
        }
    }

    function _renderAddress(curr_address) {
        return (
            <View style={styles.card}>
                <View >
                    <Text style={styles.cardText}>
                        {curr_address.name}
                    </Text>
                    <Text style={styles.cardText}>
                        {curr_address.address}
                    </Text>
                    <Text style={styles.cardText}>
                        {curr_address.state}
                    </Text>
                    <Text style={styles.cardText}> 
                        {curr_address.pincode}
                    </Text>
                </View> 
                <TouchableOpacity style={styles.icons} onPress={()=>deleteAddress(curr_address.id)}>
                    <MaterialIcons style={styles.cardImage} name='delete' size={30} color={'grey'}/>  
                </TouchableOpacity>  
            </View>);
    }   

    return (
        <View style = {styles.homeScreen}>
            <Text
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
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
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
        alignSelf : 'flex-end',  
        marginBottom: '4%',
        justifyContent : 'flex-end'
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
    submitButton:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '46%',
        height: undefined,
        aspectRatio: 1 / 0.185,
        fontSize:18,
        marginHorizontal: '4%',
        marginVertical: '1%',
         
    },
});
export default ManageAddress
