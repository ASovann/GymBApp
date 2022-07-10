import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';


const db = SQLite.openDatabase('gymbDB')

export default function BroListScreen(){
    const isFocused = useIsFocused()
    const [likedList, setLikedList] = useState([])

    const emptyGymBroList = () => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM liked', [],
                (tx, results) => console.log("result delete from liked: ", results),
                (tx, error) => console.log("error delete from liked: ", error)
            )
        })
        setLikedList([])
    }

    const readDataListBroLiked = () =>{
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM liked', [],
                (tx, results) => setLikedList(results.rows._array),
                (tx, error) => console.log("error select from liked: ", error)
            )
        })
    }

    const BroList = () => {
        console.log("liked list: ", likedList)
        if(likedList.length > 0) {
            return (
                <>
                {
                    likedList.map((liked) => 
                        
                        <View key={liked.id} style={styles.broContainer}>
                            <View style={styles.broImageContainer}>
                                <Image source={{uri: liked.image}} style={styles.broImage}/>
                            </View>
                            <View style={styles.broInfoContainer}>
                                <View style={styles.broInfoHeader}>
                                    <Text style={{fontSize:20}}>{liked.name}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                </>
            )
        } else {
            return (
                <View style={styles.noListContainer}>
                    
                    <Text style={styles.noListText}>Like some bros to begin !</Text>
                </View>
            )
            
        }
       
        
    }

    useEffect(() => {
        readDataListBroLiked()
    }, [isFocused])

    return(
        <View style={styles.body}>
            <View style={styles.emptyListButtonContainer}>
                <TouchableOpacity onPress={() => emptyGymBroList()}>
                    <View style={styles.emptyListButton}>
                        <FontAwesomeIcon icon={faTrashCan} size={30} color="deepskyblue"/> 
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.broListContainer}>
                    <BroList />
                </View>
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noListContainer: {
        justifyContent:"center",
        alignItems:"center"
    },
    noListText: {
        fontSize:30
    },
    emptyListButtonContainer: {
        borderWidth: 1,
        flexDirection: "row-reverse",
        marginTop:15
    },
    emptyListButton: {
        borderWidth: 1,
        borderColor:"red",
        width:30,
        flexDirection:"row",
        alignItems:"center",
        marginRight:25
    },
    broListContainer: {
        borderWidth: 1,
        marginBottom: 30,
    },
    broContainer: {
        flexDirection: "row",
        height: 150,
        borderWidth: 1,
        borderColor: "red",
        marginTop:30,
    },
    broImageContainer: {
        height: 150,
        width: 100,
        borderWidth: 1,
        borderColor: "blue",
        

    },
    broImage:{
        height: 150,
        width: 100,
        borderRadius:10,
        resizeMode:"contain",
    },
    broInfoContainer: {
        flexDirection:"column"
    },
    broInfoHeader: {
        height:30,
        width: Dimensions.get("window").width - 100,
        borderWidth: 1,
        borderColor:"orange",

    }
})