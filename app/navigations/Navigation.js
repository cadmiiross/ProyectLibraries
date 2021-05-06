import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'


import LibrariesStack from './LibrariesStack'
import FavoritesStack from './FavoritesStack'
import TopLibrariesStack from './TopLibrariesStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='libraries'
                tabBarOptions={{
                    inactiveTintColor: '#6E2C00',
                    activeTintColor: '#D358F7'
                }} 
                screenOptions={({ route }) => ({
                    tabBarIcon:({ color }) => screenOptions(route, color)
                })} 
            >
                <Tab.Screen 
                name= 'libraries' 
                component={LibrariesStack}
                options={{title:'Librerias'}}
                />
                <Tab.Screen 
                name= 'favorites' 
                component={FavoritesStack}
                options={{title:'Favoritos'}}
                />
                <Tab.Screen 
                name= 'top-libraries' 
                component={TopLibrariesStack}
                options={{title:'Top Librerias'}}
                />
                <Tab.Screen 
                name= 'search' 
                component={SearchStack}
                options={{title:'Buscar'}}
                />
                <Tab.Screen 
                name= 'account' 
                component={AccountStack}
                options={{title:'Cuenta'}}
                />
            </Tab.Navigator>
        </NavigationContainer>     
    )
}

function screenOptions(route, color){
    let IconName

    switch(route.name){
        case 'libraries':
            IconName='book-open-outline'
            break
        case 'favorites':
            IconName='heart-outline'
            break
        case 'top-libraries':
            IconName='star-outline'
            break
        case 'search':
            IconName='magnify'
            break
        case 'account':
            IconName='account-circle'
            break
    }
    return(
        <Icon type= 'material-community' name={IconName} size={22} color={color}/>
    )
}

