import { View, Text,useColorScheme,SafeAreaView,StatusBar,Modal,Alert, Linking, Pressable, ActivityIndicator, TouchableOpacity,StyleSheet ,Dimensions} from 'react-native'
import React,{useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'; 

<Ionicons name="close-circle" size={32} color="red" />
import Colors from '../../constants/Colors';
import MyInput from '../../components/MyInput';
import { SelectList } from 'react-native-dropdown-select-list'
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers } from 'ethers';

const index=()=> {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = useState("Bitcoin");
  
  const data = [
      {key:'1', value:'Bitcoin'},
      {key:'2', value:'Polygon'},  
  ]
  const colorScheme = useColorScheme();
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [polygonscan, setPolygonscan] = useState('');
  const [errors, setErrors] = useState([false, false]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const textStyle = {
    color: isDarkMode ? 'white' : 'black',
  };
  const sendEth = async() => {
    const temperrors = [false, false];
    if (address == '' || amount == '') {
      if (address == '') {
        temperrors[0] = true;
      }
      if (amount == '') {
        temperrors[1] = true;
      }
      setErrors(temperrors);
    } else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      temperrors[0] = true;
      setErrors(temperrors);
    } else {
      setErrors([false, false]);
      try {
        setLoading(true);
        setStatus('');

        if(!ethers.isAddress(address))
        {
          setStatus('Transaction error: Please Enter a valid Ethereum Address');
          setModalVisible(true);
          setLoading(false);
          return;
        }
        const privatekey =await AsyncStorage.getItem("polygonkey") 
       if(privatekey){ 
        const providers = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
        const wallet = new ethers.Wallet(privatekey,providers)
        const tempbalace = await providers.getBalance(wallet.address)
        const balance = parseInt(tempbalace.toString())/1000000000000000000
        const sendAmount = ethers.parseUnits(amount, 18); 
        const transaction = {
          to: address,
          value: sendAmount,
        };
      wallet.sendTransaction(transaction).then((result)=>{   setStatus('Transaction hash:' + result.hash);
      setPolygonscan(
        'https://mumbai.polygonscan.com/tx/' +
          result.hash,
      );
      setModalVisible(true);
      setLoading(false);}).catch((error)=>{  setStatus('Transaction error:' + error);
      setModalVisible(true);
      setLoading(false);})
    
  
        
      }
       
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    console.log(`Address:${address},Amount:${amount}`);
    console.log(errors);
  };





  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }} >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].modlebackground,
                shadowColor: Colors[colorScheme ?? 'light'].modalshowdow,
              },
            ]}>
            {status[12] == 'h' ? (
            <Ionicons name="checkmark-circle" size={32} color="green" />
            ) : (
              <Ionicons name="close-circle" size={32} color="red" />
            )}
            {status ? (
              <Text style={[styles.modalText, textStyle]}>{status}</Text>
            ) : (
              <ActivityIndicator />
            )}
            {status[12] == 'h' && (
              <Pressable
                style={[styles.button, styles.buttonClose, styles.butttontrans]}
                onPress={() => {
                  Linking.openURL(polygonscan);
                }}>
                <Text style={styles.textStyle}>View Transaction</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={[styles.sectionContainer, backgroundStyle]}>
        <Text style={[textStyle, styles.title]}> Transfer App</Text>
        <View style={{width:width*0.8 ,marginBottom:20}}> 
       <SelectList 
        setSelected={(val:string) => setSelected(val)} 
        data={data} 
        save="value"
        inputStyles={textStyle}
        dropdownTextStyles={textStyle}
        boxStyles={{borderRadius:4,borderWidth:1,borderColor: '#ccc',}}
        dropdownStyles={{borderRadius:4,borderWidth:1,borderColor: '#ccc',}}
        defaultOption={{key:"1",value:"Bitcoin"}}
        
       />
       </View>
        
        <MyInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          error={errors[0]}
        />
        <MyInput
          label={selected=="Bitcoin"?"BTC":"MATIC"}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          error={errors[1]}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={!loading ? sendEth : () => {}}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text
              style={[
                styles.btntext,
                {color: Colors[colorScheme ?? 'light'].text},
              ]}>
              Transfer Amount
            </Text>
          )}
        </TouchableOpacity>
        {(errors[0] || errors[1]) && (
          <Text style={styles.errorMessage}>
            Please Enter Valid {errors[0] && 'Address'}{' '}
            {errors[0] && errors[1] && ','} {errors[1] && 'Ether'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    marginBottom: 16,
    width: '80%',
  },
  inputi: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  focusedInput: {
    borderColor: '#0077cc',
  },
  errorInput: {
    borderColor: '#ee0000',
  },
  labelContainer: {
    position: 'absolute',
    top: -8,
    left: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: '#0077cc',
  },
  lablenull: {
    display: 'none',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  titletag: {
    fontSize: 20,
    fontWeight: '500',
  },
  inputtag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
  },

  fields: {
    width: '80%',
    marginTop: 30,
  },
  inputlabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  btn: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    height: 50,
    marginTop: 30,
    borderRadius: 10,
  },
  btntext: {fontSize: 18, fontWeight: '400'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 20,
    padding: 35,
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 2,
  },
  butttontrans: {
    backgroundColor: 'green',
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    marginTop: 10,
  },

  ethereumLogo: {
    height: 300,
    alignSelf: 'center',
  },
  modallogo: {
    height: 100,
    alignSelf: 'center',
  },
});

export default index;