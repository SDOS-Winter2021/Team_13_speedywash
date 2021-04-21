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
import { KeyboardAvoidingView } from 'react-native';

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

    const [advertisementURL, setAdvertisementURL] = useState({});

    const [currentIndex, setCurrentIndex] = useState(0);

    const [servicepics, setservicePics] = useState({});

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
            firebase.firestore()
            .collection("advertisement").doc("list")
            .get()
            .then((record) => {
                if(record && record.data())
                {
                    //console.log(record.data());
                    setAdvertisementURL(record.data());
                }
            })
    }, [])

    useEffect(() => {
        firebase.firestore()
        .collection("servicepics")
        .doc("location")
        .get()
        .then((record) => {
            if(record && record.data())
            {
                //console.log(record.data());
                setservicePics(record.data());
            }
        })
    }, [])

    const _renderItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
        // const item=element.item;
        const link = servicepics[item];
        //console.log(link);
        return <View style={styles.serviceListItem}
            /* key won't be required while using FlatList*/
            key={item}>
            <TouchableOpacity
                onPress={() => setServiceSelected(item)}
                style={styles.listItemTouchable}>
                <View style={{ flex: 0.4 }}>
                    <Image resizeMode="contain" style={styles.serviceImage} source={{uri : link}} />
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.ServiceNameStyle}>{item}</Text>
                </View>
            </TouchableOpacity>
        </View>
    };

    const handleLeftClick = ()=>{
        //console.log(currentIndex);
        currentIndex==0 || setCurrentIndex(currentIndex-1)
    };

    const handleRightClick = ()=> {
        //console.log(currentIndex);
        currentIndex==(Object.keys(advertisementURL).length-1) || setCurrentIndex(currentIndex+1);
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
            advertisementURL=={} ||
            <View style={styles.marketingArea}>
                <TouchableOpacity style={{width: "5%"}}
                onPress={handleLeftClick}>
                    <View style={{flex: 0.4}}></View>
                    <View style={{flex: 0.6}}>
                        <Text style={{flex: 1,fontSize: 30, fontWeight: 'bold'}}>{"<"}</Text>
                    </View>
                </TouchableOpacity>
                <Image resizeMode="contain"
                    style={styles.marketingImage}
                    source={{ uri : advertisementURL[Object.keys(advertisementURL)[currentIndex]]
                        // uri : advertisementURL=={} ? require("./marketing.jpg") : advertisementURL[
                        // Object.keys(advertisementURL)[currentIndex]]
                    }} />
                <TouchableOpacity style={{width: "5%"}}
                onPress={handleRightClick}>
                    <View style={{flex: 0.4}}></View>
                    <View style={{flex: 0.6}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{">"}</Text>
                    </View>
                </TouchableOpacity>
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
        width: '90%',
        height: undefined,
        aspectRatio: 1 / 0.75,
        alignSelf: 'center'
    },
    marketingArea: {
        width: '90%',
        height: undefined,
        aspectRatio: 1 / 0.7,
        margin: '5%',
        marginTop: "5%",
        marginBottom: "2%",
        display: 'flex',
        flexDirection: 'row'
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
        width: undefined,
        height: '80%',
        aspectRatio: 1 / 1,
        alignSelf: 'center',
        margin: '10%',
        marginTop: '3%'
    },
    ServiceNameStyle: {
        fontSize: 20,
        alignSelf: 'center',
        margin: '10%'
    }
});
export default HomeScreen
