import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function InfoUser(props){
    const {userInfo:{uid, photoURL, displayName, email}, toastRef} = props
    console.log(uid)

    const changeAvatar= async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        console.log(resultPermissions.permissions.mediaLibrary)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

        if(resultPermissionsCamera === 'denied'){
                toastRef.current.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Permissions',
                    text2: 'Es necesario aceptar los permisos de galeria 👋',
                    visibilityTime: 3000
                });
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
                    text2: 'No elegiste un avatar 👋',
                    visibilityTime: 3000
                }); 
            } else{
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
        console.log('*******')
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
        })
    }
    
    return(
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
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 'row',
        backgroundColor: '#f2f2f2',
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
    }
})