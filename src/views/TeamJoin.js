import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'ui/Text.js';
import { containerStyles } from '@/styles/container.js';
import { UserDefault, SendRequestIcon, SendRequestDisabledIcon } from '@/icons';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/Layout/Header.js';
import { HeaderBack } from '@/components/Layout/HeaderBack.js';
import { HeaderTitle } from '@/components/Layout/HeaderTitle.js';
import socket from '@/socket';

export function TeamJoin({ navigation }) {
  const { t, i18n } = useTranslation();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    socket.listenSocket(async (label, data) => {
      if (label === 'teams') {
        console.log(data);
        setTeams([...data]);
      }
    });
    socket.send('query', {
      label: 'teams',
      query: {
        model: 'Guild',
        method: 'get',
      },
    });
  }, [navigation]);
  /*   const teams = [
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
      mp: 999,
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
      mp: 999,
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
      isRequested: true,
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
      mp: 999,
    },
    {
      name: "Team name",
      tag: "tag",
      status: "закрытая команда",
      mp: 999,
    },
  ]; */

  return (
    <>
      <Header>
        <HeaderBack />
        <HeaderTitle title={t('headerTitles.TeamJoin')} />
      </Header>

      <ScrollView
        contentContainerStyle={[containerStyles.container, styles.container]}
      >
        {teams.length ? (
          teams.map((team, index) => (
            <View key={index} style={styles.team}>
              <UserDefault style={styles.teamAvatar} />
              <View>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamLabel}>
                  {team.tag} • {team.status}
                </Text>
              </View>
              <View style={styles.teamActions}>
                {team.mp ? (
                  <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Tabs', { screen: 'Game' })
                      }
                    >
                      <Text style={styles.teamJoinText}>
                        {t('labels.join')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.teamMp}>{team.mp} mp</Text>
                  </View>
                ) : team.isRequested ? (
                  <View
                    style={[styles.teamJoinFree, styles.teamJoinFreeDisabled]}
                  >
                    <SendRequestDisabledIcon style={styles.teamJoinIcon} />
                    <Text
                      style={[styles.teamJoinText, styles.teamJoinTextDisabled]}
                    >
                      {t('labels.sended')}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.teamJoinFree}>
                    <SendRequestIcon style={styles.teamJoinIcon} />
                    <Text style={styles.teamJoinText}>
                      {t('labels.request')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text>Пока гилидий нет</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  teamAvatar: {
    marginRight: 16,
  },
  teamName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
  },
  teamLabel: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(235, 235, 245, 0.6)',
  },
  teamActions: {
    marginLeft: 'auto',
  },
  teamJoinText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: '#FF5A45',
  },
  teamJoinTextDisabled: {
    color: '#fff',
  },
  teamJoinFree: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamJoinFreeDisabled: {
    opacity: 0.4,
  },
  teamJoinIcon: {
    marginRight: 6,
  },
  teamMp: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: '#fff',
    marginTop: 1,
  },
});
