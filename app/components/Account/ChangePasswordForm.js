import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from 'firebase'

export default function ChangePasswordForm(props) {
    const {email, setShowModal, toastRef, setReloadUserInfo} = props
    const [newPassword, setNewPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit= ()=>{
        setError(null)
        if(!newPassword) {
            setError('El campo no debe ser vacio')
        }else if(password === newPassword) {
            setError('Tu contraseña no debe ser igual a la actual')
        }else if(newPassword.length < 6) {
            setError('Debes ingresar una contraseña con un mínimo de 6 caracteres')
        }else if(!password) {
            setErrorPassword('Ingrese la contraseña')
        } else {setIsLoading(true)
            console.log(newPassword)


            var user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(email, password)

            user.reauthenticateWithCredential(credential).then(function(){
                firebase.auth().currentUser.updatePassword(newPassword).then(()=>{
                    console.log('Todo esta bien en firebase') 
                    console.log(newPassword)
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                }).catch((error)=>{console.log(error) 
                    setIsLoading(false)})
            }).catch(function(error){
                setIsLoading(false)
                setErrorPassword('La contraseña no es correcta')
            });
        }
         
}

    return (
        <View style={styles.form}>
            <Input
                placeholder='Ingresa tu contraseña actual'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={ showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={{color:'#c69b7c'}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
            />
            <Input
                placeholder='Ingresa tu nueva contraseña'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={ showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={{color:'#c69b7c'}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title= 'Cambiar contraseña'
                containerStyle={styles.tbnContainer}
                buttonStyle={styles.tbn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input:{
        marginBottom: 10
    },
    tbnContainer:{
        marginTop: 10,
        width: '95%'
    },
    tbn:{
        backgroundColor: '#c69b7c'
    }
})