import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DataForm from './data'; 
import DataSummary from './stats';// Adjust path based on your file structure
//import Login from './components/login'; // Uncommented and included
//import CurrentLocationSearchMap from './all1'; // Uncommented and included
//import GeoLocationMap from './find'; // Uncommented and included
//import Profile from './components/profile'; // Uncommented and included
//import Logout from './components/logout'; // Uncommented and included
import EwasteOverviewContent from './econv'; // Already included

//<Tab.Screen name="Login" component={Login} options={{ title: 'Login' }} />
  //    <Tab.Screen name="Search" component={CurrentLocationSearchMap} options={{ title: 'Search Items' }} />
    //  <Tab.Screen name="Collections" component={GeoLocationMap} options={{ title: 'Current Collections' }} />
      //<Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      //<Tab.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
      //<Tab.Screen name="Overview" component={EwasteOverviewContent} options={{ title: 'E-Waste Overview' }} />
const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'DataForm') {
            iconName = 'stats-chart'; // Matches BarChart
          } else if (route.name === 'DatSummary') {
            iconName = 'log-in'; // Matches LogIn
          } else if (route.name === 'Search') {
            iconName = 'search'; // Matches Search
          } else if (route.name === 'Collections') {
            iconName = 'map-pin'; // Matches MapPin (Ionicons uses map-pin instead of location)
          } else if (route.name === 'Profile') {
            iconName = 'person'; // Matches User
          } else if (route.name === 'Logout') {
            iconName = 'log-out'; // Matches LogOut
          } else if (route.name === 'Overview') {
            iconName = 'information-circle'; // Matches EwasteOverviewContent
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF', // White for active items, matching nav.jsx
        tabBarInactiveTintColor: '#D1D5DB', // Light gray for inactive items, matching nav.jsx
        tabBarStyle: {
          backgroundColor: '#16A34A', // Green to mimic nav.jsx gradient
          borderTopColor: '#15803D', // Darker green for border
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          shadowColor: '#000', // Shadow to mimic shadow-lg
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#16A34A', // Green header to match nav.jsx
        },
        headerTintColor: '#FFFFFF', // White header text
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitle: 'EcoCollect', // Brand name from nav.jsx
      })}
    >
         <Tab.Screen name="Overview" component={EwasteOverviewContent} options={{ title: 'E-Waste Overview' }} />
      <Tab.Screen name="DataForm" component={DataForm} options={{ title: 'Statistics' }} />
      <Tab.Screen name="DataSummary" component={DataSummary} options={{ title: 'Login' }} />
     
    </Tab.Navigator>
  );
}

export default NavBar;