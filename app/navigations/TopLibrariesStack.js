import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopLibraries from  '../screens/TopLibraries'

const Stack = createStackNavigator()

export default function TopLibrariesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                 name='toplibraries'
                 component={TopLibraries}
                 options= {{ title:'Top Librerias'}}
            />
        </Stack.Navigator>
    )
}