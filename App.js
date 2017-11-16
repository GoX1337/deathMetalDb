import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Button } from 'native-base';
import BandSearchByNameScreen from './BandSearchByNameScreen';
import BandSearchByLocationScreen from './BandSearchByLocationScreen';
import BandDetailsScreen from './BandDetailsScreen';

const TabNav = TabNavigator(
  {
    NameTab: {
      screen: BandSearchByNameScreen,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Name',
      }
    },
    LocationTab: {
      screen: BandSearchByLocationScreen,
      path: '/countrySearch',
      navigationOptions: {
        tabBarLabel: 'Country',
      },
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        backgroundColor: 'black',
      },
      indicatorStyle: {
        borderBottomColor: 'red',
        borderBottomWidth: 3
      }
    }
  }
);

const App = StackNavigator({
  Root: {
    screen: TabNav,
  },
  BandDetails: {
    path: 'band/:name',
    screen: BandDetailsScreen
  } 
});


export default App;