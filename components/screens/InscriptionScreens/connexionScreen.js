import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConnexionScreen(){
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