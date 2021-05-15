import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements' 
import { Icon } from 'react-native-elements/dist/icons/Icon'
//import Modal from '../Modal'

export default function AccountOptions(props) {
    const {userInfo, toastRef} = props
    const selectedComponent = (key) =>{
        console.log('click')
        console.log(key)
    }
    
    const menuOptions = generateOptions(selectedComponent)
    

    return(
        <View>
            {
              menuOptions.map((menu, index) =>(
                  <ListItem key={index} bottomDivider onPress={menu.onPress}>
                      <Icon name = {menu.iconNameLeft}/>
                      <ListItem.Content>
                          <ListItem.Title>{menu.title}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron/>
                  </ListItem>
              ))
            }
        </View>
    )
}


function generateOptions(selectedComponent) {
    return [
        {
            title:'Cambiar Nombre y Apellidos',
            iconNameLeft: "person-add-alt",
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Cambiar Email',
            iconNameLeft: "mark-email-read",
            onPress: () => selectedComponent('displayEmail')
        },
        { 
            title: 'Cambiar Contraseña',
            iconNameLeft: "lock",
            onPress: () => selectedComponent('displayPassword')
        }
    ]
}

const styles = StyleSheet.create({
  
})

