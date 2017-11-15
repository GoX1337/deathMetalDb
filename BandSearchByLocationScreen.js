import React from 'react';
import { Text, View, TextInput, ScrollView, ListView } from 'react-native';
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

      getCountries(){
        let params = {
          token : this.state.token,
          genre:"death.metal"
        }
        let url = this.concatUrlParams("http://vps302763.ovh.net:1337/api/countries", params);
    
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              countries: responseJson ,
            }, function() {
              //alert(JSON.stringify(this.state.countries));
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } 
    
      componentDidMount() {
        this.getToken(()=>{
          this.getCountries();
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
        return(
        <Container>
        <Item>
          <Text >Soon...</Text>
          </Item>       
      </Container>);
      }
    };

    export default BandSearchScreen;