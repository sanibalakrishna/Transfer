import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions,useColorScheme, TouchableOpacity, GestureResponderEvent } from 'react-native';

type walletprops = {imageurl:string,name:string,address:string,balance:number,symbol:string,handlePress:(event:GestureResponderEvent)=>void}
const {width} = Dimensions.get("window")
const WalletCard = ({imageurl,name,address,balance,symbol,handlePress}:walletprops) => {

  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? 'white' : 'black',
  };



  return (
    <View style={styles.card}>
      {/* Left side (Image) */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageurl }} // Replace with your image URL
          style={styles.image}
        />
      </View>

      {/* Right side (Data) */}
      <View style={styles.dataContainer}>
        <Text style={[styles.name,textStyle]}>{name}</Text>
        <Text style={[styles.address,textStyle]}>{address}</Text>
        <Text style={[styles.balance,textStyle]}>Balance: {balance.toFixed(8) +" "+ symbol}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}><Text style={textStyle}>Remove</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width:width*0.9
  },
  imageContainer: {
    flex: 0.35,
  },
  image: {
    width: '100%',
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 10,
  },
  dataContainer: {
    flex: 0.65,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#777',
  },
  balance: {
    fontSize: 16,
    marginTop: 5,
  },
  button:{
    width:width*0.25,
    backgroundColor:"#ff3567",
    justifyContent:"center",
    alignItems:"center",
    padding:2,
    borderRadius:5
  },
 
});

export default WalletCard;
