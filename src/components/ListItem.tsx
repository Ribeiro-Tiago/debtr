import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Item } from '../types';

const primary = '#581c0c';
const secondary = '#ca5116';

interface Props {
  item: Item;
  isEven: boolean;
  iconName: string;
  hideIcon?: boolean;
  onPress: (item: Item) => void;
  renderTags?: (item: Item) => React.ReactElement;
  onIconPress?: (id: string) => void;
}
export default function ListItem({
  item,
  isEven,
  iconName,
  hideIcon,
  onPress,
  renderTags,
  onIconPress,
}: Props) {
  return (
    <TouchableWithoutFeedback key={item.id} onPress={() => onPress(item)}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={isEven ? styles.evenItem : styles.oddItem}>
            {item.description}
          </Text>
          <Text style={isEven ? styles.evenItem : styles.oddItem}>
            {item.amount}€
          </Text>

          <Icon
            onPress={() => onIconPress(item.id)}
            name={iconName}
            size={32}
            color={hideIcon ? 'transparent' : isEven ? primary : secondary}
            style={styles.icon}
          />
        </View>

        {renderTags && renderTags(item)}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f9b384',
  },
  evenItem: {
    color: primary,
    fontSize: 18,
  },
  oddItem: {
    color: secondary,
    fontSize: 18,
  },
  icon: {
    textAlign: 'right',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
