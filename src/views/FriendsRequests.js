import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Text } from 'ui/Text.js';
import { containerStyles } from '@/styles/container.js';
import { AddUserIcon, DeleteUserIcon } from '@/icons';
import socket from '@/socket';

import { Header } from '@/components/Layout/Header.js';
import { HeaderBack } from '@/components/Layout/HeaderBack.js';
import { HeaderTitle } from '@/components/Layout/HeaderTitle.js';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRelations } from '../requests';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export function FriendsRequests({ route }) {
  const { t, i18n } = useTranslation();
  const [subscribers, _setSubscribers] = useState([]);
  const subscribersRef = useRef(subscribers);
  const setSubscribers = (subs) => {
    subscribersRef.current = subs;
    _setSubscribers(subs);
  };
  const [flag, setFlag] = useState(true);
  const username = useRef('');

  useEffect(() => {
    const subscriberss = route.params.params.creature[0];
    console.log(subscriberss, 'subsc');
    subscriberss.length &&
      subscriberss.map((el) => {
        if (el instanceof Array) {
          _setSubscribers((subscribers) => [...subscribers, el[0]]);
        } else {
          _setSubscribers((subscribers) => [...subscribers, el]);
        }
      });
    return () => {
      setSubscribers([]);
    };
  }, [route]);
  console.log(subscribersRef.current, 'joopa');
  useEffect(() => {
    socket.listenSocket(async (label, data) => {
      if (label === 'add_friends') {
        console.log(subscribersRef.current);
        const index = subscribersRef.current.findIndex(
          (el) => el.name === username.current
        );
        console.log(index, 'index suka');
        route.params.params.creature[1]([
          ...route.params.params.creature[2],
          subscribersRef.current[index],
        ]);
        subscribersRef.current.splice(index, 1);
        setSubscribers([...subscribersRef.current]);
        route.params.params.creature[3](subscribersRef.current);
        setFlag(!flag);
      }
    });
  }, []);

  const addToFriends = async (userName) => {
    const user = await AsyncStorage.getItem('user');
    username.current = userName;
    socket.sendSocket('syscall', {
      label: 'add_friends',
      query: {
        model: 'User',
        filter: { 'profile.username': user },
        execute: { function: 'addRelation', params: [userName] },
      },
    });
  };

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t('headerTitles.FriendsRequests')} />
      </Header>
      <ScrollView
        style={[containerStyles.container, containerStyles.containerPage]}
      >
        {subscribers.length
          ? subscribers.map((user, index) => (
              <View key={index} style={styles.user}>
                <Image style={styles.userAvatar} source={{ uri: user.image }} />
                <Text style={styles.userName}>{user.name}</Text>
                <TouchableOpacity
                  style={styles.userAction}
                  onPress={() => addToFriends(user.name)}
                >
                  <AddUserIcon style={styles.icon} />
                </TouchableOpacity>
              </View>
            ))
          : ''}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 5,
  },
  userAvatar: {
    marginRight: 12,
    width: 45,
    height: 45,
    borderRadius: 60,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
  },
  userAction: {
    marginLeft: 'auto',
    marginBottom: -16,
  },
  userActionAccept: {
    marginLeft: 20,
  },
  userRequested: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
