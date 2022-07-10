import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('gymbDB');

export default function TopBar() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('');
    const [imageProfil, setImageProfil] = useState();

    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM user', [],
            (tx, result) => {
                setUsername(result.rows._array[0].username ? result.rows._array[0].username : "No username"),
                setImageProfil(result.rows._array[0].imageProfil ? result.rows._array[0].imageProfil : null);
            },
            (tx, error) => {console.log("error select topbar: ", error)}
        )
    })

    const ImageOrTextProfil = () => {
        if(imageProfil != null){
            return(
                <Image source={imageProfil}></Image>
            )
        }
        else {
            const shortUsername = username.slice(0,2).toUpperCase()
            return(
                <Text style={styles.avatarText}>{shortUsername}</Text>
            )
        }
    }

    return(
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfilScreen")}>
                    <View style={styles.avatarContainer}>
                        <ImageOrTextProfil />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        position:"relative",
        height:120,
        width:"100%",
        borderWidth:0,
        display:"flex",
        flexDirection:"row-reverse",
        justifyContent:"space-between",
    },
    avatarContainer:{
        borderWidth: 0,
        borderRadius: 15,
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"aquamarine",
        marginRight: 15,
        marginTop: 50,
        top:20
    },
    avatarText:{
        color:"white",
        fontSize:20
    }

})