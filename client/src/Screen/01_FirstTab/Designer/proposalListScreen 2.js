import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import CardInfo from '../../../Components/Card/cardInfo';
import CardChangeStyle from '../../../Components/Card/cardChangeStyle';
import ProposalDetailScreen from './proposalDetailScreen';

function ProposalListScreen({ navigation }) {
  const [infoLists, setInfo] = useState([]);

  const getDesignerInfo = () => {
    fetch('http://127.0.0.1:3000' + '/api/proposal/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setInfo(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      await getDesignerInfo();
    }
    fetchMode();
  }, []);

  if (infoLists == []) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {infoLists.map((info, index) => (
        <Swiper
          key={index}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          horizontal={false}>
          <View style={styles.container}>
            <View style={{ height: '60%' }}>
              <CardChangeStyle
                before_src={info.before_src}
                after_src={info.after_src}
                isUser={false}
                height={400}
              />
            </View>
            <CardInfo
              info={info}
              navigation={navigation}
              height={150}
              tagBackgroundColor="#E1ECFF"
              tagColor="#323274"
            />
            <TouchableOpacity
              style={styles.bidiBtn}
              onPress={() =>
                navigation.navigate('ProposalDetail', {
                  info: infoLists[index],
                  userId: info.user_id,
                  proposalId: info.id,
                })
              }>
              <Icon name="pencil" size={25} style={styles.bidiIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <ProposalDetailScreen
              navigation={navigation}
              props={{ info, userId: info.user_id, proposalId: info.id }}
            />
          </View>
        </Swiper>
      ))}
    </Swiper>
  );
}
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    position: 'relative',
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
  bidiBtn: {
    position: 'absolute',
    backgroundColor: '#0A0A32',
    width: 60,
    height: 60,
    right: 0,
    top: '52%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidiIcon: {
    color: 'white',
  },
});

export default ProposalListScreen;
