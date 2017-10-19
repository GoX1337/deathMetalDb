import React from 'react';
import { Container, Content} from 'native-base';
import styles from './Styles';

class BandDetailsScreen extends React.Component {
    
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        modal: true,
        headerTitleStyle : {
            textAlign: 'center'
        },
        headerStyle: {
            backgroundColor:'white',
            height: 85
        }
    });

    render(){
        return (
            <Container></Container>
        );
    }
};

export default BandDetailsScreen;