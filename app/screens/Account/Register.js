import React from 'react' 
import {StyleSheet, View, Text, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ResgisterForm from '../../components/Account/RegisterForm'

export default function Register(){
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../assets/img/viejos-libros-gafas.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style = {styles.viewForms}>
                <ResgisterForm/>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewForms:{
        marginright:40,
        marginLeft:40
    },
    logo:{
        width:'100%',
        height:150,
        marginTop:20,
        marginBottom:20
    },
})