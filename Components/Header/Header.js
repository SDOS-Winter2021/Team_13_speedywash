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
function Header({ currentView, setcurrentView }) {
    return (
        <View style={styles.HeaderStyle}>
            <Text style={styles.headerTitle}>Speedywash India</Text>
            <View style={{ flex: 0.17, flexDirection: "row" }}>
                <TouchableOpacity style={styles.icons} onPress={() => setcurrentView({ screen: keys.screens.CART, header: true, footer: true })}>
                    <FontAwesome5 name='shopping-cart' size={32} color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderStyle: {
        // flex: 1,
        height: '100%',
        backgroundColor: keys.colors.MAIN,
        flexDirection: "row"
    },
    headerTitle: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        margin: '5%',
        flex: 0.83
    },
    icons: {
        alignSelf: 'center'
    }
})

export default Header;