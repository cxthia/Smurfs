import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  Text,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  PanResponder,
} from "react-native";

const { width, height } = Dimensions.get("window");

/* ===============================
   EMOTIONS + GROUPS
================================ */
const emotionAssets: Record<string, any> = {
  anxious: require("../assets/anxious.png"),
  calm: require("../assets/calm.png"),
  confused: require("../assets/confused.png"),
  devious: require("../assets/devious.png"),
  ecstatic: require("../assets/ecstatic.png"),
  happy: require("../assets/happy.png"),
  hungry: require("../assets/hungry.png"),
  lonely: require("../assets/lonely.png"),
  mad: require("../assets/mad.png"),
  motivated: require("../assets/motivated.png"),
  sad: require("../assets/sad.png"),
  scared: require("../assets/scared.png"),
};

const emotions = Object.keys(emotionAssets);

const botNames = [
  "Ava","Liam","Noah","Mia","Ethan","Sophia",
  "Lucas","Isla","Zoe","Kai","Aria","Leo",
];

type Blob = {
  id: number;
  name: string;
  emotion: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function VirtualEmotionWorldScreen() {

  /* ===============================
     PLAYER (YOU)
  ================================ */
  const [player, setPlayer] = useState({
    x: width / 2 - 35,
    y: height / 2,
    size: 70,
  });

  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [selectedBlob, setSelectedBlob] = useState<Blob | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [points, setPoints] = useState(0);

  const animationRef = useRef<number | null>(null);

  const [userEmotion] = useState(
    emotions[Math.floor(Math.random() * emotions.length)]
  );

  /* ===============================
     INIT BOTS
  ================================ */
  useEffect(() => {
    const initialBlobs: Blob[] = emotions.map((emotion, index) => ({
      id: index,
      name: botNames[index % botNames.length],
      emotion,
      x: Math.random() * (width - 80),
      y: Math.random() * (height - 200) + 100,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));
    setBlobs(initialBlobs);
  }, []);

  /* ===============================
     BOT DRIFT (FIXED EDGE COLLISION)
  ================================ */
  useEffect(() => {
    const update = () => {
      setBlobs((prev) =>
        prev.map((blob) => {
          let newX = blob.x + blob.vx;
          let newY = blob.y + blob.vy;
          let newVx = blob.vx;
          let newVy = blob.vy;

          if (newX <= 0) {
            newX = 0;
            newVx *= -1;
          }
          if (newX >= width - 70) {
            newX = width - 70;
            newVx *= -1;
          }
          if (newY <= 80) {
            newY = 80;
            newVy *= -1;
          }
          if (newY >= height - 100) {
            newY = height - 100;
            newVy *= -1;
          }

          return { ...blob, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  /* ===============================
     JOYSTICK
  ================================ */
  const joystickPosition = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const dx = gesture.dx;
        const dy = gesture.dy;
        const maxDistance = 40;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const limitedDx =
          distance > maxDistance ? (dx / distance) * maxDistance : dx;
        const limitedDy =
          distance > maxDistance ? (dy / distance) * maxDistance : dy;

        joystickPosition.current = { x: limitedDx, y: limitedDy };

        setPlayer((prev) => {
          let newX = prev.x + limitedDx * 0.05;
          let newY = prev.y + limitedDy * 0.05;

          newX = Math.max(0, Math.min(width - prev.size, newX));
          newY = Math.max(80, Math.min(height - 100, newY));

          return { ...prev, x: newX, y: newY };
        });
      },
      onPanResponderRelease: () => {
        joystickPosition.current = { x: 0, y: 0 };
      },
    })
  ).current;

  /* ===============================
     CHAT
  ================================ */
  const openChat = (blob: Blob) => {
    setSelectedBlob(blob);
    setMessages([
      {
        id: 0,
        text: `Hi, I'm ${blob.name}. I'm feeling ${blob.emotion} today.`,
        sender: "bot",
      },
    ]);
    setPoints((prev) => prev + 1);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedBlob) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: "I appreciate you talking with me.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, reply]);
    }, 600);

    setInput("");
  };

  /* ===============================
     UI
  ================================ */
  return (
    <ImageBackground
      source={require("../assets/virtualworldbackground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>Emotion World</Text>
      <Text style={styles.subtitle}>You feel: {userEmotion}</Text>
      <Text style={styles.points}>Connection Points: {points}</Text>

      {/* BOTS */}
      {blobs.map((blob) => (
        <Pressable key={blob.id} onPress={() => openChat(blob)}>
          <View style={{ position: "absolute", left: blob.x, top: blob.y }}>
            <Text style={styles.nameLabel}>{blob.name}</Text>
            <Image
              source={emotionAssets[blob.emotion]}
              style={styles.blob}
            />
          </View>
        </Pressable>
      ))}

      {/* PLAYER */}
      <View
        style={{
          position: "absolute",
          left: player.x,
          top: player.y,
          alignItems: "center",
        }}
      >
        <Text style={styles.nameLabel}>Me</Text>
        <Image
          source={emotionAssets[userEmotion]}
          style={styles.blob}
        />
      </View>

      {/* JOYSTICK */}
      <View style={styles.joystickBase} {...panResponder.panHandlers}>
        <View
          style={[
            styles.joystickKnob,
            {
              transform: [
                { translateX: joystickPosition.current.x },
                { translateY: joystickPosition.current.y },
              ],
            },
          ]}
        />
      </View>

      {/* CHAT MODAL */}
      <Modal visible={!!selectedBlob} animationType="slide">
        <View style={styles.chatContainer}>
          <Text style={styles.chatTitle}>
            Talking to {selectedBlob?.name}
          </Text>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.message,
                  item.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                {item.text}
              </Text>
            )}
          />

          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type..."
              style={styles.input}
            />
            <Pressable style={styles.sendButton} onPress={sendMessage}>
              <Text style={{ color: "white" }}>Send</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={() => setSelectedBlob(null)}
          >
            <Text style={{ color: "white" }}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </ImageBackground>
  );
}

/* ===============================
   STYLES
================================ */
const styles = StyleSheet.create({
  background: { flex: 1 },

  title: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    fontSize: 16,
    color: "white",
  },

  points: {
    position: "absolute",
    top: 115,
    alignSelf: "center",
    fontSize: 16,
    color: "white",
  },

  blob: {
    width: 70,
    height: 70,
  },

  nameLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },

  joystickBase: {
    position: "absolute",
    bottom: 40,
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  joystickKnob: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },

  chatContainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    color: "white",
  },

  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#333",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
});
