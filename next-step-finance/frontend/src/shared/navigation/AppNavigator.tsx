import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import HomeScreen from '../../features/home/screens/HomeScreen';
import AddMemberScreen from '../../features/members/screens/AddMemberScreen';
import OutstandingPaymentsScreen from '../../features/members/screens/OutstandingPaymentsScreen';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import SupportScreen from '../../features/support/SupportScreen'; // Add support

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Auth" component={LoginScreen} options={{ tabBarButton: () => null }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" size={20} /> }} />
        <Tab.Screen name="Members" component={AddMemberScreen} options={{ tabBarIcon: () => <Icon name="group" size={20} /> }} />
        <Tab.Screen name="Outstanding" component={OutstandingPaymentsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: () => <Icon name="settings" size={20} /> }} />
        <Tab.Screen name="Support" component={SupportScreen} options={{ tabBarIcon: () => <Icon name="support" size={20} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}