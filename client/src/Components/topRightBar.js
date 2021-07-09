import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const TopRightBar = ({navigation, route}) => {
  
  return (
    <TouchableOpacity onPress={() => alert('This is a button!')}>
      <View style={StyleSheet.container} >
        <Image
          source={require('../../public/img/logo.png')}
          style={{width: 52, resizeMode: 'contain'}}
      />
      </View>
    </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default TopRightBar;