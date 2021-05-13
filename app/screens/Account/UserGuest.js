import React from 'react' 
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest(){
    const navigation = useNavigation()
    console.log(navigation)

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/antiguo-reloj.jpg')}
            />
            <Text style={styles.title}>Ingresa a tu Perfil</Text>
            <Text style={styles.description}>
                Busca y visualiza las mejores librerias y comenta tu experiencia.
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title='Ver tu Perfil'
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 20
    },
    stretch:{
        width:'100%',
        height:160,
        resizeMode:'contain',
        marginTop: 20,
        marginBottom: 40
    },
    title:{
        fontWeight:'bold',
        fontSize:19,
        textAlign:'center'  
    },
    description:{
        marginTop:20,
        marginBottom: 20,
        textAlign:'center'
    },
    viewBtn:{
        flex:1,
        alignItems:'center' 
    },
    btnStyle:{
        marginTop:20,
        marginBottom: 20,
        backgroundColor:'#C39BD3'
    },
    btnContainer:{
        width:'70%'
    },
})