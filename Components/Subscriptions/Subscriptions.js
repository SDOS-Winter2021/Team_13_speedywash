import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CurrentLocationPicker from "../CurrentLocationPicker/CurrentLocationPicker"

/*
    * This function takes in location object which is 
    * updated by CurrentLocationPicker object and convert 
    * it into user understandable string, which is user's 
    * current location 
*/
function parseLocation(location) {
    return `${location.name == null ? '' : location.name} ${location.steet == null ? '' : location.street} ${location.district == null ? '' : location.district} ${location.city == null ? '' : location.city} ${location.postalCode == null ? '' : location.postalCode} ${location.subregion == null ? '' : location.subregion} ${location.region == null ? '' : location.region} ${location.country == null ? '' : location.country}`
}

function Subscriptions({ currentUser, setcurrentUser }) {
    
    // Necessary and will be passed to CurrentLocationPicker
    const [location, setlocation] = useState(null)
    const [numericalLocationObject, setNumericalLocationObject] = useState(null)

    
    return (
        <View style={styles.main}>
            <CurrentLocationPicker setLocation={setlocation} setNumericalLocationObject={setNumericalLocationObject} />
            <Text>This is Subscriptions View</Text>
            {location != null && <Text>{`Your Location: ${parseLocation(location)}`}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        textAlign: 'center',
        justifyContent: "center"
    }
})

export default Subscriptions
