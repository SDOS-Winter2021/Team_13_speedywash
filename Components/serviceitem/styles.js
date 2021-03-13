import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    bigcontainer:{
        width:"100%",
        height:"100%",
        // marginTop:10
    },
    headingbox:{
        width:"100%",
        height:"8%",
        justifyContent:'center',
        alignItems:'center',
        
    },
    heading:{
        fontSize:30,
        alignSelf:'center',
        color:'rgba(0,107,173,1)',
        fontWeight:'bold'
    },
    Container: {
        width:"100%",
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgba(243,246,216,1)',
        alignContent:'center',
        alignSelf:'center'
      },
      textbox:{
          width:"100%",
          height:"12%",
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:"rgba(255,218,164,1)",
          borderWidth:1,
          borderColor:"black"
      },
      text:{
        fontSize:20,
        color:'rgba(0,107,173,1)',
        fontWeight:'bold'
      },
      items:{
          height:"60%",
        //   backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center'
      }
      
});
export default styles;