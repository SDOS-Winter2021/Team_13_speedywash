import React from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import keys from "../../configs/KEYS"

/*
    * Code for footer is present here
    * Three icons clicking on any of them updates the currentView.screen
    * which in return updates whole parent view
*/
function Footer({ currentView, setcurrentView }) {
    return (
        <View style={styles.footerStyle}>

            <TouchableOpacity style={styles.icons} onPress={()=>setcurrentView({screen: keys.screens.HOME, footer: true})} >
                <FontAwesome5 name="home" size={32} color={currentView.screen==keys.screens.HOME ? keys.colors.SELECTED : keys.colors.MAIN} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={()=>setcurrentView({screen: keys.screens.SUBS, footer: true})}>
                <MaterialIcons name="subscriptions" size={32} color={currentView.screen==keys.screens.SUBS ? keys.colors.SELECTED : keys.colors.MAIN}  />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={()=>setcurrentView({screen: keys.screens.PROFILE, footer: true})}>
                <FontAwesome5 name="user-circle" size={32} color={currentView.screen==keys.screens.PROFILE ? keys.colors.SELECTED : keys.colors.MAIN}  />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footerStyle: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icons: {
        marginHorizontal: "10%"
    }
})

export default Footer;