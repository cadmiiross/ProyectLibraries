import React, {useState, useRef} from 'react'
import {View, Text} from 'react-native'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import AddLibrariesForm from './AddLibrariesForm'
import {useNavigation} from '@react-navigation/native'


export default function AddLibraries(){
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const toastRef = useRef()
    return(
        <View>
            <Text>AddLibraries</Text>
            <AddLibrariesForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation}/>
            <Loading isVisible={isLoading} text={'Cargando...'}/>
            <Toast ref={toastRef}/>
        </View>
    )
}