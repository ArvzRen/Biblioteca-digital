import React,{Component} from 'react';
import { Text, View, StyleSheet, Image, ImageBackground , TextInput, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

const bg = require ("../assets/BG.png")
const icon = require ("../assets/Icon.png")
const name = require ("../assets/Name.png")

export default class TransactionScreen extends Component {

  constructor (props){
    super(props);
    this.state = {
      bookId:"",
      studentId:"",
      domstate:"normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }
  
  getCameraPermissions = async domstate => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
      domstate: domstate,
      scanned: false
    });
  };

  handleBarCodeScanner = async({type,data}) => {
    const {domstate} = this.state;

    if(domstate == "bookId"){
      this.setState({
        bookId: data,
        domstate: "normal",
        scanned: true
      });
    } else if (domstate == "studentId"){
        this.setState({
          studentId: data,
          domstate: "normal",
          scanned: true
        });
    }
  }

  render(){
    const {bookId, studentId, domstate, scanned} = this.state;
    
    if(domstate !== "normal"){
      return(
        <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}/>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground source = {bg} style = {styles.bgImage}>
          <View style = {styles.upperContainer}>
            <Image source = {icon} style = {styles.appIcon}/>
            <Image source = {name} style = {styles.appName}/>
          </View>
          <View style = {styles.lowerContainer}>
            <View style = {styles.textInputContainer}>
              <TextInput style = {styles.textInput}
              placeholder={"Id Del Libro"}
              placeholderTextColor={"white"}
              value={bookId}/>
              <TouchableOpacity style = {styles.scanButton}
              onPress={()=>this.getCameraPermissions("bookId")}>
                <Text style = {styles.scanText}>Escanear</Text>
              </TouchableOpacity>
            </View>
            <View style = {[styles.textInputContainer,{marginTop:25}]}>
              <TextInput style = {styles.textInput}
              placeholder={"Id Del Estudiante"}
              placeholderTextColor={"white"}
              value={studentId}/>
              <TouchableOpacity style = {styles.scanButton}
              onPress={()=>this.getCameraPermissions("studentId")}>
                <Text style = {styles.scanText}>Escanear</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style = {[styles.button,{marginTop:25}]}>
              <Text style = {styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer:{
    flex:0.5,
    justifyContent: "center",
    alignItems:"center",
  },
  lowerContainer:{
    flex:0.5,
    alignItems:"center",
  },
  textInputContainer:{
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    flexDirection: "row",
    backgroundColor: "white",
  },
  textInput:{
    width: "57%",
    hight: 50,
    padding: 10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 24,
    fontFamily: "Caveat_400Regular",
    color: "white",
    backgroundColor: "#5653D4",
  },
  scanButton:{
    width: 100,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scanText:{
    fontSize: 24,
    color: "blue",
    fontFamily: "Caveat_400Regular",
  },
  button:{
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  buttonText:{
    fontSize: 24,
    color: "blue",
    fontFamily: "Caveat_400Regular",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  appIcon:{
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80,
  },
  appName:{
    width: 80,
    height: 80,
    resizeMode: "contain"
  }
});
