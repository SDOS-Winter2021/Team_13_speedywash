/**
 * @module
 */
import React from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Modal, Dimensions } from "react-native";


/**
 * Adds Address 
 * @param {Object} obj - An object
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setCurrentUser - current user setter
 * @param {function} obj.setcurrentView - current view setter
 * @return {View} - React Component View
*/
function AddAddress({ currentUser, setcurrentUser, setcurrentView }) {
    const services = [
        {
            id: "1",
            name: "Add",
            action: (onPress) => {
                handleAdd();
            }
        },
        {
            id: "2",
            name: "Go Back",
            action:(onPress) => setcurrentView({screen: keys.screens.PROFILE, header: true, footer:true})
        }
    ]
    const _renderItem = (item) => {
        return <View style={styles.serviceListItem}
            key={item.id}>
            <TouchableOpacity
                onPress = {()=>item.action()} // to be added
                style={styles.listItemTouchable}>
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.ServiceNameStyle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    function handleAdd(){
        
    }

    return (
        <View style={styles.homeScreen}>
            <Text
                style={styles.AddAddressTitle}>
                Add New Address
            </Text> 
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Address Name" 
            />
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter Address" 
            />
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter State" 
            />
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter Pincode" 
            />
            <SafeAreaView style={{ flex: 1, marginBottom: 15 }}>
                {
                    services.map(_renderItem)
                }
            </SafeAreaView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    },
    AddAddressTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        color: keys.colors.MAIN,
        marginVertical: '2%'
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
    submitButton:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        width: '46%',
        height: undefined,
        aspectRatio: 1 / 0.185,
        marginHorizontal: '4%',
        marginVertical: '1%',   
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
    serviceListItem: {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1 / 0.2,
        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 7
    },
    
});
export default AddAddress
