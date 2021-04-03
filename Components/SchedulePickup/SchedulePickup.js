import React, { useState } from 'react'
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from '@react-native-picker/picker';

function TimePickerList({ time, setTime }) {
    const Slots = ["9 - 10 AM",
        "10 - 11 AM",
        "11 - 12 AM",
        "12 - 1 PM",
        "1 - 2 PM",
        "2 - 3 PM",
        "3 - 4 PM",
        "4 - 5 PM"]

    return <Picker style={styles.picker} mode="dropdown" selectedValue={time} onValueChange={(itemValue, itemIndex) => { setTime(itemValue) }}>
        {Slots.map((item) => <Picker.Item key={item} label={item} value={item} />)}
    </Picker>

}

function SchedulePickup({ date, time, setDate, setTime }) {
    const maxDate = new Date(new Date().setDate(new Date().getDate() + 7))
    const [pickDate, setPickDate] = useState(false);

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.touchable} onPress={() => { setPickDate(true) }} >
                <Text style={styles.dateText} >{date == null ? "Select Pickup Date" : date.toDateString()}</Text>
            </TouchableOpacity>
            {pickDate && <RNDateTimePicker minimumDate={new Date()} maximumDate={maxDate} value={date == null ? new Date() : date} onChange={(e, newSelectedDate) => { setPickDate(false); setDate(newSelectedDate) }} />}
            <TimePickerList time={time} setTime={setTime} />
            <Button title={"Proceed"} disabled={date == null || time == null} onPress={() => { console.log("Code fore next Screen") }} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        textAlign: 'center',
        justifyContent: "center",
    },
    touchable: {

    },
    picker: {
        textAlign: 'center',
        justifyContent: "center",
        margin: 10,
        // marginLeft: "40%",
        borderRadius: 10,
        // borderClo
    },
    dateText: {
        textAlign: 'center',
        justifyContent: "center",
        margin: 10,
    }
})

export default SchedulePickup
