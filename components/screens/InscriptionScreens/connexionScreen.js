import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase('gymbDB')

export default function ConnexionScreen(){
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.body}>
            <Text>Connexion</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})