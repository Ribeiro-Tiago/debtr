import React, { useState, useEffect } from "react";
import { Animated, LayoutChangeEvent } from "react-native";

interface Props {
  children: any;
  isOpen: boolean;
}

export default function CollapsableView({ children, isOpen }: Props) {
  const [height, setHeight] = useState<Animated.Value>();
  const [maxHeight, setMaxHeight] = useState<number>(-1);

  useEffect(() => {
    if (!height) {
      return;
    }

    const final = isOpen ? maxHeight : 0;

    Animated.spring(height as Animated.Value, {
      toValue: final,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const _setMaxHeight = (event: LayoutChangeEvent) => {
    if (maxHeight === -1) {
      setHeight(new Animated.Value(0));
      setMaxHeight(event.nativeEvent.layout.height + 10);
    }
  };

  return (
    <Animated.View
      style={
        maxHeight !== -1
          ? { height, overflow: "hidden" }
          : { overflow: "hidden" }
      }
      onLayout={_setMaxHeight}>
      {children}
    </Animated.View>
  );
}
