import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function BroFinderScreen(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const markerList = [
        {
            coordinate:{latitude:48.883617,longitude:2.418186},
            title:"coach 1"
        },
        {
            coordinate:{latitude:48.882954,longitude:2.420128},
            title:"coach 2"
        },
        {
            coordinate:{latitude:48.884061,longitude:2.413519},
            title:"coach 3"
        },
        {
            coordinate:{latitude:48.87520, longitude:2.407720},
            title: "gym bro 1"
        }
    ]
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
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }

      console.log(location)
    return(
        <View style={styles.body}>
            
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                { markerList.map((marker, index) => (
                    <Marker
                        key={index} 
                        coordinate={marker.coordinate}
                        title={marker.title}
                />))}
            </MapView> 

        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    map: {
        width: Dimensions.get('window').width,
        height: 500,
    },
})