import React from "react";
import { FlatList, StyleSheet, ListRenderItemInfo } from "react-native";

import { Item } from "../types";

interface Props {
  data: Item[];
  renderEmptyList: () => React.ReactElement;
  renderListItem: (info: ListRenderItemInfo<Item>) => React.ReactElement | null;
}
export default function List({ data, renderEmptyList, renderListItem }: Props) {
  if (!data.length) {
    return renderEmptyList();
  }

  return (
    <FlatList<Item>
      keyExtractor={({ id }) => id}
      data={data}
      renderItem={renderListItem}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#eaeaea" },
});
