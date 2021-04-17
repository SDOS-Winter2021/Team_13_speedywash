/**
 * @module
 */
import React from 'react'
import { FontAwesome, MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { Text, View, Button, TouchableOpacity } from 'react-native';

/**
 * 
 * @param {Object} obj - An object
 * @param {function} obj.setCurrentStage - current stage setter 
 * @returns {View} - React Componnent View
 */
function FirstAuthScreen({ setCurrentStage }) {
    return (
        <View>
            <Button title="Sign in" onPress={() => setCurrentStage(1)} />
        </View>
    )
}

export default FirstAuthScreen
