/**
 * @module
 */
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text, View, FlatList } from 'react-native'
import keys from "../../configs/KEYS"
import * as firebase from 'firebase';
import 'firebase/firestore';
import { getValue, removeValue, setValue } from "../../configs/CacheManager"
import ServiceSpecific from "../ServiceSpecific/ServiceSpecific"

/**
 * Renders HomeScreen View
 * @param {Object} obj - An object
 * @param {module:globaltypes.VisibleView} obj.currentView - current visible/selected view
 * 
 * @returns {View} - React Componnent View
 */
function HomeScreen({ currentView, setcurrentView, currentUser, setcurrentUser }) {

    /*
        Stores the list of all services that are to be displayed onto the homepage
    */
    const [services, setServices] = useState([]);
    /*
        Contains whole pricelist
    */
    const [wholeDataObject, setWholeDataObject] = useState(null);
    /*
        Stores currently selected service (null if none is selected)
    */
    const [serviceSelected, setServiceSelected] = useState(null);

    /*
        Check If the prices value is present in local device cache
        If present and not expired then use those values
        If not present then fetch the latest price values from the database 
        and store them into cache for 1 day
    */

    const [advertisementURL, setAdvertisementURL] = useState("");

    useEffect(() => {
        getValue(keys.storage.HOMEPAGE_DATA).then((value) => {
            if (value == null) {
                firebase.firestore().collection("homepage").doc("data").get().then((record) => {
                    console.log("Requested")
                    if (record && record.data()) {
                        setServices(Object.keys(record.data()));
                        setValue(keys.storage.HOMEPAGE_DATA, record.data(), keys.time.DAY);
                        setWholeDataObject(record.data())
                    }
                })
            }
            else {
                setServices(Object.keys(value))
                setWholeDataObject(value)
            }
        })
    }, [])

    useEffect(() => {
            firebase.storage()
            .ref("advertisements")
            .child("image")
            .getDownloadURL()
            .then(url => {
                setAdvertisementURL(url);
                console.log(url);
            })
    }, [])

    const _renderItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        return <View style={styles.serviceListItem}
            /* key won't be required while using FlatList*/
            key={item}>
            <TouchableOpacity
                onPress={() => setServiceSelected(item)}
                style={styles.listItemTouchable}>
                <View style={{ flex: 0.4 }}>
                    <Image resizeMode="contain" style={styles.serviceImage} source={require("../../assets/favicon.png")} />
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.ServiceNameStyle}>{item}</Text>
                </View>
            </TouchableOpacity>
        </View>
    };

    const _keyExtractor = (item) => {
        return item;
    };

    /*
        Render main screen if none service is selected
        If some screen is selected then render service specific page
    */
    return (
        serviceSelected == null ? <ScrollView
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={styles.homeScreen}>
            { // first check if the advertisement image has been fetched from the database or not 
            advertisementURL=="" ||
            <View style={styles.marketingArea}>
                <Image resizeMode="contain"
                    style={styles.marketingImage}
                    source={{uri : advertisementURL}} />
            </View>
            }
            <Text
                style={styles.selectServiceTitle}>
                Select Service
            </Text>
            <SafeAreaView style={{ flex: 1, marginBottom: 15 }}>
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    data={services} 
                    renderItem={_renderItem} 
                    keyExtractor={_keyExtractor}>
                </FlatList> */}
                {
                    services.map(_renderItem)
                }
            </SafeAreaView>
        </ScrollView> :
            <ServiceSpecific data={wholeDataObject[serviceSelected]} serviceSelected={serviceSelected} setServiceSelected={setServiceSelected} currentUser={currentUser} setcurrentUser={setcurrentUser} currentView={currentView} setcurrentView={setcurrentView} />
    )
}
const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    },
    marketingImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1 / 0.7
    },
    marketingArea: {
        margin: '5%',
        marginTop: "5%",
        marginBottom: "2%"
    },
    selectServiceTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 5,
        marginBottom: 10,
        color: keys.colors.MAIN
    },
    serviceListItem: {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1 / 0.2,
        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 7
    },
    listItemTouchable: {
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    serviceImage: {
        alignSelf: 'center',
        margin: '10%'
    },
    ServiceNameStyle: {
        fontSize: 20,
        alignSelf: 'center',
        margin: '10%'
    }
});
export default HomeScreen
