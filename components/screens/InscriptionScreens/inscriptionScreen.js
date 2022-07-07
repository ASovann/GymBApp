import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase('db.testDb')
//

export default function InscriptionScreen(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mail, setMail] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const navigation = useNavigation()
    
    /*db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS connected (isConnected BOOL)'
        )
    })*/
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, telephone, TEXT, mail, TEXT)')
    })

    /*const insertFalse = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO connected (isConnected) values (?)', [false],
                (txObj, resultSet) => {setIsConnected(false) , console.log("requete successful 1")},
                (txObj,error) => console.log('Error', error)
            )
        })
    }
    const insertTrue = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE connected SET isConnected = ?', [true],
                (txObj, resultSet) => {setIsConnected(true), console.log("requete successful 2", resultSet)},
                (txObj,error) => console.log('Error', error)
            )
        })
    }*/
    
    function IsConnected(username, password, telephone, email){
        db.transaction(tx => {
            tx.executeSql('INSERT INTO user (username, password, telephone, mail) values (?, ?, ?, ?)', [username, password, telephone, email],
                (txObj, error) => console.log("Error", error)
            )
        })
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM user', null,
            (txObj, resultSet) => console.log(resultSet)
            )
        })
        

    }
    

    return(
        <View style={styles.body}>
            <TextInput
                placeholder="Pseudo"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput 
                placeholder="Telephone"
                value={telephone}
                onChangeText={setTelephone}
            />
            <TextInput 
                placeholder="Mail"
                value={mail}
                onChangeText={setMail}
            />
            <Button title="Sign in" onPress={() => {IsConnected(username, password, telephone, mail), navigation.navigate("connexion") }} />
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