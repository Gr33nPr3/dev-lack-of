import { Link } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import PrimaryButton from "./components/PrimaryButton";

//to-do page just for the draft, probably will delete it, its more here for reusable components and testing

export default function ToDoScreen() {
  const [currentText, setCurrentText] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const trimmed = currentText.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now().toString(),
      text: trimmed,
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentText("");
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 24 }}>To-Do Demo</Text>

        <Link href="/" asChild>
          <PrimaryButton label="Back to Home" />
        </Link>

        <Text>Write your to-do list below, one item at a time</Text>
      </View>

      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <TextInput
          placeholder="Type and press Add"
          value={currentText}
          onChangeText={setCurrentText}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
          style={{
            borderWidth: 1,
            borderColor: "gray",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 6,
            marginBottom: 10,
          }}
        />
        <PrimaryButton label="Add" onPress={handleAddItem} />
      </View>

      <View
        style={{
          marginTop: 8,
          gap: 8,
        }}
      >
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleItem(item.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: item.checked ? "black" : "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.checked && (
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                  }}
                >
                  X
                </Text>
              )}
            </View>
            <Text
              style={{
                textDecorationLine: item.checked
                  ? "line-through"
                  : "none",
              }}
            >
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: 24 }}>
        <Text>
          This list is not saved anywhere yet.
        </Text>
      </View>
    </ScrollView>
  );
}
