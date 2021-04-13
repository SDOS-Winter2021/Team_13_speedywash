import React from 'react'
import { Text, View, Button } from 'react-native'
import keys from "../../configs/KEYS"
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { cleanCache } from "../../configs/CacheManager";

function Temporary({ currentUser, setcurrentUser }) {
    function performSignout() {
        firebase.auth().signOut()
        AsyncStorage.removeItem(keys.storage.USER).then(() => {
            setcurrentUser(null);
        })
    }
    return <View>
        <Text>{currentUser.displayName}</Text>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.phoneNumber}</Text>
        <Button title="Sign out" onPress={performSignout} />
    </View>
}

function Profile({ currentUser, setcurrentUser, setcurrentView }) {
    function AvatarCard() {
        return (
            <View style={styles.card}>
                <View>
                    <Text style={styles.cardText}>
                        {currentUser.displayName}
                    </Text>
                    <Text style={styles.cardText}>
                        {currentUser.phoneNumber}
                    </Text>
                </View>
                {currentUser.photoURL == "" ? <Image resize Mode="contain" style={styles.cardImage} source={require("../../assets/avatar.png")} /> : <Image resize Mode="contain" style={styles.cardImage} source={{ uri: currentUser.photoURL }} />}
            </View>);
    }

    const services = [
        {
            id: "1",
            name: "Edit Profile",
            action: (onPress) => setcurrentView({ screen: keys.screens.EDITPROFILE, header: true, footer: true })
        },
        {
            id: "2",
            name: "Subscription",
            action: () => { }
        },
        {
            id: "3",
            name: "My Orders",
            action: (onPress) => { setcurrentView({ screen: keys.screens.MYORDERS, header: true, footer: true})}
        },
        {
            id: "4",
            name: "Manage Address",
            action: (onPress) => setcurrentView({ screen: keys.screens.MANAGEADDRESS, header: true, footer: true })
        },
        {
            id: "5",
            name: "Sign Out",
            action: () => {
                firebase.auth().signOut()
                AsyncStorage.removeItem(keys.storage.USER).then(() => {
                    setcurrentUser(null);
                })
            }
        },
        {
            id: "6",
            name: "Clean Cache",
            action: () => {
                cleanCache();
            }
        }
    ];

    const _renderItem = (item) => {
        return <View style={styles.serviceListItem}
            key={item.id}>
            <TouchableOpacity
                onPress={() => item.action()} // to be added
                style={styles.listItemTouchable}>
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.ServiceNameStyle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    return (
        <ScrollView 
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.homeScreen}>
            <AvatarCard />
            <SafeAreaView style={{ flex: 1, marginBottom: "20%" }}>
                {
                    services.map(_renderItem)
                }
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    },
    card: {
        backgroundColor: "white",
        width: '92%',
        height: "25%",
        borderStyle: 'solid',
        borderWidth: 1,

        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 17,
        marginVertical: "2%",
        marginBottom: "8%",
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'

    },
    cardImage: {
        // alignSelf : 'flex-end',
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: keys.colors.MAIN,
    },
    cardText: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 18,
        color: keys.colors.MAIN,
        padding: "2%",
        marginHorizontal: "2%",
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
    ServiceNameStyle: {
        fontSize: 20,
        alignSelf: 'center',
        margin: '10%'
    },
    signOutStyle: {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1 / 0.2,
        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 7
    }

});
export default Profile
