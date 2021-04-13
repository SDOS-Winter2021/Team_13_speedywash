import React, { useState } from 'react'
import keys from "../../configs/KEYS"
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import HomeScreen from '../HomeScreen/HomeScreen';
import Subscriptions from '../Subscriptions/Subscriptions';
import Profile from '../Profile/Profile';
import Cart from '../Cart/Cart';
import Notification from '../Notification/Notification';
import EditProfile from '../Profile/EditProfile'
import ManageAddress from '../Profile/ManageAddress'
import AddAddress from '../Profile/AddAddress'
import MyOrders from '../Profile/MyOrders'
// import ServiceSpecific from '../ServiceSpecific/ServiceSpecific'

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
        case keys.screens.NOTIFICATION:
            return <Notification currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.CART:
            return <Cart currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.EDITPROFILE:
            return <EditProfile currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.MANAGEADDRESS:
            return <ManageAddress currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.ADDADDRESS:
            return <AddAddress currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
        case keys.screens.MYORDERS:
            return <MyOrders currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
            // case keys.screens.SERVICESPECIFIC:
        //     return <ServiceSpecific currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />;
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
        header: true,
        footer: true
    })

    return (
        <View style={styles.main}>
            {
                currentView.header &&
                <View style={styles.header}>
                    <Header currentView={currentView} setcurrentView={setcurrentView} />
                </View>
            }
            <View style={currentView.footer || currentView.header? styles.screen : {...styles.screen, flex: 1}} >
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
    header: {
        width: '100%',
        flex: 0.09
    },  
    footer: {
        width: '100%',
        flex: 0.09,
    },
    screen: {
        width: '100%',
        flex: 0.82,
        justifyContent: "center"
    }

})

export default GenericLayout
