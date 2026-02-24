// app/(tabs)/screen2.jsx
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { queryChat } from "../../lib/ai";
import PrimaryButton from "../components/PrimaryButton";
import TextField from "../components/TextField"; // Your reusable input

export default function Screen2() {
  const [prompt, setPrompt] = useState("What is the capital of France?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) {
      setAnswer("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const res = await queryChat({
        messages: [{ role: "user", content: prompt }],
        model: "openai/gpt-oss-20b:groq",  // Your working model
      });

      const content = res.choices?.[0]?.message?.content ?? "No answer from model";
      setAnswer(content);
    } catch (e) {
      setAnswer(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          gap: 24,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24 }}>AI Chat</Text>
        </View>

        {/* Input field for custom prompt */}
        <TextField
          label="Ask anything..."
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Type your question here..."
        />

        <PrimaryButton
          label={loading ? "Asking..." : "Send"}
          onPress={handleAsk}
        />

        {loading && <ActivityIndicator size="large" color="black" />}

        {/* Answer display */}
        {answer ? (
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "600" }}>Answer:</Text>
            <View
              style={{
                padding: 16,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                minHeight: 100,
              }}
            >
              <Text>{answer}</Text>
            </View>
          </View>
        ) : null}

        <PrimaryButton
          label="← Back to Home"
          onPress={() => router.push("/")}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
