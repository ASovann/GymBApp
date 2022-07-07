import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsBar from './components/TabsBar/tabsBar';
import TopBar from './components/TopBar/topBar';
import InscriptionScreen from './components/screens/InscriptionScreens/inscriptionScreen';
import ConnexionScreen from './components/screens/InscriptionScreens/connexionScreen';
import ProfilScreen from './components/screens/ProfilScreen/profilScreen';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.testDb')

const Stack = createNativeStackNavigator()


export default function App() { 
  const [isSignedIn, setIsSignIn] = useState(true)
  useEffect(() => {
    console.log(isSignedIn)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM user', null,
        (txObj,{rows: { _array }}) => {
          if(_array != null){
            setIsSignIn(true)
          }
        }
      )
    })
  },[isSignedIn])
  
  return (
      <NavigationContainer>
        {isSignedIn ? (
          <>
            <TopBar />
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={TabsBar}>
              <Stack.Screen name="TabBar"component={TabsBar}/>
              <Stack.Screen name='ProfilScreen' component={ProfilScreen} />
            </Stack.Navigator>
          </>
        ) : (
          <>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={InscriptionScreen}> 
            <Stack.Screen name='inscription' component={InscriptionScreen}/>
            <Stack.Screen name='connexion' component={ConnexionScreen}/>
          </Stack.Navigator>
          </>
        )}
      
      </NavigationContainer>
  );
}
