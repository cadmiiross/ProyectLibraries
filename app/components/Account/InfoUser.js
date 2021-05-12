import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Avatar} from 'react-native-elements'

export default function InfoUser(props){
    const {userInfo:{photoURL, displayName, email}} = props
    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                title='CRM'
                rounded
                size= 'large'
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