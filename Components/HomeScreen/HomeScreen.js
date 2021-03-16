import React from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Text, View, FlatList } from 'react-native'
import keys from "../../configs/KEYS"

function HomeScreen({ currentView, setcurrentView,currentUser, setcurrentUser }) {
    
    const services=[
        { id:"1", name:"Dry Cleaning" },
        { id:"2", name:"Washing" },
        { id:"3", name:"carpet cleaning" },
        { id:"4", name:"Sofa Drycleaning"}
    ];

    const _renderItem = (item) => {
        // Below statement will be required while using FlatList and input will be 'element'
       // const item=element.item;
        return <View style={styles.serviceListItem} 
        /* key won't be required while using FlatList*/
        key={item.id}>
            <TouchableOpacity 
            onPress={()=>setcurrentView({screen: keys.screens.SERVICESPECIFIC, header: true, footer: true})}
            style={styles.listItemTouchable}>
                <View style={{flex:0.4}}>
                    <Image resizeMode="contain" style={styles.serviceImage} source={require("../../assets/favicon.png")}/>
                </View>
                <View style={{flex:0.6}}>
                    <Text style={styles.ServiceNameStyle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    };

    const _keyExtractor = (item) => {
        return item.id;
    };
    
    return (
        <ScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.homeScreen}>
            <View style={styles.marketingArea}>
                <Image resizeMode="contain"
                style={styles.marketingImage}
                source={require('./marketing.jpg')}/>
            </View>
            <Text
            style={styles.selectServiceTitle}>
                Select Service
            </Text>
            <SafeAreaView style={{flex:1, marginBottom: 15}}>
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
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: keys.colors.HOMEBACKGROUND,
        flex: 1,
        width: '100%'
    },
    marketingImage:{
        width: '100%',
        height: undefined,
        aspectRatio: 1/0.7
    },
    marketingArea: {
        margin: '5%',
        marginTop: "10%",
        backgroundColor: '#000000'
    },
    selectServiceTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        color: keys.colors.MAIN
    },
    serviceListItem : {
        backgroundColor: 'white',
        width: '92%',
        height: undefined,
        aspectRatio: 1/0.2,
        marginHorizontal: '4%',
        marginVertical: '1.5%',
        borderRadius: 7
    },
    listItemTouchable : {
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
