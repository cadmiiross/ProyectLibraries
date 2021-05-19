import React, {useState}  from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import AccountOptions from './AccountOptions'
import Loading from '../../components/Loading'

export default function InfoUser(props){
    const {userInfo:{uid, photoURL, displayName, email}, userInfo, setReloadUserInfo, toastRef} = props
    const [isLoading, setLoading] = useState(false)

    const changeAvatar= async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

        if(resultPermissionsCamera === 'denied'){
                toastRef.current.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Permissions',
                    text2: 'Es necesario aceptar los permisos de galeria 👋',
                    visibilityTime: 3000
                })
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            console.log(result)
            if (result.cancelled){
                toastRef.current.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'No elegiste un avatar ',
                    visibilityTime: 3000
                }); 
            } else{
                setLoading(true)
                uploadImage(result.uri).then(()=>{
                    console.log('Imagen en firebase')
                    updatePhotoUrl()
                }).catch(()=>{
                    toastRef.current.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Firebase Error',
                        text2: 'Error al actualizar el avatar 👋',
                        visibilityTime: 3000
                    });  
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        console.log('**** URI ****')
        console.log(uri)
        const response = await fetch(uri)
        console.log(JSON.stringify (response))
        const blob = await response.blob()
        console.log('****Blob***')
        console.log(JSON.stringify(blob))
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob)
    }

    const updatePhotoUrl = () => {
        firebase 
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async(response)=>{
            console.log(response)
            const update ={
                photoURL: response
            }
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen Actualizada')
            setReloadUserInfo(true)
        })
    }
    
    return(
        <View>
           <View style={styles.viewUserInfo}>
                  <Avatar
                      title='CRM'
                      rounded
                      size= 'large'
                      onPress={changeAvatar}
                      containerStyle={styles.userInfoAvatar}
                      source={
                          photoURL ? {uri:photoURL} : require('../../../assets/img/icon-book.jpg')
                      }
                    />
                <View>
                    <Text style={styles.displayName}>
                        {displayName ? displayName : 'Invitado'}
                    </Text>
                    <Text>{email ? email : 'Entrada a traves de otro Medio'}</Text>
                </View>
           </View>
            <Loading
              isVisible={isLoading}
              text={'Actualizando...'}
            />
         </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginTop: 20,
        backgroundColor: '#c69b7c'
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5,
        textAlign:'center',
        marginTop: 20
    },
    viewInfo:{
        paddingTop: 20,
        paddingLeft:15
    }
})