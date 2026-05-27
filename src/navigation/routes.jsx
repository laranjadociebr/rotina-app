import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./tabs";
import ConfigurarRotina from "../screens/ConfigRotina";
import ConfigurarTarefa from "../screens/ConfigTarefa";
import InserirDadosRotina from "../Components/containerConfig/containerRotina";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen 
                name="Tabs" 
                component={Tabs}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="ConfigurarRotina" 
                component={ConfigurarRotina}
            />

            <Stack.Screen 
                name="ConfigurarTarefa" 
                component={ConfigurarTarefa}
            />

            <Stack.Screen 
                name="containerRotina" 
                component={InserirDadosRotina}
            />

        </Stack.Navigator>
    );
}