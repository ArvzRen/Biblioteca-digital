import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class SearchScreen extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
         Pantalla de búsqueda
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
  },
  text: {
    margin: 24,
    fontSize: 30,
    color:'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
