import React, { useState } from 'react'
import keys from "../../configs/KEYS"
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import Footer from '../Footer/Footer'

import HomeScreen from '../HomeScreen/HomeScreen';
import Subscriptions from '../Subscriptions/Subscriptions';
import Profile from '../Profile/Profile';


/* 
    * This is the stage selecter function
    * Add new switchable screen here, name of screens are stored in KEYS.js
    * Redirecting to correct sub-screen is responsibility of that screen itself
    * All the sub-screens (nested screens) should be handled there it self example: all screens that are nested below homepage should be present in Homepage directory
    * currentUser: store  information of current Logged in User
    * setCurrentUser: store information of current logged in user example: on logout changeit to null
    * currentView: information about current screen that is visible to the user
    * setcurrentView: update the current screen that is visible to the user
*/
function SwitchView({ currentView, setcurrentView, currentUser, setcurrentUser }) {
    switch (currentView.screen) {
        case keys.screens.HOME:
            return <HomeScreen currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.SUBS:
            return <Subscriptions currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.PROFILE:
            return <Profile currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
    }
}

/*
    * Generic Layout consist of Two main components
    * Swtichable View which could be any of the one {HomeScreen, Subscription, Profile}
    * Footer can be used to select any of the above view
    * change currentView.footer: false in order to hide footer, screen size will adjust automatically
*/
function GenericLayout({ currentUser, setcurrentUser }) {
    const [currentView, setcurrentView] = useState({
        screen: keys.screens.HOME,
        footer: true
    })

    return (
        <View style={styles.main}>
            <View style={currentView.footer ? styles.screen : {...styles.screen, flex: 1}} >
                <SwitchView currentView={currentView} setcurrentView={setcurrentView} currentUser={currentUser} setcurrentUser={setcurrentUser} />
            </View>
            {
                currentView.footer &&
                 <View style={styles.footer}>
                    <Footer currentView={currentView} setcurrentView={setcurrentView} />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    screen: {
        flex: 0.95,
        justifyContent: "center"
    },
    footer: {
        flex: 0.05,

    }

})

export default GenericLayout
