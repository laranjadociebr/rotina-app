import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Rotina from "../screens/Rotina";
import Grafico from "../screens/Grafico";

import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();


// TAB BAR CUSTOMIZADA
function CustomTabBar({ state, descriptors, navigation }) {

  // largura da tab bar
  const [layoutWidth, setLayoutWidth] = useState(0);

  // largura de cada tab
  const tabWidth = layoutWidth / state.routes.length;

  // animação
  const translateX = useRef(new Animated.Value(0)).current;


  // animação ao trocar de aba
  useEffect(() => {

    if (layoutWidth === 0) return;

    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,

      // suavidade
      speed: 15,
      bounciness: 0,

    }).start();

  }, [state.index, tabWidth]);


  // evita bug no primeiro render
  if (layoutWidth === 0) {
    return (
      <View
        onLayout={(e) => {
          setLayoutWidth(e.nativeEvent.layout.width);
        }}
        style={{
          height: 70,
          backgroundColor: "#fff",
        }}
      />
    );
  }

  return (
    <View
      onLayout={(e) => {
        setLayoutWidth(e.nativeEvent.layout.width);
      }}

      style={{
        flexDirection: "row",
        height: 70,
        backgroundColor: "#fff",
        position: "relative",
        borderTopWidth: 0,
        elevation: 10,
      }}
    >

      {/* LINHA ANIMADA */}
      <Animated.View
  style={{
    position: "absolute",
    top: 0,

    width: tabWidth,
    height: 4,

    backgroundColor: "#13456d",
    borderRadius: 999,

    transform: [{ translateX }],
  }}
/>

      {/* BOTÕES */}
      {state.routes.map((route, index) => {

        const focused = state.index === index;

        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.8}
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
            }}
          >

            {/* ÍCONE */}
            {options.tabBarIcon({
              color: focused ? "#13456d" : "gray",
              size: 24,
            })}


            {/* TEXTO */}
            <Text
              style={{
                color: focused ? "#13456d" : "gray",
                marginTop: 4,
                fontSize: 12,
                fontWeight: focused ? "600" : "400",
              }}
            >
              {route.name}
            </Text>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// COMPONENTE PRINCIPAL
export default function Tabs() {

  return (
    <Tab.Navigator

      // TAB CUSTOMIZADA
      tabBar={(props) => <CustomTabBar {...props} />}

      screenOptions={{
        headerShown: false,
      }}
    >

      {/* ROTINA */}
      <Tab.Screen
        name="Rotina"
        component={Rotina}

        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="calendar" size={size} color={color}
            />
          ),
        }}
      />


      {/* GRAFICO */}
      <Tab.Screen
        name="Gráfico"
        component={Grafico}

        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="bar-graph"size={size} color={color}/>
          ),
        }}
      />

    </Tab.Navigator>
  );
}