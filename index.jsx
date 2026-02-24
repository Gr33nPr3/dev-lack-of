import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "./components/PrimaryButton";


//useEffect and useState usage

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDummyLogin = () => {
    setUser({ name: "Demo User" });
  };

  const handleDummyLogout = () => {
    setUser(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24 }}>Draft</Text>
            <Text>Current time: {currentTime}</Text>

            <Text>Simple easily editable draft app</Text>

            <View style={{ gap: 8, marginTop: 5 }}>
              <Text style={{ fontWeight: "600" }}>Auth screens</Text>

              <Link href="/(auth)/sign-in" asChild>
                <PrimaryButton label="Go to Sign In" />
              </Link>

              <Link href="/(auth)/sign-up" asChild>
                <PrimaryButton
                  label="Go to Sign Up"
                  variant="secondary"
                />
              </Link>
            </View>

            {/*Todo button*/}
            <View style={{ marginTop: 16 }}>
              <Link href="/todo" asChild>
                <PrimaryButton
                  label="To-Do Demo"
                  onPress={() => router.push("/todo")}
                />
              </Link>
            </View>
          </View>
        </ScrollView>

        {/*Tabs in the buttom*/}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            backgroundColor: "white",
          }}
        >
          <PrimaryButton
            label="Screen 1"
            onPress={() => router.push("/screen1")}
            variant="secondary"
          />
          <PrimaryButton
            label="Screen 2"
            onPress={() => router.push("/screen2")}
            variant="secondary"
          />
          <PrimaryButton
            label="Screen 3"
            onPress={() => router.push("/screen3")}
            variant="secondary"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
