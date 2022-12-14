import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BidTabScreen from './Designer/bidTabScreen';
import SearchTabScreen from './Designer/searchTabScreen';
import BrandingTabScreen from './Designer/brandingTabScreen';
import HistoryTabScreen from './Designer/historyTabScreen';
import MyPageTabScreen from './User/myPageTabScreen';

const Tab = createBottomTabNavigator();

function DesignerTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Bid') {
            iconName = 'document-text-outline';
          } else if (route.name === 'Branding') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'History') {
            iconName = 'md-timer-outline';
          } else if (route.name === 'Mypage') {
            iconName = 'md-person-circle-outline';
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF533A',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: 'white',
          height: 70,
          borderTopWidth: 0.2,
          borderTopColor: 'gray',
        },
      }}>
      <Tab.Screen
        name="Search"
        component={SearchTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen name="Bid" component={BidTabScreen} options={{ headerShown: false, title: '' }} />
      <Tab.Screen
        name="Branding"
        component={BrandingTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="History"
        component={HistoryTabScreen}
        options={{ headerShown: false, title: '' }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyPageTabScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Tab.Navigator>
  );
}

export default DesignerTabStack;
