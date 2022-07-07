import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"




export default function TopBar() {
    const navigation = useNavigation()
    return(
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfilScreen")}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>Xs</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        position:"relative",
        height:100,
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
    },
    avatarText:{
        color:"white",
        fontSize:20
    }

})