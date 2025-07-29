import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import InsuranceCardScreen from '../screens/InsuranceCardScreen';
import ClaimsListScreen from '../screens/ClaimsListScreen';
import ClaimDetailsScreen from '../screens/ClaimDetailsScreen';
import ProviderFinderScreen from '../screens/ProviderFinderScreen';
import CameraScreen from '../screens/CameraScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ClaimsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ClaimsList" 
        component={ClaimsListScreen}
        options={{ title: 'Claims' }}
      />
      <Stack.Screen 
        name="ClaimDetails" 
        component={ClaimDetailsScreen}
        options={{ title: 'Claim Details' }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Insurance Card') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Claims') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Providers') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.lightGray,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Insurance Card" component={InsuranceCardScreen} />
      <Tab.Screen name="Claims" component={ClaimsStack} />
      <Tab.Screen name="Providers" component={ProviderFinderScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
