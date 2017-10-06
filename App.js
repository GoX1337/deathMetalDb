import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}
                  scrollEnabled={false}>
                  
          <Text style={styles.title} >Search a death metal band</Text>

          <TextInput style={styles.input} 
                            onChangeText={(text) => this.setState({text})} 
                            value={this.state.text} 
                            placeholder="Band name, country, city..." 
                            autoCorrect={false}
                            underlineColorAndroid="transparent" 
                            keyboardType={"web-search"}
                            inlineImageLeft='search_icon'
                            returnKeyLabel={"search"}
                            />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom : 15
  },
  input: {
    height: 40, 
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18
  }
});
