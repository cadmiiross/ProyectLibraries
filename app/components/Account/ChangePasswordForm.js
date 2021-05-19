import React, {useState} from 'react' 
import {StyleSheet, View} from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from 'firebase'

export default function ChangePasswordForm(props){
    const {email, setShowModal, toastRef, setReloadUserInfo} = props
    const [newPassword, setNewPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit= ()=>{
        setError(null)
        if(!newPassword){
            setError('La contraseña no puede estar vacio')
        } else if(password === newPassword){
            setError('La contraseña no puede ser igual al actual')
        } else if(newPassword.length < 6){
            setError('Contraseña debe tener almenos 6 letras')
        }else if(!password){
            setErrorPassword('Ingrese la contraseña')
        } else {
            setIsLoading(true)
            console.log(newPassword)
            
            var user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            )

            user.reauthenticateWithCredential(credential).then(function() {
                firebase   
                .auth()
                .currentUser.updatePassword(newPassword)
                .then(()=>{
                    console.log('Todo bien desde firebase')
                    console.log(newPassword)
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
        <View style={styles.view}>
            <Input
                placeholder='Contraseña'
                placeholderTextColor="#78c4d4"
                containerStyle={styles.input}
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
                defaultValue={email || ''}
                onChange={(e)=>setNewPassword(e.nativeEvent.text)}
                errorMessage={error}
            />
             <Input
                placeholder='Contraseña Antigua'
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