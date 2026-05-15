import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';

import Rotina from "../screens/Rotina";
import Grafico from "../screens/Grafico";

import { Entypo, Feather, Octicons } from '@expo/vector-icons';

// Criação do navegador de abas
const Tab = createBottomTabNavigator();

// Componente de rotas (navegação)
export default function Tabs() {
    return (
        
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#13456d',
                tabBarInactiveTintColor: 'gray',
            }}
        >

            <Tab.Screen name="Rotina" component={Rotina} 
            options={{
                tabBarIcon: ({size, color}) => (
                    <Entypo name="calendar" size={size} color={color} />
                )
            }}/>

            <Tab.Screen name="Grafico" component={Grafico}
             options={{
                tabBarIcon: ({size, color}) => (
                    <Entypo name="bar-graph" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    );
}
