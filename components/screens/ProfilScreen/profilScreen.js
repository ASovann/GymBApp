import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, Image } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";
import { faArrowLeft, faImages, faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from '@react-navigation/native';


const db = SQLite.openDatabase('gymbDB');

export default function ProfilScreen(){
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState();
    const [telephone, setTelephone] = useState('');
    const [level, setLevel] = useState(0);
    const [descriptionProfil, setDescriptionProfil] = useState('');
    const [imageProfil, setImageProfil] = useState();
    const [localization, setLocalization] = useState();
    const isFocused = useIsFocused()

    const readData = db.transaction((tx) => {
        tx.executeSql('SELECT * FROM user', [],
            (tx, result) => {
                console.log("result select profil screen: ",result),
                setUsername(result.rows._array[0].username ? result.rows._array[0].username : "No username"),
                setMail(result.rows._array[0].mail ? result.rows._array[0].mail : "No email"),
                setTelephone(result.rows._array[0].telephone ? result.rows._array[0].telephone : "No phone number"),
                setLevel(result.rows._array[0].level ? result.rows._array[0].level : 1),
                setDescriptionProfil(result.rows._array[0].descriptionProfil ? result.rows._array[0].descriptionProfil : "No description"),
                setImageProfil(result.rows._array[0].imageProfil ? result.rows._array[0].imageProfil : null);
                setLocalization(result.rows._array[0].localization ? result.rows._array[0].localization : "No localization")
            },
            (tx, error) => console.log("error select profil screen: ", error)
        )
    })

    const disconnectUser = () => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM user", [],
                (tx, result) => {console.log("result truncate table user: ", result), navigation.navigate("HomeScreen")},
                (tx, error) => console.log("error truncate table user: ", error)
            )
        })
        db.transaction((tx) => {
            tx.executeSql("UPDATE sqlite_sequence SET seq=0 WHERE name='user'", [],
                (tx, result) => console.log("result Update autoincrement: ", result),
                (tx, error) => console.log("error updat auto increment: ", error)
            )
        })
    }

    const ImageOrTextProfil = () => {
        if(imageProfil != null){
            return(
                <Image source={imageProfil}></Image>
            )
        }
        else {
            const shortUsername = username.slice(0,2).toUpperCase()
            return(
                <Text style={styles.profilText}>{shortUsername}</Text>
            )
        }
    }

    const DisplayLevel = () => {
        switch (level) {
            case 1:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="staro" size={30} color='gold' />
                            <Icon name="staro" size={30} color='gold' />
                        </View>
                        <View style={{top:20}}>
                            <Text style={{ color: 'goldenrod' }}>Beginner</Text>
                        </View>
                    </View>
                );
                break;
            case 2:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="staro" size={30} color='gold' />
                        </View>
                        <View style={{top:20}}>
                            <Text style={{ color: 'goldenrod' }}>Intermediate</Text>
                        </View>
                    </View>
                );
                break;
            case 3:
                return(
                    <View style={{display: "flex", justifyContent:"space-around"}}>
                        <View style={styles.containerStarsLevel}>
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="star" size={30} color='gold' />
                        </View>
                        <View style={{top:20}}>
                            <Text style={{ color: 'goldenrod' }}>Expert</Text>
                        </View>
                    </View>
                );
            break;
        
            default:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Icon name="star" size={30} color='gold' />
                            <Icon name="staro" size={30} color='gold' />
                            <Icon name="staro" size={30} color='gold' />
                        </View>
                        <View style={{top:20}}>
                            <Text style={{ color: 'goldenrod' }}>Beginner</Text>
                        </View>
                    </View>
                );
                break;
        }
    }

    useEffect(()=> {
        readData
    }, [isFocused])

    return(
        <View style={styles.body}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {navigation.navigate("HomeScreen")}}>
                    
                    <FontAwesomeIcon icon={faArrowLeft} size={28} />
                    
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Profil</Text>
                <TouchableOpacity style={styles.headerSubscribe} onPress={() => navigation.navigate("SubscriptionScreen")}>
                    
                    <Text style={{ right:5 }}>Subscribe</Text>
                    <FontAwesomeIcon icon={faGem} size={20} color="dodgerblue"/>
                </TouchableOpacity>
                
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.containerLevel}>
                    <Text>LEVEL</Text>
                    <DisplayLevel />
                    
                </View>
                <View style={styles.profilCircle}>
                    <View style={styles.profilTextContainer}>
                        <ImageOrTextProfil />
                    </View>
                    
                    
                </View>
                <View style={styles.infoContainer}>
                    <Text>{mail}</Text>
                    <Text>{username}</Text>
                    <Text>{telephone}</Text>
                    
                    <Text>{descriptionProfil}</Text>
                    <Text>{localization}</Text>
                </View>
                
                <View style={styles.modifyProfilContainer}>
                    <Button title="Modify Profil" onPress={() => {navigation.navigate("ProfilForm")}}></Button>
                </View>
                <View></View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Disconnect Account" onPress={() => disconnectUser()} style={styles.disconnectButton}></Button>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        display:"flex",
    },
    headerBar:{
        height:100,
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:15,
    },
    iconContainer:{
        height:30,
        top:50,
        left:10,
    },
    containerLevel:{
        justifyContent:"center",
        alignItems:"center"
    },
    containerStarsLevel:{
        flexDirection:"row",
        top:10
    },
    headerTitle: {
        top:51,
        left:30
    },
    headerSubscribe:{
        top:51,
        flexDirection:"row",
        right:5
    },
    bodyContainer:{
        height: Dimensions.get("window").height - 110,
        justifyContent:"center",
        alignItems:"center",
        justifyContent:"space-around"
    },
    profilCircle: {
        borderRadius:50,
        width:150,
        height:150,
        backgroundColor:"aquamarine",
        alignItems:"center",
        justifyContent:"center",
        elevation:3
    },
    profilTextContainer:{
    },
    profilText:{
        color:"white",
        fontSize:75
    },
    infoContainer: {
        margin:10,
        justifyContent:"center",
        alignItems:"center",
        justifyContent:"space-around"
    },
    modifyProfilContainer: {
        margin:5,
    },
    buttonContainer:{
        marginLeft:50,
        marginRight:50,
        marginBottom:30
    },
    disconnectButton: {
    }
})