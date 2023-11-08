import { StyleSheet, Dimensions, TouchableOpacity ,useColorScheme} from "react-native";
import { Text, View } from "../../components/Themed";
import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { SelectList } from 'react-native-dropdown-select-list'
import MyInput from "../../components/MyInput";
import WalletCard from "../../components/WalletCard";
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabTwoScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = useState("");
  
  const data = [
      {key:'1', value:'Bitcoin'},
      {key:'2', value:'Polygon'},  
  ]
  const [privatekey, setPrivatekey] = useState("");
  const [address, setAddress] = useState("address");
  const [balance,setBalance] = useState(0)
  const [wallet,setWallet] = useState(false)


  const handleImportWallet = async () => {
    try {
     const providers = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
     console.log(providers)
     const wallet = new ethers.Wallet(privatekey)
     const tempbalace = await providers.getBalance(wallet.address)
     const balance = parseInt(tempbalace.toString())/1000000000000000000
     setAddress(wallet.address)
     setBalance(balance)
     setWallet(true)
     await AsyncStorage.setItem("polygonkey",privatekey)
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportBitcoinWallet = async () =>{
    try {

      
    } catch (error) {
      console.log(error);
    }
  }
  const textStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const handleRemoveWallet = async() =>{
    await AsyncStorage.clear();
    setWallet(false)
  }

  const getWallets =async()=>{

    try{
     const privatekey = await AsyncStorage.getItem("polygonkey")
     
     if(privatekey)
     {
      const providers = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
     console.log(providers)
     const wallet = new ethers.Wallet(privatekey)
     const tempbalace = await providers.getBalance(wallet.address)
     const balance = parseInt(tempbalace.toString())/1000000000000000000
     setAddress(wallet.address)
     setBalance(balance)
     setWallet(true)

     }
    }
    catch(error)
    {
      console.log(error)
    }
    
    

  }

  useEffect(()=>{getWallets()},[])



  return (
    <View style={styles.container}>
      <View style={{width:width*0.8}}> 
      <SelectList 
        setSelected={(val:string) => setSelected(val)} 
        data={data} 
        save="value"
        inputStyles={textStyle}
        dropdownTextStyles={textStyle}
        boxStyles={{borderRadius:4,borderWidth:1,borderColor: '#ccc',}}
        dropdownStyles={{borderRadius:4,borderWidth:1,borderColor: '#ccc',}}
        
       />
       </View>
      <MyInput  label={"privatekey"} onChangeText={setPrivatekey}
        value={privatekey}/>
     
      <TouchableOpacity
        onPress={() => handleImportWallet()}
        style={styles.button}
      >
        <Text style={{ color: "white" }}>Import Wallet</Text>
      </TouchableOpacity>

     {wallet&& <View style={styles.wallets}>
        <Text style={styles.walletsTitle}>Wallets List</Text>
        <WalletCard imageurl="https://pbs.twimg.com/profile_images/1624229555333373952/JXGKFcO__400x400.jpg" name="Polygon" symbol="MATIC" balance={balance} address={address} handlePress={()=>handleRemoveWallet()}/>
        {/* <WalletCard imageurl="https://pbs.twimg.com/profile_images/421692600446619648/dWAbC2wg_400x400.jpeg" name="Bitcoin" symbol="BTC" balance={balance} address={address}/> */}
       
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap:10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: width * 0.9,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    width: width * 0.6,
    borderRadius: 5,
    alignItems: "center",
    marginBottom:20
  },
  wallets:{
    gap:10
  },
  walletsTitle:{
    fontSize:20
  }
});
