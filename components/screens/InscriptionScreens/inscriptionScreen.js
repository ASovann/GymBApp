import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../slice/userSlice";

const db = SQLite.openDatabase('gymbDB')

export default function InscriptionScreen(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mail, setMail] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user.user)

    const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validRegexTelephone = /^[0-9]/

    const saveUser = async() => {
        if(username.length == 0 || password.length == 0 || mail.length == 0 || telephone.length == 0){
            Alert.alert('Please fill all fields')
        } else if(!mail.valueOf().match(validRegexEmail)){
            Alert.alert('Email invalid')
        } else if (telephone.length != 10 || !telephone.valueOf().match(validRegexTelephone)) {
            Alert.alert('telephone invalid')
        } else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql("INSERT INTO user (username, password, telephone, mail) VALUES (?, ?, ?, ?)",
                        [username, password, telephone, mail],
                        (tx, results) => {
                            console.log("saved user to database: ", results)
                        },
                        (tx, error) => console.log("error insert into: ", error)
                    );
                })
            } catch (error) {
                console.log(error)
            }
            navigation.navigate("connexion")
        }
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
            <Button title="Sign in" onPress={() => saveUser()} />
            <TouchableOpacity onPress={() => navigation.navigate("connexion")}>
                <Text>log in</Text>
            </TouchableOpacity>
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