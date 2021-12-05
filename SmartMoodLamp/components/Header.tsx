import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const NavigationHeader: FC = ({}) => {
  return (
    <View style={[styles.view]}>
      <Icon name="emoticon-happy" size={30} color="black" />
      <Icon name="emoticon-neutral" size={30} color="black" />
      <Icon name="emoticon-sad" size={30} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: 25,
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: 'rgba(73, 84, 100, 0.3)',
  },
});
