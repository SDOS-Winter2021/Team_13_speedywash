import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    bigcontainer:{
        width:"100%",
        flex:3,
        
        alignContent:'center',
        backgroundColor:'rgba(243,246,216,1)'
    },
    headingbox:{
        width:"100%",
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        padding:10
        
        
    },
    heading:{
        fontSize:30,
        // alignSelf:'center',
        color:'rgba(0,107,173,1)',
        fontWeight:'bold'
    },
      textbox:{
          width:"100%",
          flex:0.25,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:"rgba(255,218,164,1)",
          borderWidth:1,
          borderColor:"black"
      },
      text:{
        fontSize:20,
        color:'rgba(0,107,173,1)',
        fontWeight:'bold',
        alignSelf:'center'
      },
      items:{
          
        
          
      },
     
      itembox:{
          alignItems:'center',
          justifyContent:'space-around',
          backgroundColor:'red'
      },
      touchable:{
    
          justifyContent:'space-around'
      },
      allitems:{
          justifyContent:'space-evenly'
      },
     
    
      
});
export default styles;