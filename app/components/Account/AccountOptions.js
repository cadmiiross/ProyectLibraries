import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements' 
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

export default function AccountOptions(props) {
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key) =>{
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayname={userInfo.displayname}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo = {setReloadUserInfo}  
                    />
                )
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo = {setReloadUserInfo}  
                    />
                )
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(
                    <ChangePasswordForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo = {setReloadUserInfo}  
                    />
                )
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
        }
    }
    
    const menuOptions = generateOptions(selectedComponent)
    

    return(
        <View>
            {menuOptions.map((menu, index) =>(
                  <ListItem key={index} bottomDivider onPress={menu.onPress}>
                      <Icon name = {menu.iconNameLeft}/>
                      <ListItem.Content>
                          <ListItem.Title>{menu.title}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron/>
                  </ListItem>
              ))}
              {renderComponent && (
              <Modal isVisible={showModal} setIsVisible={setShowModal}>
                  {renderComponent}
              </Modal>
              )}
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
            title: 'Cambiar Contrase??a',
            iconNameLeft: "lock",
            onPress: () => selectedComponent('displayPassword')
        }
    ]
}

const styles = StyleSheet.create({})

