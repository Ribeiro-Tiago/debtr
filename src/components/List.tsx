import React from "react";
import { StyleSheet } from "react-native";
import DraggableFlatList, {
  RenderItemParams as DragableRenderItemParams,
  DragEndParams,
} from "react-native-draggable-flatlist";

import { Item, RenderItemParams } from "../types";

interface Props {
  data: Item[];
  onItemReorder: (data: Item[]) => void;
  renderEmptyList: () => React.ReactElement;
  renderListItem: (props: RenderItemParams) => React.ReactElement | null;
}

export default function List({
  data,
  renderEmptyList,
  renderListItem,
  onItemReorder,
}: Props) {
  if (!data.length) {
    return renderEmptyList();
  }

  const onDragEnd = ({ to, from, data }: DragEndParams<Item>) => {
    if (to === from) {
      return;
    }

    onItemReorder(data);
  };

  const renderItem = ({
    drag,
    item,
    isActive,
  }: DragableRenderItemParams<Item>) => {
    return renderListItem({
      item,
      isBeingDragged: isActive,
      onDrag: drag,
    });
  };

  return (
    <DraggableFlatList<Item>
      keyExtractor={({ id }) => id}
      data={data}
      bounces={false}
      renderItem={renderItem}
      onDragEnd={onDragEnd}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f1f1f1" },
});
