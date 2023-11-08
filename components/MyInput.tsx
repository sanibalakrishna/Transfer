import React ,{useState}from 'react'
import { Text,TextInput,View,StyleSheet ,useColorScheme} from 'react-native';
import Colors from '../constants/Colors';
const MyInput = ({label, error, ...rest}:any) => {
    const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        style={[
          styles.inputi,
          {color: Colors[colorScheme ?? 'light'].text},
          isFocused && styles.focusedInput,
          error && styles.errorInput,
        ]}
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? '' : label}
      />
      <View
        style={
          isFocused
            ? [
                styles.labelContainer,
                {backgroundColor: Colors[colorScheme ?? 'light'].background},
              ]
            : styles.lablenull
        }>
        <Text style={isFocused && styles.label}>{label}</Text>
      </View>
    </View>
  );
};

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
export default MyInput