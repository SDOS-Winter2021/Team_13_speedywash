import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    Container: {
        width:"95%",
        flex:1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor:'white',
        marginBottom:10,
        borderRadius:10,
        borderColor:"black",
        borderWidth:1,
        height: 50
      },
      box:{
          width:"10%",
          height:'100%',
          // backgroundColor:'blue',
          
      },
      image:{
          height:'90%',
          width:'90%',
          // backgroundColor:"red"
      },
      button:{
          width:"50%",
          
          borderColor:"black",
          height:"100%",
          justifyContent:"center",
          alignItems:'center',
          borderRadius:50,
          marginRight: 3
        //   backgroundColor:"white",
          
      },
      counter:{
        width:70,
        flexDirection:'row',
        height:30,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:"flex-end",
        
        // backgroundColor:"red"
      },
      type:{
        width:"30%",
        alignContent:"flex-end",
       
      },
      type2:{
        width:"20%",
        alignContent:"flex-end",
      },
      typetext:{
        // fontWeight:'bold'
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
        // fontWeight:'bold',
        borderRadius: 100
      }
      
    //   Titles:{
    //       w
    //   }
      
});
export default styles;