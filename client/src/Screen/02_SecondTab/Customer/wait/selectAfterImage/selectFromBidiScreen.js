import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Components
import Ionicons from 'react-native-vector-icons/Ionicons';
import { STYLE_INFO } from '../../../../../Lib/constant';

function SelectFromBidiScreen({ navigation, route }) {
  const { setAfterImageStyle, isUpdate } = route.params;
  const { data: user } = useSelector((state) => state.user);
  const [afterStyle, setAfterStyle] = useState('none');
  const [tab, setTab] = useState('tab1');
  const [index, setIndex] = useState(1);

  const goBack = async () => {
    navigation.goBack();
  };
  const submit = async () => {
    setAfterImageStyle(`https://bidi-s3.s3.ap-northeast-2.amazonaws.com/demo/result${index}.jpeg`);
    if (isUpdate) navigation.navigate('UpdateProposal');
    else navigation.navigate('CreateProposal');
  };
  const selectStyle = (style, index) => {
    setAfterStyle(style);
    setIndex(index);
  };
  const tabHandler = (tab) => {
    const nextTab = tab;
    setTab(nextTab);
  };
  const list = STYLE_INFO[user.gender_type].map(({ id, styleName, index }) => (
    <TouchableOpacity
      key={id}
      activeOpacity={0.8}
      onPress={() => selectStyle(id, index)}
      style={styles.styleBox}>
      <Text style={afterStyle == id ? styles.styleTitleSelected : styles.styleTitle}>
        {styleName}
      </Text>
      <Image
        style={afterStyle == id ? { ...styles.styleImage, opacity: 0.9 } : styles.styleImage}
        source={{
          uri: `https://bidi-s3.s3.ap-northeast-2.amazonaws.com/demo/reference${index}.png`,
        }}
      />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.selectBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Ionicons name="close-outline" size={40} />
        </TouchableOpacity>
        <Text style={styles.header}>AFTER</Text>
      </View>
      <View style={styles.content}>
        {afterStyle == 'none' ? (
          <Image
            style={styles.image}
            source={{
              uri: user.img_src,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: `https://bidi-s3.s3.ap-northeast-2.amazonaws.com/demo/result${index}.jpeg`,
            }}
          />
        )}
      </View>
      <View>
        <ScrollView>
          {/* <View style={styles.headerContainer}>
            <View style={[styles.tab, tab == 'tab1' && styles.active]}>
              <TouchableOpacity onPress={() => tabHandler('tab1')}>
                <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>???</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.tab, tab == 'tab2' && styles.active]}>
              <TouchableOpacity onPress={() => tabHandler('tab2')}>
                <Text style={[styles.headerTitle, tab == 'tab2' && styles.active]}>?????????</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.tab, tab == 'tab3' && styles.active]}>
              <TouchableOpacity onPress={() => tabHandler('tab3')}>
                <Text style={[styles.headerTitle, tab == 'tab3' && styles.active]}>
                  {user.gender_type == 'male' ? '?????????' : '??????'}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.tabLine}></View>
        </ScrollView>
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.styleView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => selectStyle('none')}
            style={styles.styleBox}>
            <Text style={afterStyle == 'none' ? styles.styleTitleSelected : styles.styleTitle}>
              ????????????
            </Text>
            <Image
              style={
                afterStyle == 'none' ? { ...styles.styleImage, opacity: 0.9 } : styles.styleImage
              }
              source={{
                uri: user.img_src,
              }}
            />
          </TouchableOpacity>
          {list}
        </ScrollView>
      </View>
      <View style={styles.backButtonBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={submit}>
          <Text style={styles.backButton}>????????????</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  content: {
    width: '100%',
    height: '59%',
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
  },
  tabLine: {
    // borderBottomWidth: 1,
    // borderColor: '#e2e2e2',
  },
  headerTitle: {
    fontSize: 15,
  },
  tab: {
    marginLeft: 20,
    marginRight: 20,
  },
  active: {
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderColor: 'black',
    paddingBottom: 5,
  },
  styleView: {
    padding: 10,
    marginTop: 10,
  },
  styleBox: {
    alignItems: 'center',
    width: 113,
    height: 120,
  },
  styleTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey',
  },
  styleTitleSelected: {
    fontSize: 16,
    fontWeight: '600',
  },
  styleImage: {
    width: 100,
    height: 100,
    backgroundColor: 'grey',
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgb(243,243,243)',
    opacity: 0.6,
  },
  headerContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
  },
  backButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(11,14,43)',
  },
  backButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
  },
});

export default SelectFromBidiScreen;
