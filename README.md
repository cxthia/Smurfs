# Smurfs: Community Mental Wellbeing App

A hackathon-ready Expo React Native app for low-stigma, emotionally supportive check-ins, journaling, and social connection. Built with TypeScript, Firebase, sprite-based avatars, OpenAI/Gemini API, and NativeWind/Tailwind for styling.

## Features

- **Anonymous daily check-ins** (MCQs + optional text)
- **Emotion classification** via LLM (OpenAI/Gemini)
- **Emotion-representing avatar** (sprite-based PNG assets)
- **Virtual emotion world** (avatars grouped by emotion)
- **Real-world map** (activity pins, join/host)
- **Support group & activity suggestions** (LLM, location-aware)
- **Private journaling** (weekly AI reflection, never shared)
- **Simple reward system** (points for check-ins, journaling, activities)
- **Strong typing, clear comments, clean architecture**

## Tech Stack
- Expo React Native (TypeScript)
- Firebase (Anonymous Auth, Firestore)
- OpenAI/Gemini API (emotion classification, suggestions)
- Lottie (avatar animations)
- Google Maps (activity map)
- NativeWind/Tailwind (styling)
- Jest + React Native Testing Library (testing)

## Folder Structure
```
/app           # Screens
/components    # Reusable UI components (e.g., AvatarSprite)
/services      # Firebase, AI, calendar, reward, etc.
/__tests__     # Unit and component tests
/assets        # Avatar sprites and other images
```

## Quick Start
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the app:**
   ```sh
   npx expo start
   ```
3. **Run tests:**
   ```sh
   npm test
   ```

## Navigation
- Home screen links to all major features for easy demoing.

## Testing
- Jest and React Native Testing Library are set up for unit and component tests.
- Add your tests in the `__tests__` folder or alongside components.

## Notes
- Replace all placeholder API keys and sprite assets with your own.
- All AI and calendar logic is mockable for demo purposes.
- No medical advice, diagnosis, or escalation is provided.

---

For hackathon/demo use only. Prioritize safety, clarity, and emotional UX.
