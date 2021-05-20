import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function AddLibrariesForm(props){
    const {toastRef, setIsLoading, navigation} = props
    const [nameLibraries, setNameLibraries] = useState(null)
    const [direccion, setDireccion] = useState(null) 
    const [description, setDescription] = useState(null) 
    const [errorLibraries, setErrorLibraries] = useState(null) 
    const [errorDireccion, setErrorDireccion] = useState(null) 
    const [errorDescripcion, setErrorDescripcion] = useState(null) 

    const onSubmit = ()=>{
        
        if(!nameLibraries && !direccion && !description){
            setErrorLibraries('Nombre de la libreria es requerido')
            setErrorDireccion('La direccion es requerido')
            setErrorDescripcion('Descripcion es requerido')
        }else if(!direccion && !description){
            setErrorLibraries(null)
            setErrorDireccion('Nombre de la libreria es requerido')
            setErrorDescripcion('Descripcion es requerido')
        }else if(!nameLibraries && !description){
            setErrorLibrariest('La direccion es requerida')
            setErrorDireccion(null)
            setErrorDescripcion('Descripcion es requerido')
        }else if(!direccion && !nameLibraries){
            setErrorLibraries('Nombre de la libreria es requerido')
            setErrorDireccion('La direccion es requerida')
            setErrorDescripcion(null)
        }else if(!nameLibraries){
            setErrorLibraries('Nombre de la libreria es requerido')
            setErrorDireccion(null)
            setErrorDescripcion(null)
        }else if(!direccion){
            setErrorLibraries(null)
            setErrorDireccion('Direccion es requerida')
            setErrorDescripcion(null)
        }else if(!description){
            setErrorLibraries(null)
            setErrorDireccion(null)
            setErrorDescripcion('Descripcion es requerido')
        }else{
            setErrorLibraries(null)
            setErrorDireccion(null)
            setErrorDescripcion(null)
            console.log('Nombre de la libreria:', nameLibraries)
            console.log('Direccion:', direccion)
            console.log('Descripción de la libreria:', description)
            toastRef.current.show({
                type: 'success',
                position: 'top',
                text1: '¡Listo!',
                text2: 'Todo correcto',
                visibilityTime: 3000
            })
        }
    }
    return(
        <View style={styles.view}>
            <Input
                placeholder='Nombre de la libreria'
                placeholderTextColor="#c69b7c"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#c69b7c'
                }}
                onChange={(e)=>setNameLibraries(e.nativeEvent.text)}
                errorMessage={errorLibraries}
            />
            <Input
                placeholder='Direccion'
                placeholderTextColor="#c69b7c"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#00a68'
                }}
                onChange={(e)=>setDireccion(e.nativeEvent.text)}
                errorMessage={errorDireccion}
            />
                <Input
                placeholder='Descripción'
                placeholderTextColor="#00a68"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color:'#c69b7c'
                }}
                onChange={(e)=>setDescription(e.nativeEvent.text)}
                errorMessage={errorDescripcion}
            />
            <Button
                title= 'Cambiar Nombre'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10
    },
    view:{
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width:'95%'
    },
    btn:{
        backgroundColor: '#c69b7c'
    }
})