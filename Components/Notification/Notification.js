/**
 * @module
 */
import React from 'react'
import { Text, View } from 'react-native'
/**
 * Notification Icon currently does nothing
 * @param {Object} obj - An object
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setCurrentUser - current user setter
 * @returns {View} - React Coponent View
 */
function Notification({ currentUser, setcurrentUser }) {
    return (
        <View>
            <Text>This is Notifications View</Text>
        </View>
    )
}

export default Notification