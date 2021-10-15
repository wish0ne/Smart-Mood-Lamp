/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Icon name="lamp" size={50} color="black" style={styles.icon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});

export default App;
