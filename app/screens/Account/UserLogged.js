import React, {useState, useRef, useEffect} from 'react' 
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import {Button} from 'react-native-elements'
import Toast from 'react-native-toast-message'
import firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOptions'

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef()

    useEffect(() =>{
    (async()=>{
        const user = await firebase.auth().currentUser
        setUserInfo(user)
    })()
    setReloadUserInfo(false)
    }, [reloadUserInfo])

    return (
        <ScrollView>
        <View>
            {userInfo && (<InfoUser userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>)}
            {userInfo && (<AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>)}
            <Toast ref={toastRef}/>
        </View>
        <View style={styles.viewcontainer}>
        <Button 
                title='Cerrar Sesion' 
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={()=>firebase.auth().signOut()}
            />
        </View>
        <Toast ref={toastRef}/>
    </ScrollView>
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
        color: '#D358F7',
        fontWeight: 'bold'
    }
})