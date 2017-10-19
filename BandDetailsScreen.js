import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Item, Input, List, ListItem, Thumbnail} from 'native-base';
import styles from './Styles';

class BandDetailsScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.band.name}`,
        modal: true,
        headerTitleStyle : {
            textAlign: 'center'
        },
        headerStyle: {
            height: 85
        }
    });

    constructor(props) {
        super(props);
        const b = this.props.navigation.state.params.band;
        const labels = this.buildLabels();
        this.state = { 
            band: b,
            bandInfo : this.buildBandInfo(b, labels)
        };
    }

    buildLabels(){
        let labels = {};
        labels["trans"] = {
            "active":"Status",
            "yearActive":"Year active",
            "genre":"Genre",
            "country":"Country",
            "location":"Location",
            "formedIn":"Formation date",
            "lyricsTheme":"Lyrics theme"
        };     
        labels["order"] = ["genre", "active","country","location","formedIn","yearActive","lyricsTheme"];
        return labels;
    }

    buildBandInfo(band, labels){
        let data = [];
        labels.order.forEach((key)=>{
            let row = {};
            row.label = labels.trans[key];
            row.val = band[key];
            data.push(row);
        });
        return data;
    }

    render(){
        return (
            <Container>
                <Content>
                    <Image resizeMode={'contain'} style={{width: 250, height: 150}} source={{uri: this.state.band.logo}}/>
                    <List dataArray={this.state.bandInfo}
                        renderRow={(rowData) =>
                        <ListItem>
                            <Left><Text>{rowData.label}</Text></Left>
                            <Body>
                            <Text>{rowData.val}</Text>
                            </Body>
                        </ListItem>
                        }>
                    </List>
                    <Image resizeMode={'contain'} style={{width: 300, height:200}} source={{uri: this.state.band.photo}}/>
                </Content>
            </Container>
        );
    }
};

export default BandDetailsScreen;