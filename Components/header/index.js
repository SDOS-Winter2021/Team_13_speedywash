import React from 'react';
import {View,Text, ImageBackground, Pressable,Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Header= (props) => {
    return(
        <View style={styles.Container}>
            <View style={styles.Titles}> 
                <Text style={styles.text}>SpeedyWash India</Text>
            </View>
            <View style = {styles.box}>
                <TouchableOpacity style = {styles.iconbox}>
                    <MaterialCommunityIconsIcon
                                name="bell"
                                style={styles.icon}
                            ></MaterialCommunityIconsIcon>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.iconbox}>
                    <EntypoIcon name="shopping-cart" style={styles.icon}></EntypoIcon>
                </TouchableOpacity>
    
            </View>
            {/* <Pressable style = {styles.cart}>
                <Image style={styles.image} source></Image>
            </Pressable> */} 
      </View>
    );
};

export default Header;