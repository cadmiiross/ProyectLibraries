import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Libraries from '../screens/Libraries/Libraries'
import AddLibraries from '../screens/Libraries/AddLibraries'

const Stack = createStackNavigator()

export default function LibrariesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                 name='libraries'
                 component={Libraries}
                 options= {{ title:'Librerias'}}
            />
             <Stack.Screen
                 name='addlibraries'
                 component={AddLibraries}
                 options= {{ title:'Añade Librerias'}}
            />
        </Stack.Navigator>
    )
}