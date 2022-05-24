import React,{Component} from 'react';
import {Caveat_400Regular} from '@expo-google-fonts/caveat';
import * as Font from 'expo-font';
import BottomTabNavigator from './components/BottomTabNavigator';

export default class App extends Component {
  constructor(){ 
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async loadFonts(){
    await Font.loadAsync ({
      Caveat_400Regular:Caveat_400Regular
    });
    this.setState({fontLoaded:true});
  }

  componentDidMount(){
    this.loadFonts();
  }

  render(){
    const {fontLoaded} = this.state;

    if(fontLoaded){
      return (
        <BottomTabNavigator/>
      ); 
    }
    return null;
  }
}

