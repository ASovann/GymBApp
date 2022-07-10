import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfilFormulaire(){
    const navigation = useNavigation()


    return(
        <View style={styles.body}>
            <Text>Form profil</Text>
            <Button title="Save" onPress={() => {navigation.navigate("ProfilScreen")}}/>
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