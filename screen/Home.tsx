﻿import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import GGLogoutbutton from '../src/components/Login/GoogleLogout';
import { onAuthStateChanged } from "firebase/auth";
import auth from '@react-native-firebase/auth';
import {useUserAuth} from '../context/userContext'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth as a } from '../config/Firebaseconfig';
const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const {user} = useUserAuth();
  const navigation = useNavigation();
  const handleLogout = async() => {
    try {
      await auth().signOut();
      await signOut(a);
      console.log('User has been signed out');
      navigation.navigate("Signin")
    } catch (error) {
      console.log(error);
      navigation.navigate("Signin")
    }
  }
  // Handle user state changes
  useEffect(() => {

    console.log(JSON.stringify(user).length);
    if (JSON.stringify(user).length == 2) {
      navigation.navigate("Signin")
    }
}, [user]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user &&<Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000' }}>HomePage </Text>}
      {user &&<Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000' }}>Email : {user.email} </Text>}
      {user &&<Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000' }}>uid : {user.uid} </Text>}
      {user &&<Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000' }}>uid : {user.email} </Text>}
      {user &&<Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000' }}>photoURL : {user.photoURL} </Text>}
      <TouchableOpacity style={style.container} onPress={()=>handleLogout()}>
      <Text>Log out</Text>
    </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
export default Home;
