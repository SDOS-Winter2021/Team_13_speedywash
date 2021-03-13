import React from 'react';
import {View,Text, ImageBackground, Pressable,Image} from 'react-native';
import styles from './styles';
import ServiceItemType from '../serviceitemtype';
// import Footer from '../Footer/Footer.js';
// import Header from '../header';
const ServiceItem= (props) => {
    const {list_of_titles,list_of_items,heading,list_of_prices} = props;
    return(
        <View style={styles.bigcontainer}>
            {/* <Header></Header> */}
            <View style = {styles.headingbox}><Text style={styles.heading}>{heading}</Text></View>
            
            {list_of_titles.map((item,key) => (<View key={key} style = {styles.Container}>
                    <View style={styles.textbox}><Text style={styles.text}>{item}</Text></View>
                    <View style = {styles.items}>
                    {list_of_items[key].map((item1,key1) => ( <View key ={key1}>
                        <ServiceItemType type={item1} price={list_of_prices[key][key1]}></ServiceItemType>
                        </View>))}
                    </View>
            {/* <Footer></Footer> */}
            </View> ))} 
        </View>
    );
};

export default ServiceItem;