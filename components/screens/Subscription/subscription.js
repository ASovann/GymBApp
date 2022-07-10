import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SubscriptionScreen(){
    const navigation = useNavigation()


    return(
        <View style={styles.body}>
            <Text>MONEY MONEY MONEY</Text>
            <Button title="Pay" onPress={() => {navigation.navigate("ProfilScreen")}}/>
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