import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text} from 'react-native'
import {Icon} from 'react-native-elements'
import Loading from '../../components/Loading'

export default function AddRLibrariesForm(props){
    const {toastRef} = props

}

const menuOptions = generateOptions(selectedComponent)

function generateOptions(selectedComponent) {
    return [
        {
            title:'Nombre del Restaurante',
            iconNameLeft: "person-add-alt",
            
        },
        {
            title: 'Direccion',
            iconNameLeft: "mark-email-read",
            
        },
        { 
            title: 'Descripcion',
            iconNameLeft: "lock",
            
        }
    ]
}
