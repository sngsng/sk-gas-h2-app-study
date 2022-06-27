import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './navigations';
import 'react-native-gesture-handler';

const App: FunctionComponent = function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
