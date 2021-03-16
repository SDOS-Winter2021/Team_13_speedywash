import React from 'react'
import { Text, View } from 'react-native'
import ServiceItem from '../serviceitem';
function ServiceSpecific({ currentUser, setcurrentUser }) {
    const service = {
        heading:"DryCleaning",
        list_of_titles:["Men's Items","Women's Items"],
        list_of_items:[["Trousers","Tshirts"],["Trousers","Tshirts"]],
        list_of_prices:[[10,20],[40,50]]

    };
    return (
        <View>
            <ServiceItem heading={service.heading} list_of_titles={service.list_of_titles} list_of_items={service.list_of_items} list_of_prices={service.list_of_prices}></ServiceItem>
        </View>
    )
}

export default ServiceSpecific
