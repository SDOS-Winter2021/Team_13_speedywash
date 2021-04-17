/**
 * @module
 */
// import { stopLocationUpdatesAsync } from 'expo-location';
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { getValue, setValue, removeValue } from '../../configs/CacheManager'
import keys from '../../configs/KEYS'
import ServiceSpecific from '../ServiceSpecific/ServiceSpecific.js';
import styles from './styles.js';
import SchedulePickup from "../SchedulePickup/SchedulePickup"

/**
 * Cart Component resposible for rendering Cart View,
 * Allows to add/remove item from the cart, cart is stored in persistent storage
 * i.e. even after reopening application the cart items will still be present
 * Also, shows total amount to be payed
 * @param {Object} obj - An object
 * @param {module:globaltypes.VisibleView} obj.currentView - current visible/selected view
 * @param {function} obj.setcurrentView - current view setter
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setCurrentUser - current user setter
 * @return {View} - React Component View
 */
function Cart({ currentView, setcurrentView, currentUser, setcurrentUser }) {
    const [data, setData] = useState({});
    var vdata = {}
    const [total, setTotal] = useState(0);
    const [proceed, setProceed] = useState(false);

    function cartItemsAndPriceUpdater() {
        getValue(keys.storage.CART).then((gotData) => {
            if (gotData !== null) {
                list_of_headings = Object.keys(gotData)
                var price = 0
                for (i = 0; i < list_of_headings.length; i++) {
                    list_of_titles = Object.keys(gotData[list_of_headings[i]])
                    for (j = 0; j < list_of_titles.length; j++) {
                        list_of_types = Object.keys(gotData[list_of_headings[i]][list_of_titles[j]])
                        for (k = 0; k < list_of_types.length; k++) {
                            price += gotData[list_of_headings[i]][list_of_titles[j]][list_of_types[k]].countitem * gotData[list_of_headings[i]][list_of_titles[j]][list_of_types[k]].price;
                        }
                    }
                }
                setData(gotData)
                setTotal(price)
            }
        })
    }

    useEffect(() => {
        cartItemsAndPriceUpdater()
    }, [])

    return (
        proceed == true ?
            <View><SchedulePickup setcurrentView={setcurrentView} currentUser={currentUser} data={data} amount={total} /></View> :
            <View style={styles.bigcontainer}>
                <ScrollView style={styles.container}>
                    <View style={styles.allservices}>
                        {data != null && Object.keys(data).map((item, key) => {
                            return (<View key={key} style={styles.services}>
                                <ServiceSpecific cartItemsAndPriceUpdater={cartItemsAndPriceUpdater} data={data[item]} serviceSelected={item} currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />
                            </View>
                            )
                        })}
                        {data == null && <View><Text>CART IS EMPTY</Text></View>}
                    </View>
                </ScrollView>
                {<TouchableOpacity onPress={() => {
                    setProceed(true);
                }} style={styles.total}><Text style={styles.totaltext}>Total Amount is {total}</Text><Text style={styles.totaltext}>(Click to Proceed)</Text></TouchableOpacity>}
            </View>
    )
}

export default Cart
