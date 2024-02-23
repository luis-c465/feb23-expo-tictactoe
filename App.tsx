import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Game from "./Game";

export default function App() {
  console.log("app rerender");

  return (
    <View style={styles.container}>
      <Game />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
