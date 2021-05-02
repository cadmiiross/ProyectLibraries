import React from 'react' 
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'


export default function UserGuest(){
    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/IMG_0216.JPG')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    stretch:{
        width: '100%',
        height:300,
        rezizeMode: 'contain',
        marginBottom: 40
        
    },
    title:{
        
    }
})