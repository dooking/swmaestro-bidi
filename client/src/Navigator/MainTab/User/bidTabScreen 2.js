import * as React from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

import CheckingMatchingScreen from '../../../Screen/02_SecondTab/User/checkingMatchingScreen';

import UpdateProposalScreen from '../../../Screen/02_SecondTab/User/waitMatching/updateProposalScreen';
import UpdateAfterImageScreen from '../../../Screen/02_SecondTab/User/waitMatching/updateAfterImageScreen';
import UpdateFromAlbumScreen from '../../../Screen/02_SecondTab/User/waitMatching/updateAfterImage/updateFromAlbumScreen';
import UpdateFromBidiScreen from '../../../Screen/02_SecondTab/User/waitMatching/updateAfterImage/updateFromBidiScreen';
import UpdateFromScrapScreen from '../../../Screen/02_SecondTab/User/waitMatching/updateAfterImage/updateFromScrapScreen';

const bidStack = createStackNavigator();

function BidStackScreen() {
  return (
    <Stack.Navigator>
      <bidStack.Screen name="check" component={CheckingMatchingScreen} options={CommonHeader} />
      <bidStack.Screen
        name="UpdateProposal"
        component={UpdateProposalScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateAfterImage"
        component={UpdateAfterImageScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromAlbum"
        component={UpdateFromAlbumScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromScrap"
        component={UpdateFromScrapScreen}
        options={CommonHeader}
      />
      <bidStack.Screen
        name="UpdateFromBidi"
        component={UpdateFromBidiScreen}
        options={CommonHeader}
      />
    </Stack.Navigator>
  );
}

export default BidStackScreen;
