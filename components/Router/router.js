import { useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/homeScreen';
import ProfilScreen from '../screens/ProfilScreen/profilScreen';
import InscriptionScreen from '../screens/InscriptionScreens/inscriptionScreen';
import ConnexionScreen from '../screens/InscriptionScreens/connexionScreen';
import ProfilFormulaire from '../screens/ProfilScreen/profilFormulaire';
import SubscriptionScreen from '../screens/Subscription/subscription';

import * as SQLite from 'expo-sqlite'

import { useEffect } from 'react';

const db = SQLite.openDatabase('gymbDB')

const Stack = createNativeStackNavigator()

export default function Router() {
    const [isSignedIn, setIsSignIn] = useState(false);
    const isFocused = useIsFocused();
    const GetUser = () => {
        try{
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM user",
                    [],
                    (tx, results) => {
                        console.log("result select user: ", results)
                        const len = results.rows.length;
                        console.log("len: ",len)
                        if(len > 0) {
                            setIsSignIn(true)
                        } else {
                            setIsSignIn(false)
                        }
                        
                    }
                ),
                (tx, error) => console.log("error get user: ", error)
            })
        } catch (error) {
            console.log(error)
        }
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isSignedIn ? (  
                    <>
                        <Stack.Screen name="HomeScreen"component={HomeScreen}/>
                        <Stack.Screen name='ProfilScreen' component={ProfilScreen} />
                        <Stack.Screen name='ProfilForm' component={ProfilFormulaire} />
                        <Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
                    </> 
                ) : (
                    <>
                        <Stack.Screen name='inscription' component={InscriptionScreen}/>
                        <Stack.Screen name='connexion' component={ConnexionScreen}/>
                    </>
                )}
            </Stack.Navigator>
        )
    }

    useEffect(() => {
        GetUser()
    }, [isFocused])

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name= "Router" component={GetUser}/>
        </Stack.Navigator>
    )
}