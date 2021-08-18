import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HistroyListScreen from './histroyListScreen';
import NoHistoryListScreen from './noHistoryListScreen';
import ReviewListScreen from './reviewListScreen';
import NoReviewListScreen from './noReviewListScreen';

import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

const Tab = createMaterialTopTabNavigator();

function HistoryMainScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [matchingHistoryList, setMatchingHistoryList] = useState([]);

  const getMatchingHistoryList = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/matchingHistory/designer/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.data) {
          await setMatchingHistoryList(result.data.matchingHistoryList);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
      getMatchingHistoryList(user);
    }
    fetchMode();
  }, []);

  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="MyScrap"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#DADADA',
        indicatorStyle: {
          backgroundColor: 'black',
        },
        labelStyle: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        tabStyle: {
          height: 50,
          borderColor: 'black',
        },
      }}>
      <Tab.Screen name="MatchingHistory" options={{ title: '매칭내역' }}>
        {() =>
          matchingHistoryList && matchingHistoryList.length > 0 ? (
            <HistroyListScreen matchingHistoryList={matchingHistoryList} navigation={navigation} />
          ) : (
            <NoHistoryListScreen navigation={navigation} />
          )
        }
      </Tab.Screen>
      <Tab.Screen name="Review" options={{ title: `받은 후기 ${matchingHistoryList.length}` }}>
        {() =>
          matchingHistoryList && matchingHistoryList.length > 0 ? (
            <ReviewListScreen matchingHistoryList={matchingHistoryList} navigation={navigation} />
          ) : (
            <NoReviewListScreen navigation={navigation} />
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default HistoryMainScreen;
