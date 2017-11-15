import React from 'react';
import { Text, View, TextInput, ScrollView, ListView, ActivityIndicator } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Item, Input, List, ListItem} from 'native-base';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Styles';

class BandSearchScreen extends React.Component {
    
        static navigationOptions = ({ navigation }) => ({
            headerStyle: {
                height: 0
            }
        });

        constructor(props) {
            super(props);
            this.state = { 
                text: '', 
                isLoading: true,
                dataSource: []
            };
       }
    
      concatUrlParams(url, params){
        let qs = "";
        let first = true;
        Object.keys(params).forEach((p)=>{
          if(first){
            qs += "?";
            first = false;
          } else {
            qs += "&";
          }
          qs += p + "=" + params[p];
        });
        return url + qs;
      }
    
      callBandApi(bandName) {
        let params = {
          token : this.state.token,
          genre:"death.metal",
          name: bandName
        }
        let url = this.concatUrlParams("http://vps302763.ovh.net:1337/api/bands", params);
    
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
            }, function() {
              //alert(JSON.stringify(this.state.dataSource));
              this.render();
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      getToken(callback){
        let headers = {'Accept': 'application/json','Content-Type': 'application/json'};
        return fetch("http://vps302763.ovh.net:1337/api/token", { method: "POST", headers: headers,body: JSON.stringify({ "password":"topkek"})})
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            token: responseJson.token,
          }, function() {
              //alert(JSON.stringify(this.state.token));
              callback();
          });
        })
        .catch((error) => {
          console.error(error);
          alert("ERR " + JSON.stringify(error));
        });
      }

      componentDidMount() {
        this.getToken(()=>{
          //alert(JSON.stringify(this.state.token));
        });
      }
    
      resetInput(){
        this.setState({text: ''})
      }
    
      resetButtonRender(){
        if (this.state.text != "") {
          return (
            <Button onPress={()=>this.resetInput()} title="" transparent >
              <Entypo name="circle-with-cross" size={25} />
            </Button>
          );
        } else {
          return null;
        }
      }
    
      onChangeText = (text)=>{
        this.setState({text});
        this.callBandApi(text);
      }
    
      itemClick = (band)=>{
        this.props.navigation.navigate('BandDetails', { 'band': band });
      }
      
      render() {
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 100}}>
              <ActivityIndicator />
            </View>
          );
        }

        return (
        <Container>
            <Item>
                <Foundation style={styles.iconMagniGlass} name="magnifying-glass" size={25} />
                <TextInput style={styles.input} 
                            onChangeText={(text) => this.onChangeText(text)} 
                            value={this.state.text} 
                            placeholder="Band name..." 
                            autoCorrect={false}
                            underlineColorAndroid="transparent" 
                            keyboardType={"web-search"}
                            inlineImageLeft='magnifying-glass'
                            returnKeyLabel={"search"}/>
                {this.resetButtonRender()}
             </Item>

             <List dataArray={this.state.dataSource}
                    renderRow={(rowData) =>
                      <ListItem icon button onPress={() => this.itemClick(rowData)}>
                        <Body>
                          <Text >{rowData.name} ({rowData.country})</Text>
                        </Body>
                        <Right>
                          <Entypo style={styles.rightChevron}  name="chevron-small-right" size={25} />
                        </Right>
                      </ListItem>
                    }>
            </List>
        </Container>
        );
      }
    };

    export default BandSearchScreen;