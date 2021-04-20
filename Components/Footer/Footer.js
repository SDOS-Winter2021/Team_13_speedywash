/**
 * @module
 */
import React from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import keys from "../../configs/KEYS"

/**
 * Code for footer is present here
 * Three icons clicking on any of them updates the currentView.screen
 * which in return updates whole parent view
 * @param {Object} obj - An object
 * @param {module:globaltypes.VisibleView} obj.currentView - current visible/selected view
 * @param {function} obj.setcurrentView - current view setter
*/
function Footer({ currentView, setcurrentView }) {
    return (
        <View style={styles.footerStyle}>

            <TouchableOpacity style={styles.icons} onPress={()=>setcurrentView({screen: keys.screens.HOME, header: true, footer: true})} >
                <FontAwesome5 name="home" size={32} color={currentView.screen==keys.screens.HOME ? keys.colors.FOOTER_SELECTED : keys.colors.FOOTER_NORMAL} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={()=>setcurrentView({screen: keys.screens.PROFILE, header: true, footer: true})}>
                <FontAwesome5 name="user-circle" size={32} color={currentView.screen==keys.screens.PROFILE ? keys.colors.FOOTER_SELECTED : keys.colors.FOOTER_NORMAL}  />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footerStyle: {
        // flex: 1,
        height: '100%',
        flexDirection: "row",
        backgroundColor: keys.colors.MAIN,
        justifyContent: 'space-around'
    },
    icons: {
        alignSelf: 'center'
    }
})

export default Footer;