import React, { useState } from "react";
import { Animated, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { getPlatformIcon } from "../utils";

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuWrapperVisible, setMenuWrapper] = useState(false);
  const [itemBottom] = useState(new Animated.Value(0));
  const [itemWidth] = useState(new Animated.Value(80));
  const [itemHeight] = useState(new Animated.Value(80));
  const [itemMargin] = useState(new Animated.Value(20));
  // for rotate animation
  // const [rotateZ] = useState(new Animated.Value(0));

  const menuItems = [
    { icon: "playlist-plus", id: "addExpense" },
    { icon: "calendar-arrow-right", id: "endMonth" },
  ];

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    animateMenu();
  };

  const animateMenu = () => {
    // TODO: implemnet rotate animation on button
    // Animated.timing(rotateZ, {
    //   toValue: isVisible ? 45 : 0,
    //   useNativeDriver: false,
    //   duration: 50,
    //   isInteraction: false,
    // }).start();

    if (isVisible) {
      setTimeout(() => setMenuWrapper(false), 200);
    } else {
      setMenuWrapper(true);
    }

    Animated.spring(itemBottom, {
      toValue: isVisible ? -60 : 10,
      bounciness: 0,
      useNativeDriver: false,
      speed: 20,
    }).start();

    Animated.spring(itemHeight, {
      toValue: isVisible ? 0 : 58,
      bounciness: 0,
      useNativeDriver: false,
      speed: 20,
    }).start();

    Animated.spring(itemWidth, {
      toValue: isVisible ? 0 : 58,
      bounciness: 0,
      useNativeDriver: false,
      speed: 20,
    }).start();

    Animated.spring(itemMargin, {
      toValue: isVisible ? -60 : 20,
      bounciness: 0,
      useNativeDriver: false,
      speed: 20,
    }).start();
  };

  const onPress = (id: string) => {
    console.log("press", id);
    toggleMenu();
  };
  return (
    <>
      <Animated.View
        style={[styles.menu, { bottom: menuWrapperVisible ? 50 : -80 }]}>
        {menuItems.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.menuItem,
                {
                  marginLeft: index !== 0 ? itemMargin : 0,
                  bottom: itemBottom,
                  width: itemWidth,
                  height: itemHeight,
                },
              ]}>
              <MaterialIcon
                name={item.icon}
                color="#f7f7f7"
                size={38}
                onPress={() => onPress(item.id)}
              />
            </Animated.View>
          );
        })}
      </Animated.View>

      <Animated.View
        style={[
          styles.button,
          // { transform: [{ rotateZ }] },
        ]}>
        <IonIcon
          style={{
            fontSize: 32,
            color: "#f1e3cb",
            height: 32,
            width: 32,
          }}
          name={getPlatformIcon(isVisible ? "close" : "add")}
          onPress={toggleMenu}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    paddingVertical: 0,
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 60,
  },
  menuItem: {
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#581c0c",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0.3, height: 0.3 },
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    position: "absolute",
    zIndex: 999,
    bottom: 8,
    backgroundColor: "#581c0c",
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 5,
    elevation: 3, //Because shadow only work on iOS, elevation is same thing but for android.
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    display: "flex",
  },
});
