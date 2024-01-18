import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/main.js";
import ProductScreen from "./screens/product.js";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: "홈 화면" }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ title: "상품상세화면" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
