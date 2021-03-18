import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import "./configs/firebase-init";
import SignInScreen from "./Components/Auth/SignInScreen";
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import keys, { data } from "./configs/KEYS"
import GenericLayout from './Components/GenericLayout/GenericLayout';

/*
	* Looks for user if present in localstorage then updates the current user value
	* When user logs out this item is removed from local storage as well as firebase
	* if user returned is null then it implies user hasn't logged in therefore redirected to sign in screen
	* When user logs in it's one instance is also created in local storage as well. 
*/
function UpdateCurrentUser(setcurrentUser) {
	AsyncStorage.getItem(keys.storage.USER).then(value => {
		if (value != null)
			setcurrentUser(JSON.parse(value));
	});
}

/*
	* Main App function consist of two states
	* Unauthorized: in that case redirected to authentication screen/ Signinscreen
	* Authroized: In that case redirected to home screen
*/
export default function App() {
	const [currentUser, setcurrentUser] = useState(null);

	useEffect(() => {
		//firebase.firestore().collection("homepage").doc("data").set(data);
		UpdateCurrentUser(setcurrentUser)
	}, [])


	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				barStyle="default"
				showHideTransition="none"
				hidden={false}
			/>
			{!currentUser ? <SignInScreen currentUser={currentUser} setcurrentUser={setcurrentUser} /> :
				<GenericLayout currentUser={currentUser} setcurrentUser={setcurrentUser} />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: "7%",
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
