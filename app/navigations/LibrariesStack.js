import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Libraries from '../screens/Libraries'

const Stack = createStackNavigator()

export default function LibrariesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                 name='libraries'
                 component={Libraries}
                 options= {{ title:'Librerias'}}
            />
        </Stack.Navigator>
    )
}