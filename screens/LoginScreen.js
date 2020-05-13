import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            passwordId: '',
            emailId : '',
        }
    }

    login = async(email,password)=>{
        if(email && password){
            try{
                const check = await db.auth().signInWithEmailAndPassword(email,password);
                if(check){
                    this.props.navigation.navigate('Transaction');
                }
            }
            catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                        Alert.alert('Incorrect Email or Password!')
                        break;
                
                    case 'auth/invalid-email':
                        Alert.alert('Invalid Email!')
                        break;
                }
            }
        }
        else{
            Alert.alert('Enter Email & Password');
        }

    }

    render(){
        return(

            <KeyboardAvoidingView style ={styles.avoider}>
                <View>

                    <Image source = {require("../assets/booklogo.jpg")} style = {{width:200, height:200}}/>
                    <TextInput style = {styles.inputBox} placeholder = "Username@email.com" keyboardType = 'email-address' onChangeText = {(text)=>{this.setState({emailId : text})}}/>
                    <TextInput style = {styles.inputBox} placeholder = "Password" secureTextEntry = {true} onChangeText = {(text)=>{this.setState({passwordId : text})}}/>
                </View>
                <View>

                    <TouchableOpacity style = {styles.goButton} onPress = {()=>{this.login(this.state.emailId, this.state.passwordId)}}>
                        <Text>Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:250,
    },
    avoider:{
        alignItems: 'center',
        marginTop: 100,  
    },
    goButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      height : 30,
      borderWidth: 1.5,
      borderLeftWidth: 0,
      alignItems: 'center',justifyContent: 'center',
    }
});