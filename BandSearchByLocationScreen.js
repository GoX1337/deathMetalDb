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
                countries: [],
                filteredCountries: [],
                countrySelected: false,
                dataSource: [],
                page:1,
                scrolledItem:0,
                nextPageMilestone:60
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
              countries: responseJson,
            }, function() {
              //alert(JSON.stringify(this.state.countries));
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } 

      callBandApi(country) {
        let params = {
          token : this.state.token,
          genre:"death.metal",
          country: country
        }
        let url = this.concatUrlParams("http://vps302763.ovh.net:1337/api/bands", params);
    
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
              page:1
            }, function() {
              //alert(JSON.stringify(this.state.dataSource));
              this.render();
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      callBandNextPageApi(country, page) {
        let params = {
          token : this.state.token,
          genre:"death.metal",
          country: country,
          page: page
        }
        let url = this.concatUrlParams("http://vps302763.ovh.net:1337/api/bands", params);
    
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = this.state.dataSource;
            let itemsList = ds.concat(responseJson.data);
            this.setState({
              isLoading: false,
              isLoadingBands: false,
              dataSource: itemsList
            }, function() {
              this.render();
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
        this.setState(
          {
            text: '',
            page:1,
            scrolledItem:0,
            nextPageMilestone:60,
            dataSource:[]
          }
        )
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
        let regex = new RegExp(["^",".*", text,".*", "$"].join(""), "i");
        this.setState({text});
        this.state.filteredCountries = [];
        this.state.countrySelected = false;
        this.state.isLoading = true;
        this.setState({isLoading: true});
        let itemsProcessed = 0;
        this.setState(
          {
          page:1,
          scrolledItem:0,
          nextPageMilestone:60
        });

        this.state.countries.forEach((c)=>{
          itemsProcessed++;
          if(c.match(regex))
            this.state.filteredCountries.push(c);
          if(itemsProcessed === this.state.countries.length){
            this.setState({isLoading: false});
         }           
        });
      }
    
      itemClickCountry = (country)=>{
        this.setState({text: country, countrySelected:true, isLoading: true});
        this.callBandApi(country);
      }

      itemClickBand = (band)=>{
        this.props.navigation.navigate('BandDetails', { 'band': band });
      }

      setCurrentReadOffset = (event) => {
        let itemHeight = 44;
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentItemIndex = Math.ceil(currentOffset / itemHeight);

        this.state.scrolledItem = currentItemIndex;

        if(this.state.scrolledItem > this.state.nextPageMilestone){
          this.state.scrolledItem = 0;
          this.state.nextPageMilestone += 60;
          this.callBandNextPageApi(this.state.text, ++this.state.page);
          //alert("page " +this.state.page);
        }
      }
      
      render() {
        return(
          <Container>
            <Item>
                <Foundation style={styles.iconMagniGlass} name="magnifying-glass" size={25} />
                <TextInput style={styles.input} 
                            onChangeText={(text) => this.onChangeText(text)} 
                            value={this.state.text} 
                            placeholder="Country..." 
                            autoCorrect={false}
                            underlineColorAndroid="transparent" 
                            keyboardType={"web-search"}
                            inlineImageLeft='magnifying-glass'
                            returnKeyLabel={"search"}/>
                {this.resetButtonRender()}
             </Item>

             {  this.state.isLoading &&
              <View style={{flex: 1, paddingTop: 100}}>
                <ActivityIndicator />
              </View>
             }

            { !this.state.isLoading &&
              !this.state.countrySelected &&
              <List dataArray={this.state.filteredCountries}
                      renderRow={(rowData) =>
                        <ListItem icon button onPress={() => this.itemClickCountry(rowData)}>
                          <Body>
                            <Text >{rowData}</Text>
                          </Body>
                          <Right>
                            <Entypo style={styles.rightChevron} name="chevron-small-right" size={25} />
                          </Right>
                        </ListItem>
                      }>
              </List>
            }

            { 
              !this.state.isLoading &&
              this.state.countrySelected &&
              <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
                <List dataArray={this.state.dataSource}
                        renderRow={(rowData) =>
                          <ListItem icon button onPress={() => this.itemClickBand(rowData)}>
                            <Body>
                              <Text >{rowData.name} ({rowData.country})</Text>
                            </Body>
                            <Right>
                              <Entypo style={styles.rightChevron}  name="chevron-small-right" size={25} />
                            </Right>
                          </ListItem>
                        }>
                </List>
              </Content>
            }
          </Container>
        );
      }
    };

    export default BandSearchScreen;