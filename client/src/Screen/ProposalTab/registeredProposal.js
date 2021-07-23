import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';

function ProposalRegisteredScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState('');
  const getUserInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/user/${user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((result) => {
      setUserInfo(result.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(async () => {
    const user = await BidiStorage.getData(STORAGE_KEY);
    getUserInfo(user);
  }, []);


  const designerHandler = async (e) => {
    navigation.navigate('MainTab', { screen: 'Search'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../public/img/proposal_registered.png')}
          />
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}><Text style={styles.boldTitle}>제안서 등록이 완료</Text>되었습니다</Text>
        <Text style={styles.title}><Text style={styles.boldTitle}></Text>조금만 기다려주세요!</Text>
        <View style={styles.description}>
          <Text style={styles.text}>곧 헤어디자이너가</Text>
          <Text style={styles.text}>{userInfo.name}님께 비드를 보낼꺼에요</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={designerHandler}>
        <Text style={styles.buttonText}>디자이너 둘러보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
      width:'100%',
      height:'50%',
  },
  imageContainer: {
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '100%',
    height:'100%',
  },
  image: {
    width: '85%',
    height:'100%',
  },
  header: {
    width:'100%',
    height: '27%',
    padding: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    marginBottom: 6
  },
  boldTitle: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 10,
    height: '15%'
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 3
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 46,
    borderRadius: 3,
    backgroundColor: "tomato"
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white'
  }
});


export default ProposalRegisteredScreen;