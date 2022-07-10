import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';
//api
import { GymBrosList } from "../../databaseApi/gymBroList";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from '@react-navigation/native';
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const db = SQLite.openDatabase('gymbDB');

export default function BroFinderScreen(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [liked, setLiked] = useState([]);
    const [saveToDbGymBro, setSaveToDbGymBro] = useState([])
    const mapRef = useRef(null);
    
    //appel api
    const markerList = GymBrosList;
    
    const isFocused = useIsFocused();
    
    
    const MapDisplay = () => {
        mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }, 3 * 1000)
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          
        })();
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM liked', [], 
                (tx, results) => {console.log("result select table liked: ",results), setLiked(results.rows._array)},
                (tx, error) => console.log("error select table gymBro: ", error)
            )
        })
        
    }, [saveToDbGymBro, isFocused]);
    
    let text = 'Waiting..';
    if (errorMsg) {
    text = errorMsg;
    } else if (location) {
    text = JSON.stringify(location);
    }

    const DisplayLike = (id, gymBro) => {
        console.log(gymBro)
        if(liked.length > 0) {
            let likes = liked.find(likes => likes.like === 1 && likes.id === id)
            if (likes != undefined) {
                return true
            } else {
                
                return false
            }
        } else {
            return false
        }
        
    }

   
    const onLike = (gymBros, id) => {
        console.log("liked: ", liked)
        if(liked.length > 0){
            let likes  = liked.find(likes => likes.id === id)
            if (likes != undefined) {
                if (likes.like === 1) {
                    db.transaction((tx) => {
                        tx.executeSql("DELETE FROM liked WHERE id = ?", [id],
                            (tx, results) => setSaveToDbGymBro(results.rows._array),
                            (tx, error) => console.log("error update liked to false: ", error)
                        )
                    })
                    console.log(false)
                } else {
                    db.transaction((tx) => {
                        tx.executeSql("UPDATE liked SET like = ? WHERE id = ?", [true, id],
                            (tx, results) => setSaveToDbGymBro(results.rows._array),
                            (tx, error) => console.log("error update liked to true: ", error)
                        )
                    })
                    console.log(true)
                }
            } else {
                db.transaction((tx) => {
                    tx.executeSql("INSERT INTO liked (id, name, like, commentaires, coordinate, description, image, level, messages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, gymBros.title, true, gymBros.commentaires, gymBros.coordinate.latitude.toString() + ',' +  gymBros.coordinate.longitude.toString(), gymBros.description, gymBros.imageProfil, gymBros.level, "null"],
                        (tx, results) => setSaveToDbGymBro(results.rows._array),
                        (tx, error) => console.log("error insert into liked true value: ", error)
                    )
                })
                console.log(true)
            }
            
        } else {
            console.log(true)
            db.transaction((tx) => {
                tx.executeSql("INSERT INTO liked (id, name, like, commentaires, coordinate, description, image, level, messages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, gymBros.title, true, gymBros.commentaires, gymBros.coordinate.latitude.toString() + '-' +  gymBros.coordinate.longitude.toString(), gymBros.description, gymBros.imageProfil, gymBros.level, "null"],
                    (tx, results) => setSaveToDbGymBro(results.rows._array),
                    (tx, error) => console.log("error insert into liked true value: ", error)
                )
            })
        }
    }

    const DisplayLevel = ({level}) => {
        switch (level) {
            case 1:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Text style={styles.gymBroLevel}>Beginner</Text>
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="staro" size={15} color='gold' />
                            <IconAntDesign name="staro" size={15} color='gold' />
                        </View>
                    </View>
                );
                break;
            case 2:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Text style={styles.gymBroLevel}>Intermediate</Text>
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="staro" size={15} color='gold' />
                        </View>
                    </View>
                );
                break;
            case 3:
                return(
                    <View style={{display: "flex", justifyContent:"space-around"}}>
                        <View style={styles.containerStarsLevel}>
                            <Text style={styles.gymBroLevel}>Expert</Text>
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="star" size={15} color='gold' />
                            
                        </View>
                        
                    </View>
                );
            break;
        
            default:
                return(
                    <View style={{display: "flex", justifyContent:"space-around", alignItems:"center"}}>
                        <View style={styles.containerStarsLevel}>
                            <Text style={styles.gymBroLevel}>Beginner</Text>
                            <IconAntDesign name="star" size={15} color='gold' />
                            <IconAntDesign name="staro" size={15} color='gold' />
                            <IconAntDesign name="staro" size={15} color='gold' />
                            
                        </View>
                    </View>
                );
                break;
        }
    }



    return(
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.scrollWiew}>
                <MapView
                    ref={mapRef}
                    style={styles.map} S
                    initialRegion={{
                        latitude: 48.879562,
                        longitude: 2.415106,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    { markerList.map((marker, index) => (
                        <Marker
                            key={index} 
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={ "level: "+ marker.level.toString() }
                    />))}
                </MapView>
                <View style={styles.ListGymBroContainer}>
                        {markerList.map((gymBro, index) =>
                            <View key={index} style={styles.lisGymBroContainer}>
                                <View style={styles.gymBroContainer}>
                                    <View style={styles.broImageContainer}>
                                        <Image style={styles.broImage} source={{uri: gymBro.imageProfil}} />
                                    </View>

                                    <View style={styles.gymBro}>
                                        <View style={styles.gymBroHeader}>
                                            <Text style={{fontWeight:"500", fontSize:20}}>{gymBro.title}</Text>
                                            <View style={{flexDirection:"row"}}>
                                                <DisplayLevel level={gymBro.level}/>
                                            </View>
                                            
                                        </View>
                                        
                                        <View style={styles.gymBroDescriptionContainer}>
                                            <Text style={styles.gymBroDescription}>
                                                {gymBro.description}
                                            </Text>
                                        </View>
                                        <View style={styles.gymBroFooter}>
                                            <TouchableOpacity onPress={() => {onLike(gymBro, index)}}>
                                                {DisplayLike(index, gymBro) ? <Icon name="heart" size={25} color="red" style={{elevation:2}}/> : <Icon name="heart-o" size={25} color="grey" style={{elevation:2}}/>}
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <FontAwesomeIcon icon={faComments}  color="lightblue" size={25}/>
                                            </TouchableOpacity>
                                        </View>
                                        
                                        
                                    </View>

                                </View>
                                
                            </View>
                        )}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        display: "flex",
        borderWidth:0,
    },
    scrollWiew:{
        
    },
    containerStarsLevel:{
        flexDirection:"row",
        alignItems:"center"
    },
    map: {
        width: Dimensions.get('window').width,
        height: 400,
    },
    ListGymBroContainer:{
        width: Dimensions.get('window').width,
        paddingBottom:30,
    },
    lisGymBroContainer: {
        width: Dimensions.get('window').width,
        flexDirection:"column",
        marginTop:30
    },
    gymBroContainer: {
        flexDirection:"row",
        margin:5,
    },
    broImageContainer: {
        width:100,
        borderWidth:0,
        marginRight:10
    },
    broImage:{
        width:100,
        height:150,
        resizeMode:"contain",
        borderRadius:10
    },
    gymBro: {
        flexDirection:"column",
        height:150,
        justifyContent:"center",
        justifyContent:"space-between",
        
        borderWidth:0,
        
    },
    gymBroHeader: {
        flexDirection:"row",
        justifyContent:"space-between"
    },
    gymBroLevel: {
        marginRight:10,
        color:"goldenrod",
    },
    gymBroDescriptionContainer:{
        flexDirection:"row",
        borderWidth:0,
        width:255,
    },
    gymBroDescription: {
        flex:1,
        flexWrap:"wrap",
        borderWidth:0,
    },
    gymBroFooter: {
        borderWidth:0,
        height:30,
        flexDirection:"row-reverse",
        justifyContent:"space-around"
    }

})