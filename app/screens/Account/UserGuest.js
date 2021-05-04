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
                source={require('../../../assets/img/IMG_0216.JPG')}
            />
            <Text style={styles.title}>Ingresa a tu Perfil</Text>
            <Text style={styles.description}>
                Busca y visualiza las mejores librerias y comenta tu experiencia
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
        paddingTop: 10
    },
    stretch:{
        width: '100%',
        height:300,
        rezizeMode: 'contain',
        marginBottom: 40    
    },
    title:{
        fontWeight:'bold',
        fontSize:19,
        marginBotton:10,
        textAling:'center'  
    },
    description:{
        marginBotton:20,
        textAling:'center'
    },
    viewBtn:{
        flex:1,
        alignItems:'center' 
    },
    btnStyle:{
        backgroundColor:'#00a680'
    },
    btnContainer:{
        width:'70%'
    }
})