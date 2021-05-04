import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native'
import {Overlay} from 'react-native-elements'

export default function Loading(props){
    const {isVisible, text} = props
    return(
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor = 'rgba(0,0,0,0.5)'
            overlayBackgroundColor = 'transparent'
            overlayStyle = {styles.overlay}
        >
            <View>
                <ActivityIndicator size='large' color='#00a6680'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}   


const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor: '#fff',
        borderColor: '#00a680',
        borderwidth: 2,
        borderRadius: 10   
    },
    text:{
        color: '#00a680',
        textTransform: 'uppercase',
        marginTop: 10
    }
})