import React, {useRef} from 'react'
import {StyleSheet, View, Text, Image}  from 'react-native'
import { Divider} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native' 
import Toast from 'react-native-toast-message'
import LoginForm from '../../components/Account/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Login(){
    const toastRef = useRef()
    return(
    <KeyboardAwareScrollView>
        <Image
           source={require('../../../assets/img/-pluma-sobre-viejo-libro.jpg')}
           resizeMode='contain'
           style={styles.logo}
        />
        <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef}/>
            <CreateAccount/>
        </View>
        <Divider style = {styles.divider}/>
        <Toast ref={toastRef}/>
    </KeyboardAwareScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textRegister}>
            ¿Aun no tienes cuenta? {' '}
            <Text 
                style = {styles.linkRegister}
                onPress={()=>navigation.navigate('register')}
            >
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height:150,
        marginTop:20,
        marginBottom:40
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
    },
    textRegister:{
        marginTop:15,
        margingLeft:10,
        marginRight:10,
        textAlign:'center'
    },
    linkRegister:{
        color:'#D358F7',
        fontWeight:'bold'
    },
    divider:{
        backgroundColor:'#D358F7',
        margin:60
    }

})