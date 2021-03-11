import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "10%",
        backgroundColor:"rgba(0,107,173,1)",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end',
        alignContent:'flex-end'
      },
      Titles: {
        
        width:'70%',
        height:"100%",
        alignItems:'center',
        justifyContent:'center',
        
  
      },
      text:{
          fontSize:20,
          color:'white',
          // alignSelf:'flex-start',
          
          fontWeight:'bold',
          alignSelf:'center'
      },
      icon:{
        
        fontSize:30,
        // backgroundColor:'red',
        alignSelf:'center',
        
      },
      box:{
        width:'50%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center'
      }
      , iconbox:{
        width:'20%',
        height:"100%",
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red'
      }
});
export default styles;