import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    Container: {
        width:"95%",
        height:"40%",
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor:'white',
        marginBottom:10,
        borderRadius:10,
        borderColor:"black",
        borderWidth:1
      },
      box:{
          width:"10%",
          height:'100%',
          backgroundColor:'blue',
          
      },
      image:{
          height:'100%',
          width:'100%',
          backgroundColor:"red"
      },
      button:{
          width:"50%",
          
          borderColor:"black",
          height:"100%",
          justifyContent:"center",
          alignItems:'center',
          borderRadius:10,
        //   backgroundColor:"white",
          
      },
      counter:{
        width:"30%",
        flexDirection:'row',
        height:"90%",
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:"flex-end"
        // backgroundColor:"red"
      },
      type:{
        width:"20%",
        alignContent:"flex-end",
       
      },
      typetext:{
        fontWeight:'bold'
      }
      ,
      buttontext:{
        backgroundColor:"white",
        width:"80%",
        height:"80%",
        color:"blue",
        borderWidth:1,
        borderColor:"blue",
        fontSize:15,
        // alignSelf: "center",
        textAlign:'center',
        alignItems:"center",
        // textAlignVertical:"center",
        alignSelf:'auto',
        fontWeight:'bold'
      }
      
    //   Titles:{
    //       w
    //   }
      
});
export default styles;