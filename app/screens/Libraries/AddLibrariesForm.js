import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Alert} from 'react-native'
import {Input, Button, Image, Icon, Avatar} from 'react-native-elements'
import Modal from '../../components/Modal'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import {map, size} from 'lodash'
import firebase from 'firebase'
import MapView from 'react-native-maps'

export default function AddLibrariesForm(props) {
        const {toastRef, setIsLoading} = props
        const [nameLibrary, setNameLibrary] = useState(null)
        const [direccion, setDireccion] = useState(null) 
        const [description, setDescription] = useState(null) 
        const [errorLibrary, setErrorLibrary] = useState(null) 
        const [errorDireccion, setErrorDireccion] = useState(null) 
        const [errorDescripcion, setErrorDescripcion] = useState(null)
        const [isVisibleMap, setIsVisibleMap] = useState(false) 
        const [imagesSelected, setImagesSelected] = useState([])
        const [locationLibraries, setLocationLibraries] = useState(null)
        
        

    
        const onSubmit = ()=>{
            
            if(!nameLibrary && !direccion && !description){
                setErrorLibrary('Nombre de la libreria es requerido')
                setErrorDireccion('La direccion es requerida')
                setErrorDescripcion('Descripcion es requerido')
            }else if(!direccion && !description){
                setErrorLibrary(null)
                setErrorDireccion('La direccion es requerida')
                setErrorDescripcion('Descripcion es requerido')
            }else if(!nameLibrary && !description){
                setErrorLibrary('Nombre de la libreria es requerido')
                setErrorDireccion(null)
                setErrorDescripcion('Descripcion es requerido')
            }else if(!direccion && !nameLibrary){
                setErrorLibrary('Nombre de la libreria es requerido')
                setErrorDireccion('La direccion es requerida')
                setErrorDescripcion(null)
            }else if(!nameLibrary){
                setErrorLibrary('Nombre de la libreria es requerido')
                setErrorDireccion(null)
                setErrorDescripcion(null)
            }else if(!direccion){
                setErrorLibrary(null)
                setErrorDireccion('La direccion es requerida')
                setErrorDescripcion(null)
            }else if(!description){
                setErrorLibrary(null)
                setErrorDireccion(null)
                setErrorDescripcion('Descripcion es requerido')
            }else{
                setErrorLibrary(null)
                setErrorDireccion(null)
                setErrorDescripcion(null)
                console.log('Nombre de la libreria',nameLibrary)
                console.log('Direccion de la libreria',direccion)
                console.log('Descripcion de la libreria',description)
                console.log('Localizacion:', locationLibraries)
                if(!locate){
                    console.log('Sin locacion')
                }else{
                    console.log('Locacion guardada')
                }
                toastRef.current.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Excelente',
                    text2: 'Tu asunto se ha posteado',
                    visibilityTime: 3000
                })
            }
        }

    return (
            <View style={styles.FormView}>
            <Input
                setIsVisibleMap={setIsVisibleMap}
            />
            <Input
                placeholder='Nombre de la Libreria'
                placeholderTextColor="#6E2C00"
                containerStyle={styles.input}
                onChange={(e)=>setNameLibrary(e.nativeEvent.text)}
                errorMessage={errorLibrary}
                rightIcon={{
                    type:'material-community',
                    name:'book',
                    color: '#c69b7c',
                    onPress:()=> setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder='Dirección'
                placeholderTextColor="#6E2C00"
                containerStyle={styles.input}
                onChange={(e)=>setDireccion(e.nativeEvent.text)}
                errorMessage={errorDireccion}
                rightIcon={{
                    type:'material-community',
                    name:'google-maps',
                    color: '#c69b7c',
                    onPress:()=> setIsVisibleMap(true)
                }}
                onChange={(e)=>setLocation(e.nativeEvent.text)}
            />
                <Input
                placeholder='Descripción'
                placeholderTextColor="#6E2C00"
                multiline={true}
                containerStyle={styles.input}
                onChange={(e)=>setDescription(e.nativeEvent.text)}
                errorMessage={errorDescripcion}
                rightIcon={{
                    type:'material-community',
                    name:'border-color',
                    color: '#c69b7c',
                    onPress:()=> setIsVisibleMap(true)
                }}
            />

            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title= 'Agregar Libreria'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationLibraries={setLocationLibraries}
            />
        </View>

    )
}
//*********************************************************************************/


//Esta seccion pertenece a MAP 

function Map(props){
    const {isVisibleMap, setIsVisibleMap, setLocationLibraries} = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async()=>{
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
            console.log(resultPermissions)
            const  statusPermissions = resultPermissions.permissions.locationForeground.status
            if(statusPermissions==='granted'){
                const locate = await Location.getCurrentPositionAsync({})
                console.log(locate)
                setLocation({
                    latitude: locate.coords.latitude,
                    longitude: locate.coords.longitud,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])   
    

    const confirmLocation=()=>{
        setLocationLibraries(location)
        setIsVisibleMap(false)
        console.log(location) 
    }


    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location&&(
                   <MapView
                      style={styles.mapStyle}
                      initialRegion={location}
                      showsUserLocation={true}
                      onRegionChange={(region)=>setLocation(region)}
                    >
            
                       <MapView.Marker
                            coordinate={{
                               latitude:location.latitude,
                               longitude:location.longitude 
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title='Guardar Ubicacion'
                        conteinerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title='Cancelar Ubicacion'
                        conteinerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={()=>setIsVisibleMap(false)}
                    />

                </View>
            </View>
        </Modal>
    )
}

//***********************************************************************************/


//Esta seccion es para subir las imagenes a la app


function UploadImage(props) {
    const {toastRef, imagesSelected, setImagesSelected} = props
        const imageSelect = async() => {
            const response = await loadImageFromGallery([4, 3])
            if (!response.status) {
                toastRef.current.show("No se ha seleccionado ninguna imagen", 3000)
                return
            }
            setImagesSelected([...imagesSelected, response.image])
            console.log(response)
        }

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 4 && (
                    <Icon
                        type='material-community'
                        name='camera'
                        color='#4a2e00'
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageLibraries, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageLibraries}}
                    />
                ))
            }
        </ScrollView>
    )
}

export const loadImageFromGallery = async(array) => {
    const response = { status: false, image: null}
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    console.log(resultPermissions.permissions.mediaLibrary)
    const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

    if (resultPermissions.status === 'denied') {
        Alert.alert("Es necesario aceptar los permisos de galeria")
        return response   
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })
    if (result.cancelled) {
        return response
    }
    response.status = true
    response.image = result.uri
    console.log(result.uri)
    return response

}


const styles = StyleSheet.create({
    input:{
        marginBottom:10
    },
    FormView:{
        alignItems:'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#fff'
    },
    btnContainer:{
        marginTop:20,
        width:'100%',
        fontWeight:'bold'
    },
    btn:{
        backgroundColor: '#C39BD3',
    },
    viewImage:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20
    },
    containerIcon:{
        alignItems:'center',
        justifyContent:'center',
        marginRight: 10,
        height: 70,
        width:79,
        backgroundColor:'#e3e3e3'
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    },
    mapStyle:{
        width: '100%',
        height: 550
    },
    viewMapBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerSave:{
      paddingRight: 5  
    },
    viewMapBtnSave:{
      backgroundColor: '#00a680'  
    },
    viewMapBtnContainerCancel:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor: '#a60d0d'
    }
})