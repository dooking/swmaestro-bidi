import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import BrandingMainScreen from '../../../Screen/03_ThirdTab/Designer/brandingMainScreen';
import CreateBrandingScreen from '../../../Screen/03_ThirdTab/Designer/createBrandingScreen';
const BrandingStack = createStackNavigator();

function BrandingTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <BrandingStack.Screen
        name="BrandingMain"
        component={BrandingMainScreen}
        options={{ headerShown: false, title: '' }}
      />
      <BrandingStack.Screen
        name="CreateBranding"
        component={CreateBrandingScreen}
        options={{ headerShown: false, title: '' }}
      />
    </Stack.Navigator>
  );
}

export default BrandingTabScreen;
