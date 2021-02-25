import React,{useEffect} from 'react'
import { Button, TextInput, View, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import keys from "../../configs/KEYS"

function MyTextField({incompleteUser, setincompleteUser, placeholder, attribute, isEditable, isAutofocus}){
    return <TextInput
            style={styles.textBox}
            placeholder={placeholder}
            editable={isEditable}
            autoFocus={isAutofocus}
            value={incompleteUser[attribute]}
            onChangeText={(text)=>setincompleteUser((prev)=>({...prev, [attribute]: text}))} 
    />
}

/*
    1. Check if the verfied user already exists in the database, if yes then it's a login
        * Store them to local storage (create session)
        * redirect to homepage
    2. If the instance of user doesn't exists in database then it's a signup in that case
        * Take username, email as an input
        * store them into local storage (create session)
        * Push them to database as well 
        * Redirect to home page
*/
function CreateUser({ incompleteUser, setincompleteUser, currentUser, setcurrentUser }) {
    const db = firebase.firestore();
    useEffect(() => {
        console.log("Database requested")
        db.collection("users").doc(incompleteUser.uid).get().then(doc => {
            console.log(doc.data())
            if (doc.exists) {
                AsyncStorage.setItem(keys.storage.USER, JSON.stringify(doc.data()))
                setcurrentUser(doc.data())
            }
        })
    }, [])


    function handleSubmission(){
        db.collection("users").doc(incompleteUser.uid).set(incompleteUser);
        setcurrentUser(incompleteUser);
        AsyncStorage.setItem(keys.storage.USER, JSON.stringify(incompleteUser))
    }

    return (
        <View style={styles.Container}>
            <MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={true} placeholder="Your name" attribute="displayName" isEditable={true} />
            <MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={false} placeholder="Email" attribute="email" isEditable={true} />
            <MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={false} placeholder="Contact Number" attribute="phoneNumber" isEditable={false} />
            <Button disabled={incompleteUser.email.length==0 || incompleteUser.displayName.length==0 || incompleteUser.phoneNumber.length==0 } title="Submit" onPress={handleSubmission}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center"
    },
    textBox: {
        fontSize: 20,
        margin: "10%",
    }
})

export default CreateUser
