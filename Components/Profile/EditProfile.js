import React, {useEffect, useState} from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { setValue } from "../../configs/CacheManager";

function EditProfile({ currentUser, setcurrentUser,setcurrentView }) {
    
    const [avatarName,setavatarname] = useState(currentUser.displayName);
    const [userDetails, setUserDetails] = useState({
        name:  currentUser.displayName,
        email: currentUser.email
    });
    // const [img,setImg] = useState(currentUser.photoURL == "" ? require("../../assets/avatar.png") : currentUser.photoURL);
    const [img,setImg] = useState("../../assets/avatar.png");
    const [isPicked,setPicked] =  useState(false);
    
    const pickImage=()=>{
        console.log('pick image called');
        ImagePicker.requestMediaLibraryPermissionsAsync().then((status)=>{
            console.log(status)
            if(status.granted){
                console.log('2');
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect:[4,3],
                    quality:1
                }).then((result)=>{
                    console.log('3');
                    if(!result.cancelled){
                        setImg(result.uri)
                        setPicked(true);
                    }
                })
            }
        });   
    }
    function handleName(text){
        setUserDetails(prevValue => {
            return {
                name: text,
                email: prevValue.email
            };
        });
    }
    function handleEmail(text){
        setUserDetails(prevValue => {
            return {
                name: prevValue.name,
                email: text
            };
        });
        
    }
    function handleUpdates(){
        const newObj = {
            ...currentUser,
            "displayName" : userDetails.name,
            "email" : userDetails.email,
            
        }
        firebase.firestore().collection("users").doc(currentUser.uid).update(newObj).then(() => {
            setcurrentUser(newObj)
            setValue(keys.storage.USER,newObj,keys.time.WEEK)
        });
        setavatarname(userDetails.name);
        Alert.alert("Details updated")    
    }

    function AvatarCard() {
        return (
            <View style={styles.card}>
                <View>
                    <Text style={styles.cardText}>
                        {avatarName}
                    </Text>
                    <Text style={styles.cardText}>
                        {currentUser.phoneNumber}
                    </Text>

                </View>
                {/* <Image resize Mode="contain" style={styles.cardImage} source={
                    {uri: currentUser.photoURL == "" ? require("../../assets/avatar.png") : currentUser.photoURL}
                    } /> */}
                {isPicked ? <Image resize Mode="contain" style={styles.cardImage} source={{uri:img}} /> :
                <Image resize Mode="contain" style={styles.cardImage} source={require("../../assets/avatar.png")} />}
            </View>);
    }
    const services = [
        {
            id: "1",
            name: "Upload Image",
            action: (onPress) => {
                pickImage();
            }
        },
        {
            id: "2",
            name: "Update",
            action: (onPress) => {
                handleUpdates();
            }
        },
        {
            id: "3",
            name: "Go Back",
            action: (onPress) => setcurrentView({screen: keys.screens.PROFILE, header: true, footer:true})
        }
    ]
    const _renderItem = (item) => {
        return <View style={styles.submitButton}
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
    return (
        <View style = {styles.homeScreen}>
            <AvatarCard/>  
            <Text
                style={styles.EditProfileTitle}>
                Edit Profile
            </Text> 
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                value = {userDetails.name} 
                onChangeText = {(text) => handleName(text)}
            />
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                value = {userDetails.email}
                onChangeText = {(text) => handleEmail(text)}
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
    submitButton:{
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
export default EditProfile