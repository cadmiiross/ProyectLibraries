import React, {useState} from 'react' 
import {StyleSheet, View} from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from 'firebase'
import {validateEmail} from '../../utils/validation'


export default function ChangeEmailForm(props){
    const {email, setShowModal, toastRef, setReloadUserInfo} = props
    const [newEmail, setNewEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit= ()=>{
        setError(null)
        if(!newEmail){
            setError('El nombre no puede estar vacio')
        } else if(email === newEmail){
            setError('El nombre no puede ser igual al actual')
        } else if(!validateEmail(newEmail)){
            setError('Email no valido')
        }else if(!password){
            setErrorPassword('Ingrese el password')
        } else{
            setIsLoading(true)
            
            var user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            )
                    
            user.reauthenticateWithCredential(credential).then(function() {
                firebase   
                .auth()
                .currentUser.updateEmail(newEmail)
                .then(()=>{
                    console.log('Todo bien desde firebase')
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                })   
                .catch((error)=>{
                    console.log(error)

                    setIsLoading(false)
                })    
            }).catch(function(error) {
                setIsLoading(false)
                setErrorPassword('El password no es correcto')

            });
            
        }
   }            
        
    

    return(
        <View>
            <Input
                placeholder='Nuevo Correo'
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }} 
                defaultValue={email || ''}
                onChange={(e)=>setNewEmail(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Input
                placeholder='Contraseña'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                    
                }
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
            />
            <Button
                title= 'Cambiar Contraseña'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#C39BD3'
    },
    icon:{
        color:'#b7657b'
    }
})