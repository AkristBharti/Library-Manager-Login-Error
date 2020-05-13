import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import db from '../config.js';


export default class Searchscreen extends React.Component {

  constructor(){
    super();
    this.state = {
      search : '',
      allTransactions : [],
      lastVisibleTransaction: null,
    }
  }
  componentDidMount = async()=>{
    const Transaction = await db.collection("transactions").limit(5).get();
    Transaction.docs.map((doc)=>{this.setState({
      allTransactions: [...this.allTransactions, doc.data()],
      lastVisibleTransaction : doc,        
    })})
  }

  fetchMoreTransaction = async()=>{
    var enterText = text.split("");
    var text = this.state.search.toUpperCase()
    if(enterText[0].toUpperCase() === 'B'){
      const Transaction = await db.collection("transactions").where('bookId', '==', text).get();
      Transaction.docs.map((doc)=>{this.setState({
        allTransactions: [...this.allTransactions, doc.data()],
        lastVisibleTransaction : doc,
      })})
    }
    if(enterText[0].toUpperCase() === 'S'){
      const Transaction = await db.collection("transactions").where('studentId', '==', text).get();
      Transaction.docs.map((doc)=>{this.setState({
        allTransactions: [...this.allTransactions, doc.data()],
        lastVisibleTransaction : doc,
      })})
    }
  }

  searchTransaction = async(text)=>{
    var enterText = text.split("");
    var text = text.toUpperCase()
    if(enterText[0].toUpperCase() === 'B'){
      const Transaction = await db.collection("transactions").where('bookId', '==', text).get();
      Transaction.docs.map((doc)=>{this.setState({
        allTransactions: [...this.allTransactions, doc.data()],
        lastVisibleTransaction : doc,
      })})
    }
    if(enterText[0].toUpperCase() === 'S'){
      const Transaction = await db.collection("transactions").where('studentId', '==', text).get();
      Transaction.docs.map((doc)=>{this.setState({
        allTransactions: [...this.allTransactions, doc.data()],
        lastVisibleTransaction : doc,
      })})
    }
    
  }

    render() {
      return (
        <View style={styles.container}>
        <View>
          <TextInput style = {styles.searchBar} placeholder="Enter Book/Student ID"
          onChangeText= {(text)=>{this.setState({search:text})}}
          />
          <TouchableOpacity style = {styles.searchButton} onPress = {()=>{this.searchTransaction(this.state.search)}}>
            <Text>Go</Text>
          </TouchableOpacity>

        </View>

          <FlatList
          data ={this.state.allTransactions}
          renderItem = {({item})=>(
            <View>
              <Text>{"BookId : " + item.bookId}</Text>
              <Text>{"StudentId : " + item.studentId}</Text>
              <Text>{"Transaction Type : " + item.transactionType}</Text>
              <Text>{"Date : " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor = {(item,index)=>index.toString()}
          onEndReached = {this.fetchMoreTransaction}
          onEndReachedThreshold = {0.7}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:100,
    },
    searchBar:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
      
    },
    searchButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0,
      alignItems: 'center',justifyContent: 'center'
    },
  });