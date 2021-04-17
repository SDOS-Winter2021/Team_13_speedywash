/**
 * @module
 */
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import keys from "../../configs/KEYS"
import * as Location from 'expo-location';
import { Alert, Text } from 'react-native';


/**
 * This is an independent Componenent when rendered
 * It will show a Location icon clicking upon which 
 * the program will try to fetch user's current 
 * location and will set that location using setter 
 * functions that are expected to be provided by the 
 * father componnent
 * @param {Object} obj - An object
 * @param {function} obj.setLocation - current location setter
 * @param {function} obj.setNumericalLocationObject - current location longitude and latitude setter
 * @returns {View} - React Coponent View
*/
function CurrentLocationPicker({ setLocation, setNumericalLocationObject }) {
    const [clicked, setClicked] = useState(false)

    if(!setLocation || !setNumericalLocationObject)
        return <Text>Setter not passed</Text>

    function getLocation() {
        if (clicked == false) {
            setClicked(true);
            Location.requestPermissionsAsync()
                .then(({ status }) => {
                    if (status !== "granted") {
                        Alert("Error", "Access Denied")
                        setClicked(false)
                    }
                    else {
                        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation })
                            .then((result) => {
                                setNumericalLocationObject(result)
                                Location.reverseGeocodeAsync(result.coords)
                                    .then((localeData) => {
                                        console.log(localeData[0])
                                        setLocation(localeData[0])
                                        setClicked(false)
                                    })
                                    .catch((err) => {
                                        Alert("Error", `${err}`)
                                        setClicked(false)
                                    })
                            })
                            .catch((err) => {
                                setClicked(false);
                                Alert("Error", `${err}`)
                            })
                    }
                })
                .catch((err) => {
                    setClicked(false);
                    Alert("Error", `${err}`)
                });
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={getLocation}>
                <FontAwesome5 name="map-marker-alt" size={32} color={clicked == false ? keys.colors.FOOTER_NORMAL : keys.colors.HIGHLIGHT} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CurrentLocationPicker
