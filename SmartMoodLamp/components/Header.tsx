import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type NavigationHeaderProps = {
  title?: string;
  goBack: () => void;
};

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  title,
  goBack,
}) => {
  return (
    <View style={[styles.view]}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="ios-chevron-back" size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
    marginLeft: 10,
  },
  flex: {flex: 1, backgroundColor: 'transparent'},
});
