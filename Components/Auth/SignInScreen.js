import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import React, { useState, useEffect, useRef } from 'react'
import { View, Button, TextInput, TouchableOpacity, Text, Alert, StyleSheet, LogBox } from 'react-native';
import { WebView } from 'react-native-webview'
import CreateUser from "./CreateUser";
import FirstAuthScreen from './FirstAuthScreen';


/*
    * This View is responsible for sending OTP to the number
    * A text box to enter contact number
    * and a button to send otp to the entered number
*/
function SendOTPView({ sendOTPPressed, setsendOTPPressed, contact, updateContact, sendOTPEnabled, setVerificationId, recaptchaVerifier }) {
    function handleSendOTP() {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider.verifyPhoneNumber(
                `${contact}`,
                recaptchaVerifier.current).then(vid => {
                    setVerificationId(vid);
                    setsendOTPPressed(true)
                }, (err) => Alert.alert(`Error`, `${err}`));
        }
        catch (err) {
            Alert.alert("Error", `${err}`)
        }
    }
    return (
        <View >
            <TextInput
                style={styles.textBox}
                editable={!sendOTPPressed}
                textAlign="center"
                autoFocus={true}
                autoCompleteType={"tel"}
                clearButtonMode={"always"}
                dataDetectorTypes={"phoneNumber"}
                keyboardType={"numeric"}
                placeholder={"Enter you contact number"}
                onChangeText={updateContact}
                textContentType="telephoneNumber"
                value={contact}
            />
            <Button disabled={!sendOTPEnabled || sendOTPPressed} title={"Send OTP"} onPress={handleSendOTP} />
        </View>
    )
}

/*
    * This piece of code is responsible for verification of OTP entered by the user
    * It takes OTP input from user  and check if it matches or not
    * If OTP is verfied then the current stage is set to 2
*/
function VerifyOTPView({ setincompleteUser, setCurrentStage, sendOTPPressed, verificationCode, verificationId, setVerificationCode }) {

    function performSignIn() {
        try {
            const cred = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
            firebase.auth().signInWithCredential(cred).then(({ user }) => {
                setincompleteUser({
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    email: "",
                    photoURL: "",
                    displayName: "",
                    creationTime: "",
                    home: "",
                    office: "",
                    other: ""
                })
                setCurrentStage(2);
                Alert.alert("Success", "Phone number verified");
            }, (err) => { Alert.alert("Error", `${err}`) })
        }
        catch (err) {
            Alert.alert("Error", `${err}`)
        }
    }

    return <View>
        <TextInput
            style={styles.textBox}
            editable={sendOTPPressed}
            autoFocus={true}
            keyboardType={"numeric"}
            placeholder="Enter verfication code"
            onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
            textAlign="center"
            value={verificationCode}
        />
        <Button
            title="Confirm Verification Code"
            disabled={!sendOTPPressed}
            onPress={performSignIn}
        />
    </View>
}

/*
    * currentStage: 1
    * This is the function which is responsible for verification of contact number
    * 1: Takes in input number 
    * 2: Recapatcha to verify human
    * 3: Send OTP
    * 4: Input OTP
    * 5: Verify If OTP is correct or not
*/
function MainVerificationScreen({ setCurrentStage, incompleteUser, setincompleteUser }) {
    const [sendOTPEnabled, setsendOTPEnabled] = useState(false);
    const [sendOTPPressed, setsendOTPPressed] = useState(false);
    const [contact, setcontact] = useState("+91 ");
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const attemptInvisibleVerification = false;
    const fConfig = firebase.app().options;

    function updateContact(text) {
        if (text.length > 3)
            setcontact(text)
        if (text.length == 14)
            setsendOTPEnabled(true);
        else
            setsendOTPEnabled(false);
    }


    return <View>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={fConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
            title='Prove you are human!'
        />
        {/* Take user contact number input */}
        <SendOTPView setsendOTPPressed={setsendOTPPressed} sendOTPPressed={sendOTPPressed} contact={contact} updateContact={updateContact} sendOTPEnabled={sendOTPEnabled} recaptchaVerifier={recaptchaVerifier} setVerificationId={setVerificationId} />
        {sendOTPPressed && <VerifyOTPView incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} sendOTPPressed={sendOTPPressed} verificationCode={verificationCode} setVerificationCode={setVerificationCode} verificationId={verificationId} setCurrentStage={setCurrentStage} />}
    </View>
}

/*
    * Sign In Screen consist of three stages mainly
    * 0: A button is visible with "Sign in"
    * 1: Verify contact number
    * 2: If signup: take additional user information then redirect to homepage at this stage user is authenticated, if Login: redirect to home screen  
*/
function SignInScreen({ currentUser, setcurrentUser }) {
    LogBox.ignoreLogs(['Setting a timer']);
    const [currentStage, setCurrentStage] = useState(0);
    const [incompleteUser, setincompleteUser] = useState(null);

    const stageViewer = () => {
        switch (currentStage) {
            case 0:
                return <FirstAuthScreen setCurrentStage={setCurrentStage} />
            case 1:
                return <MainVerificationScreen incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} setCurrentStage={setCurrentStage} />
            case 2:
                return <CreateUser incompleteUser={incompleteUser} setincompleteUser={setincompleteUser} currentUser={currentUser} setcurrentUser={setcurrentUser} />
        }
    }

    return (
        <View>
            {stageViewer()}
        </View>
    )
}

const styles = StyleSheet.create({
    textBox: {
        width: "80%",
        margin: "10%",
        fontSize: 20
    }
})

export default SignInScreen
