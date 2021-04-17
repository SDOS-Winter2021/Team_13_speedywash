/**
 * @module
 */
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native';
import { Button } from 'react-native';
import { Text, View} from 'react-native'
import ServiceItem from '../serviceitem';
import styles from './styles';
import keys from "../../configs/KEYS";
import { getValue, removeValue, setValue,cleanCache} from "../../configs/CacheManager";
/**
 * Responsible for rendering Service specific page which opens once user select any service
 * @param {Object} obj - An object
 * @param {Object} obj.data - Currently present in cart
 * @param {string} obj.serviceSelected - Currently selected service string
 * @param {function} obj.setServiceSelected - Currently selected service string setter
 * @param {module:globaltypes.User} obj.currentUser - current user profile
 * @param {function} obj.setcurrentUser - current user setter
 * @param {function} [obj.cartItemsAndPriceUpdater] - current cart items price updater
 * @returns {View} - React Component View
 */
function ServiceSpecific({ data, serviceSelected, setServiceSelected, currentUser, setcurrentUser, cartItemsAndPriceUpdater }){
   

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
            <View style={styles.button}>
            {setServiceSelected!=null &&
                <Button title="Go Back" onPress={() => setServiceSelected(null)}  />
            }
            </View>
           
            <View style = {styles.scroll}>
            <ServiceItem
                cartItemsAndPriceUpdater={cartItemsAndPriceUpdater}
                heading={service.heading}
                list_of_titles={service.list_of_titles}
                list_of_items={service.list_of_items}
                list_of_prices={service.list_of_prices}>
            </ServiceItem>
            </View>
        </View>
    )
}

export default ServiceSpecific
