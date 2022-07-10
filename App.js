import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from './components/Router/router';

import store from './components/store/store';

import { Provider } from "react-redux";


import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('gymbDB')

const Stack = createNativeStackNavigator()


export default function App() {
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, telephone TEXT, mail TEXT)',[],
          (tx, result) => console.log("result create table user: ",result),
          (tx, error) => console.log("error create table user: ", error)
        ),
        tx.executeSql('CREATE TABLE IF NOT EXISTS liked (id INTEGER PRIMARY KEY, name TEXT, like BOOLEAN, commentaires TEXT, coordinate TEXT, description TEXT, image TEXT, level INTEGER, messages TEXT)', [],
          (tx, result) => console.log("result create table gymBro: ",result),
          (tx, error) => console.log("error create table gymbro: ", error)
        )
    })

  return (
    <Provider store={store} >
        <NavigationContainer>
          <Router />
        </NavigationContainer>
    </Provider>
  );
}
