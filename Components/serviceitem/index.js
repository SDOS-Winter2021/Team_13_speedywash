/**
 * @module
 */
import React from 'react';
import { View, Text, ImageBackground, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import ServiceItemType from '../serviceitemtype';
import { Transition, Transitioning } from 'react-native-reanimated';
import { TouchableHighlight } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
const transition = (
    <Transition.Together>
        <Transition.In fade='fade' durationMs={200}></Transition.In>
        <Transition.Change></Transition.Change>
        <Transition.Out fade='fade' durationMs={200} ></Transition.Out>
    </Transition.Together>
)
/**
 * Responsible Responsuble for redering all items that belong to one category (has multiple rows)
 * @returns {View} - React Component View
 */
const ServiceItem = (props) => {
    const [currentindex, setcurrentindex] = React.useState(null);
    const { list_of_titles, list_of_items, heading, list_of_prices } = props;
    const cartItemsAndPriceUpdater = props.cartItemsAndPriceUpdater;
    const ref = React.useRef();
    return (
        <Transitioning.View ref={ref} transition={transition} style={styles.bigcontainer}>
            <ScrollView style={styles.bigcontainer} >

                <View style={styles.headingbox}><Text style={styles.heading}>{heading}</Text></View>


                {list_of_titles.map((item, key) => (<View key={key} style={styles.allitems}>

                    <View>
                        <TouchableOpacity key={key} onPress={() => { setcurrentindex(key === currentindex ? null : key) }}>
                            <View style={styles.textbox}><Text style={styles.text}>{item}</Text></View>
                        </TouchableOpacity>
                        {key === currentindex && <View style={styles.items}>
                            {list_of_items[key].map((item1, key1) => (<View key={key1} style={styles.itembox}>

                                <ServiceItemType cartItemsAndPriceUpdater={cartItemsAndPriceUpdater} heading={heading} title={item} type={item1} price={list_of_prices[key][key1]}></ServiceItemType>
                            </View>))}
                        </View>}
                    </View>
                </View>))}

            </ScrollView>
        </Transitioning.View>
    );
};

export default ServiceItem;