import React, { useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { getPlatformIcon } from "../utils";

export default () => {
  const hiddenBottom = Math.floor((Dimensions.get("window").height / 2) * -1);
  const [isVisible, setIsVisible] = useState(false);
  const [bottom] = useState(new Animated.Value(hiddenBottom));
  const [rotateZ] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    animateMenu();
  };

  const animateMenu = () => {
    Animated.spring(bottom, {
      toValue: isVisible ? hiddenBottom : 60,
      bounciness: 0,
      useNativeDriver: false,
      speed: 2,
    }).start();

    Animated.spring(rotateZ, {
      toValue: isVisible ? 0 : 45,
      bounciness: 0,
      useNativeDriver: false,
      speed: 2,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: "#f9f9f9",
            paddingVertical: 0,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 5,
            elevation: 3, //Because shadow only work on iOS, elevation is same thing but for android.
          },
          { bottom },
        ]}>
        {["create", "move"].map((item) => {
          return (
            <View
              style={{
                padding: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}>
              <Text key={item} style={{ fontSize: 20 }}>
                {item}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      <View
        style={[
          {
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
          { transform: [{ rotate: rotateZ as any }] },
        ]}>
        <Icon
          style={{ fontSize: 40, color: "#f1e3cb" }}
          name={getPlatformIcon("add")}
          onPress={toggleMenu}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
