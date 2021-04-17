/**
 * @module
 */
import React, { useEffect } from 'react'
import { Button, TextInput, View, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import keys from "../../configs/KEYS"


/**
 * Custom TextField
 * @param {Object} obj - An Object
 * @param {Object} obj.incompleteUser - incomplete user profile
 * @param {function} obj.setincompleteUser - setter incomplete user
 * @param {string} obj.placeholder - textfield placeholder
 * @param {string} obj.attribute - attricute to modify
 * @param {boolean} obj.isEditable - textfield editable
 * @param {boolean} obj.isAutofocus - turn on autofocus
 * @param {boolean} obj.multiline - turn on multiline
 * @returns {View} - React Componnent View
*/
function MyTextField({ incompleteUser, setincompleteUser, placeholder, attribute, isEditable, isAutofocus, multiline }) {
	return <TextInput
		style={styles.textBox}
		placeholder={placeholder}
		editable={isEditable}
		autoFocus={isAutofocus}
		value={incompleteUser[attribute]}
		onChangeText={(text) => setincompleteUser((prev) => ({ ...prev, [attribute]: text }))}
		multiline={multiline}
	/>
}

/**
 * Check if the verfied user already exists in the database, if yes then it's a login
 * Store them to local storage (create session)
 * redirect to homepage
 * If the instance of user doesn't exists in database then it's a signup in that case
 * Take username, email as an input
 * store them into local storage (create session)
 * Push them to database as well 
 * Redirect to home page
 * @param {Object} obj - An Object
 * @param {Object} obj.incompleteUser - incomplete user profile
 * @param {function} obj.setincompleteUser - setter incomplete user
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setcurrentUser - current user setter
 * @returns {View} - React Componnent View
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


	function handleSubmission() {
		const storeObj = { ...incompleteUser, creationTime: new Date() };
		db.collection("users").doc(storeObj.uid).set(storeObj).then(() => {
			AsyncStorage.setItem(keys.storage.USER, JSON.stringify(storeObj)).then(() => {
				setcurrentUser(storeObj);
			})
		});
	}

	return (
		<View style={styles.Container}>
			<MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={true} placeholder="Your name" attribute="displayName" isEditable={true} multiline={false} />
			<MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={false} placeholder="Email" attribute="email" isEditable={true} multiline={false} />
			<MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={false} placeholder="Contact Number" attribute="phoneNumber" isEditable={false} multiline={false} />
			<MyTextField incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} isAutofocus={false} placeholder="home address" attribute="home" isEditable={true} multiline={true} />
			<Button disabled={incompleteUser.email.length == 0 || incompleteUser.displayName.length == 0 || incompleteUser.phoneNumber.length == 0 || incompleteUser.home.length == 0} title="Submit" onPress={handleSubmission} />
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
