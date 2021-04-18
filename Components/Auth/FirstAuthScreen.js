/**
 * @module
 */
import React from 'react'
import { FontAwesome, MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import keys from "../../configs/KEYS";
import { ceil } from 'react-native-reanimated';
/**
 * 
 * @param {Object} obj - An object
 * @param {function} obj.setCurrentStage - current stage setter 
 * @returns {View} - React Componnent View
 */
function FirstAuthScreen({ setCurrentStage }) {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Image 
                style={styles.logo} 
                source={require("../../assets/logo.png")} />
            </View>
            <View style={{alignSelf: "center", margin: "10%"}}>
                <Button title="Sign in" onPress={() => setCurrentStage(1)} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    container : {
        alignSelf: 'center',
        marginHorizontal: "10%"
    },
    logo : {
        // width: "50%",
        // height: undefined,
        // aspectRatio: 2/1
        alignSelf: "center",
        margin: "10%"
    }
});
export default FirstAuthScreen
