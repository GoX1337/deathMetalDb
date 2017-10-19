import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'native-base';
import BandSearchScreen from './BandSearchScreen';
import BandDetailsScreen from './BandDetailsScreen';

const App = StackNavigator({
  BandSearch: {
    screen: BandSearchScreen,
  },
  BandDetails: {
    path: 'band/:name',
    screen: BandDetailsScreen
  } 
});

export default App;