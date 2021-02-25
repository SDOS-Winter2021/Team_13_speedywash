import React from 'react'
import { Text, View, Button } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';

function Temporary({ currentUser, setcurrentUser }) {
    function performSignout() {
        firebase.auth().signOut()
        AsyncStorage.removeItem(keys.storage.USER).then(() => {
            setcurrentUser(null);
        })
    }
    return <View>
        <Text>{currentUser.displayName}</Text>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.phoneNumber}</Text>
        <Button title="Sign out" onPress={performSignout} />
    </View>
}

function Profile({ currentUser, setcurrentUser }) {
    return (
        <View>
            <Temporary currentUser={currentUser} setcurrentUser={setcurrentUser} />
        </View>
    )
}

export default Profile
