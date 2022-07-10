import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TabsBar from "../../TabsBar/tabsBar";
import TopBar from "../../TopBar/topBar";

export default function HomeScreen(){
    return(
        <View style={styles.body}>
            <TopBar />
            <TabsBar />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        
    }
})