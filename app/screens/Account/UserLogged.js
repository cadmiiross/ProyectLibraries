import React, {useState, useRef, useEffect} from 'react' 
import { StyleSheet, Text, View } from 'react-native'
import {Button} from 'react-native-elements'
import Toast from 'react-native-toast-message'
import firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect(() =>{
        (async()=>{
            const user = await firebase.auth().currentUser
            setUserInfo(user)
        })()
    },[])
    return (
        <View style={styles.viewUserInfo}>
            {userInfo&&<InfoUser userInfo={userInfo}/>}
            <Text>AccountOptions...</Text>
            <Button 
                title='Cerrar Sesion' 
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={()=>firebase.auth().signOut()}
            />
            <Toast ref={toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: '100%',
        backgroundColor: '#f2f2f2',
        marginBottom: 9
    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#6E2C00',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft:40,
        marginRight:40
    },
    btnCloseSessionText:{
        color: '#D358F7'
    }
})