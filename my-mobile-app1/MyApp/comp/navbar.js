import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DataForm from './data'; // Adjust path based on your file structure
//import Login from './components/login';
//import CurrentLocationSearchMap from './all1';
//import GeoLocationMap from './find';
//import Profile from './components/profile';
//import Logout from './components/logout';
import EwasteOverviewContent from './econv'; // Updated import

const Tab = createBottomTabNavigator();
 //<Tab.Screen name="Login" component={Login} />
   //   <Tab.Screen name="Search" component={CurrentLocationSearchMap} options={{ title: 'Search Items' }} />
     // <Tab.Screen name="Collections" component={GeoLocationMap} options={{ title: 'Current Collections' }} />
      //<Tab.Screen name="Profile" component={Profile} />
      //<Tab.Screen name="Logout" component={Logout} />
function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
         if (route.name === 'DataForm') {
            iconName = 'stats-chart'; // Kept same icon as Stats
          } else if (route.name === 'Login') {
            iconName = 'log-in';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Collections') {
            iconName = 'location';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Logout') {
            iconName = 'log-out';
          } else if (route.name === 'Overview') {
            iconName = 'information-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#D1D5DB',
        tabBarStyle: {
          backgroundColor: '#16A34A', // Green color to mimic web gradient
          borderTopColor: '#15803D',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#16A34A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="DataForm" component={DataForm} options={{ title: 'Statistics' }} />
     
      <Tab.Screen name="Overview" component={EwasteOverviewContent} options={{ title: 'E-Waste Overview' }} />
    </Tab.Navigator>
  );
}

export default NavBar;