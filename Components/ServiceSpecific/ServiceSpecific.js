import React from 'react'
import { Button } from 'react-native';
import { Text, View } from 'react-native'
import ServiceItem from '../serviceitem';

function ServiceSpecific({ data, serviceSelected, setServiceSelected, currentUser, setcurrentUser }) {


    const service = {
        heading: serviceSelected,
        list_of_titles: Object.keys(data),
        list_of_items: [],
        list_of_prices: [],
        list_of_units: [],
    };
    for(var i = 0;i<service.list_of_titles.length;i++)
    {
        var currTitle = service.list_of_titles[i]
        var Items = Object.keys(data[currTitle]);
        service.list_of_items.push([])
        service.list_of_prices.push([])
        service.list_of_units.push([])
        for(var j=0;j<Items.length;j++)
        {
            var currItem = Items[j];
            service.list_of_items[service.list_of_items.length-1].push(currItem)
            service.list_of_prices[service.list_of_prices.length-1].push(data[currTitle][currItem].price)
            service.list_of_units[service.list_of_units.length-1].push(data[currTitle][currItem].unit)
        }
    }
    return (
        <View>
            <Button title="Go Back" onPress={() => setServiceSelected(null)} />
            <ServiceItem
                heading={service.heading}
                list_of_titles={service.list_of_titles}
                list_of_items={service.list_of_items}
                list_of_prices={service.list_of_prices}>
            </ServiceItem>
        </View>
    )
}

export default ServiceSpecific
