import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewRegister from './register';
import Login from './login';
import NavBar from './comp/navbar';
import DataForm from './comp/data';
/*import DataSummary from './stats';
import CurrentLocationSearchMap from './all1';
import GeoLocationMap from './find';
import Logout from './components/logout';
import Profile from './components/profile';
 
        <Stack.Screen name="DataSummary" component={DataSummary} />
        <Stack.Screen name="CurrentLocationSearchMap" component={CurrentLocationSearchMap} />
        <Stack.Screen name="GeoLocationMap" component={GeoLocationMap} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Profile" component={Profile} />*/
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NavBar" component={NavBar} />
     <Stack.Screen name="DataForm" component={DataForm} />
        <Stack.Screen name="Register" component={NewRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;