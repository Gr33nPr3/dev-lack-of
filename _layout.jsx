import { Tabs } from "expo-router";

// the tabs layout

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Screen 1",
          tabBarLabel: "Screen 1",
        }}
      />
      <Tabs.Screen
        name="screen2"
        options={{
          title: "Screen 2",
          tabBarLabel: "Screen 2",
        }}
      />
      <Tabs.Screen
        name="screen3"
        options={{
          title: "Screen 3",
          tabBarLabel: "Screen 3",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
