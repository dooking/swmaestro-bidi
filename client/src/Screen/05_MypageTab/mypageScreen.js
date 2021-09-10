import React, { useState, useEffect, createRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BidiStorage from '../../Lib/storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../../Components/Common/loading';

import { getScheduleInfoByDesignerId } from '../../Contexts/Designer/ScheduleInfo/action';

function MypageScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: scheduleInfo, loading, error } = useSelector((state) => state.scheduleInfo);
  const [isEdit, setEdit] = useState(false);
  const [userNickName, setUserNickName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [inference, setInference] = useState(false);
  const nickNameInputRef = createRef();
  const addressInputRef = createRef();
  const inferenceAI = () => {
    fetch('http://127.0.0.1:3000' + '/api/user/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: user.id,
        gender: user.gender,
        img_src: user.img_src,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { status, message } = res;
        if (status == 200) {
          setTimeout(() => {
            Alert.alert('이미 AI를 이용가능합니다!');
          }, 2000);
        } else {
          Alert.alert('등록완료되었습니다!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setInference(true);
    alert(
      // (이거 전역적으로 막아야함, 유저에 상태 추가되어야 할듯?)'
      'bidi ai가 준비 완료되면 알림으로 알려드릴게요!' + '(이용까지는 3분 정도 소요됩니다!)',
    );
  };

  const logoutHandler = () => {
    BidiStorage.clearData().then(() => {
      navigation.replace('Landing');
    });
  };
  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {});
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScheduleInfoByDesignerId(user.id));
  }, [dispatch]);
  if (loading || error || !scheduleInfo) return <Loading />;
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
        <Button title="logout handler" onPress={logoutHandler} />
      </View>
    );
  }
  console.log(scheduleInfo);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.formArea}>
        <View style={styles.headerContainer}>
          <View style={styles.imageArea}>
            {user.img_src ? (
              <Image source={{ uri: user.img_src }} style={styles.profile} />
            ) : (
              <Image source={require('../../../public/img/profile.png')} style={styles.profile} />
            )}
            <TouchableOpacity style={styles.cameraIconArea} onPress={handleChoosePhoto}>
              <Icon name="camerao" size={25} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightContainer}>
            <View style={styles.nameContainer}>
              <View style={styles.nameArea}>
                <Text style={styles.nameText}>{user.name}</Text>
              </View>
              <TouchableOpacity style={styles.editBtn} onPress={() => setEdit(!isEdit)}>
                <Text style={styles.editBtnText}>프로필 수정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.countConatiner}>
              <View style={styles.countArea}>
                <Text style={styles.countText}>15</Text>
                <Text style={styles.countTitleText}>제안서</Text>
              </View>
              <View style={styles.countArea}>
                <Text style={styles.countText}>12</Text>
                <Text style={styles.countTitleText}>매칭내역</Text>
              </View>
              <View style={{ ...styles.countArea, borderRightWidth: 0 }}>
                <Text style={styles.countText}>15</Text>
                <Text style={styles.countTitleText}>스크랩북</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.inputcontainer}>
          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>Bidi-Ai</Text>
            <View style={styles.selectArea}>
              <TouchableOpacity
                style={[styles.selectBox, user.ai_status == 'wait' && styles.active]}
                disabled={user.ai_status == 'wait' ? false : true}
                onPress={inferenceAI}>
                <Text style={[styles.selectText, user.ai_status == 'wait' && styles.active]}>
                  {user.ai_status == 'wait' ? '사용하기' : '사용중'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isEdit ? (
            <View style={styles.inputForm}>
              <Text style={styles.inputLabel}>닉네임</Text>
              <TextInput
                style={styles.inputArea}
                placeholder={user.nick_name}
                placeholderTextColor="gray"
                onChangeText={(input) => setUserNickName(input)}
                ref={nickNameInputRef}
                returnKeyType="next"
              />
            </View>
          ) : (
            <View style={styles.inputForm}>
              <Text style={styles.inputLabel}>닉네임</Text>
              <View style={styles.inputArea}>
                <Text style={{ color: '#878787' }}>{user.nick_name}</Text>
              </View>
            </View>
          )}

          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>이름</Text>
            <View style={styles.inputArea}>
              <Text style={{ color: '#878787' }}>{user.name}</Text>
            </View>
          </View>
          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>성별</Text>
            <View style={styles.selectArea}>
              <TouchableOpacity style={[styles.selectBox, user.gender == '여성' && styles.active]}>
                <Text style={[styles.selectText, user.gender == '여성' && styles.active]}>
                  여성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.selectBox, user.gender == '남성' && styles.active]}>
                <Text style={[styles.selectText, user.gender == '남성' && styles.active]}>
                  남성
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>생년월일</Text>
            <View style={styles.inputArea}>
              <Text style={{ color: '#878787' }}>{user.birth}</Text>
            </View>
          </View>
          {isEdit ? (
            <View style={styles.inputForm}>
              <Text style={styles.inputLabel}>선호 지역</Text>
              <TextInput
                style={styles.inputArea}
                placeholder={user.address}
                placeholderTextColor="gray"
                onChangeText={(input) => setUserAddress(input)}
                ref={addressInputRef}
                returnKeyType="next"
              />
            </View>
          ) : (
            <View style={styles.inputForm}>
              <Text style={styles.inputLabel}>선호 지역</Text>
              <View style={styles.inputArea}>
                <Text style={{ color: '#878787' }}>{user.address}</Text>
              </View>
            </View>
          )}

          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>이메일</Text>
            <View style={styles.inputArea}>
              <Text style={{ color: '#878787' }}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.inputForm}>
            <Text style={styles.inputLabel}>핸드폰 번호</Text>
            <View style={styles.inputArea}>
              <Text style={{ color: '#878787' }}>{user.phone_number}</Text>
            </View>
          </View>
        </View>
        {isEdit && (
          <TouchableOpacity style={styles.editSubmitBtn}>
            <Text style={styles.editSubmitText}>수정 완료</Text>
          </TouchableOpacity>
        )}
        <View style={{ marginBottom: 300 }}>
          <Button title="logout handler" onPress={logoutHandler} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  countConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRightContainer: {
    width: wp(55),
    marginLeft: 20,
  },
  inputcontainer: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  flex: {
    flexDirection: 'row',
  },
  countArea: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderColor: '#ECEBEB',
  },
  topArea: {
    paddingTop: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextArea: {
    justifyContent: 'center',
  },
  Text: {
    fontSize: wp(4),
  },
  formArea: {
    justifyContent: 'center',
    marginBottom: hp(-5),
  },
  imageArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    position: 'relative',
  },
  logo: {
    width: wp(40),
    height: 100,
    resizeMode: 'contain',
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  btnArea: {
    height: 50,
    justifyContent: 'center',
    margin: 40,
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    width: '20%',
    fontWeight: 'bold',
  },
  inputArea: {
    borderWidth: 2,
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderColor: '#fff',
    color: '#878787',
  },
  selectArea: {
    flexDirection: 'row',
  },
  selectBox: {
    borderWidth: 1,
    padding: 7,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#e2e2e2',
  },
  active: {
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'black',
  },
  selectText: {
    color: 'gray',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 5,
    alignItems: 'center',
    width: 100,
  },
  editBtnText: {
    color: 'gray',
  },
  countText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: hp(1),
  },
  countTitleText: {
    fontSize: 13,
    color: 'gray',
  },
  line: {
    borderWidth: 5,
    borderColor: '#e2e2e2',
    marginTop: hp(4),
    marginBottom: hp(4),
  },
  cameraIconArea: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cameraIcon: {
    color: 'white',
    padding: 5,
  },
  editSubmitBtn: {
    backgroundColor: 'black',
  },
  editSubmitText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default MypageScreen;
