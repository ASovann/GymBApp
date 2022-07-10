import React from "react";
import { SafeAreaView } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import BroFinderScreen from "../screens/BroFinderScreen/broFinderScreen";
import BroListScreen from "../screens/BroListScreen/broListScreen";
import CoachFinderScreen from "../screens/CoachFinderScreen/coachFinderScreen";
import PlannerScreen from "../screens/PlannerScreen/plannerScreen";
import RegimeScreen from "../screens/RegimeScreen/regimeScreen";
import ProfilScreen from "../screens/ProfilScreen/profilScreen";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { faUtensils } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Tab = createMaterialBottomTabNavigator()

export default function TabsBar(){
    return(
        <Tab.Navigator
            initialRouteName="Bro Finder"
            activeColor="#009dff"
            barStyle={{ backgroundColor: '#fff' }}
            screenOptions={{  headerShown: false }}
        >
            <Tab.Screen
                name="Accueil"
                component={BroFinderScreen}
                options={{
                    tabBarLabel:'Accueil',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faHouse} color={color} size={26} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="My Bro List"
                component={BroListScreen}
                options={{
                    tabBarLabel:'My bros',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faComment} color={color} size={26} />
                    )
                }}>
            </Tab.Screen>
            <Tab.Screen
                name="Coach Finder"
                component={CoachFinderScreen}
                options={{
                    tabBarLabel:'Coach Finder',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faPersonWalking} color={color} size={26} />
                    )
                }}>

            </Tab.Screen>
            <Tab.Screen
                name="Planner"
                component={PlannerScreen}
                options={{
                    tabBarLabel:'Your Planner',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faCalendarDays} color={color} size={26} />
                    )
                }}>

            </Tab.Screen>
            <Tab.Screen
                name="Your Regime"
                component={RegimeScreen}
                options={{
                    tabBarLabel:'Your Regime',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUtensils} color={color} size={26} />
                    )
                }}>

            </Tab.Screen>
            
        </Tab.Navigator>
    );
}