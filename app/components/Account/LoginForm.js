import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {validateEmail} from '../../utils/validation'
import firebase from 'firebase'


export default function LoginForm(props){
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()

    const onSubmit = () => {
        if(formData.email.length===0||formData.password.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requeridos 👋',
                visibilityTime: 3000
              });
        } else if (!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Email',
                text2: 'El email no es correcto 👋',
                visibilityTime: 3000
              }); 
        } else{
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(()=>{
                     navigation.navigate('account')
                })
                .catch(()=>{
                    toastRef.current.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Cuenta',
                        text2: 'Las credenciales no son correctas 👋',
                        visibilityTime: 3000
                    });
                })
        }
    }      

    const onChange = (e, type) => {
        setFormData({ ...formData,[type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
                rightIcon={<Icon 
                    type='material-community' 
                    name='at' 
                    iconStyle={styles.iconRight}
            />}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=>onChange(e, 'password')}
                rightIcon={<Icon 
                    type='material-community' 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowPassword(!showPassword)}
            />}
            />
            <Button
                title= 'Iniciar Sesion'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
        </View>
    )
}

function defaultFormValues(){
    return{
        email: '',
        password: '',
        repeatPassword: ''
    }
}


const styles = StyleSheet.create({
    formContainer:{
        marginTop:30
    },
    inputForm:{
        width: '90%',
        marginTop:20,
        marginLeft: 10,
        marginRight:10
    },
    btnContainerLogin:{
        marginTop: 20,
        width: '90%'
    },
    btnLogin:{
        backgroundColor:'#C39BD3'
    },
    iconRight:{
        color:'#c69b7c'
    }

})