import React from 'react'
import { StyleSheet, View, Text,  ActivityIndicator} from 'react-native'
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
                <ActivityIndicator size='large' color='#C39BD3'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}   


const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:'90%',
        backgroundColor: '#fff',
        borderColor: '#C39BD3',
        borderWidth: 2,
        borderRadius: 10   
    },
    text:{
        color: '#c69b7c',
        textTransform: 'uppercase',
        marginTop: 10,
        fontSize: 30,
        paddingVertical: 10,
        alignSelf: 'center',
        textAlign: 'center',
    }
})