import React from 'react';
import { StyleSheet,Text, View, TextInput, ScrollView, ListView, ActivityIndicator } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Item, Input, List, ListItem, Thumbnail} from 'native-base';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '', isLoading: true};
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function() {
          alert(JSON.stringify(this.state.dataSource));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  resetButton(){
    if (this.state.text != "") {
      return (
        <Button onPress={()=> this.setState({text: ''})} title="" transparent >
          <Entypo name="circle-with-cross" size={25} />
        </Button>
      );
    } else {
      return null;
    }
  }

  onChangeText = (text)=>{
    this.setState({text});
    
  }

  itemClick = ()=>{
    //alert('click');
  }
  
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container>
        <Header/>
        <Content>
            <Item>
              <Foundation style={styles.iconMagniGlass} name="magnifying-glass" size={25} />
              <TextInput style={styles.input} 
                          onChangeText={(text) => this.onChangeText(text)} 
                          value={this.state.text} 
                          placeholder="Band name, country, city..." 
                          autoCorrect={false}
                          underlineColorAndroid="transparent" 
                          keyboardType={"web-search"}
                          inlineImageLeft='magnifying-glass'
                          returnKeyLabel={"search"}/>
              {this.resetButton()}
           </Item>
    
           <List dataArray={this.state.dataSource}
                  renderRow={(rowData) =>
                    <ListItem button onPress={() => this.itemClick() } >
                      <Text>{rowData.title}, {rowData.releaseYear}</Text>
                      <Entypo iconRight style={styles.rightChevron} name="chevron-small-right" size={25} />
                    </ListItem>
                  }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom : 15,
    marginTop : 10,
    textAlign : 'center'
  },
  input: {
    height: 45, 
    width: 270,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18,
    borderWidth: 0
  },
  iconMagniGlass: {
    marginLeft: 6,
    marginRight: 6,
    color : 'gray'
  },
  rightChevron: {
    color : 'gray'
  },
});
