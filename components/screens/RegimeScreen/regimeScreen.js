import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RegimeScreen(){
    return(
        <View style={styles.body}>
            <Text>Regime</Text>
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