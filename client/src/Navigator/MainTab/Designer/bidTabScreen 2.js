import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import DetailBidScreen from '../../../Screen/02_SecondTab/Designer/detailBidScreen';
import BidMainScreen from '../../../Screen/02_SecondTab/Designer/bidMainScreen';

import BackBtn from '../../../Components/HeaderBar/backBtn';
const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen
        name="BidMain"
        component={BidMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <bidStack.Screen
        name="DetailBid"
        component={DetailBidScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
