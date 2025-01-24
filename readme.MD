# AI Chat Application

# YouTube Video
[![Alt text](https://img.youtube.com/vi/v1HcSy3qtb8/0.jpg)](https://www.youtube.com/shorts/v1HcSy3qtb8)

https://www.youtube.com/shorts/v1HcSy3qtb8

## Project Overview
This is a React Native mobile application that provides an AI-powered chat interface. The app features a polished login system with smooth animations, secure authentication, and an intuitive chat interface. It's built using React Native and Expo, with OpenAI integration for the chat functionality.

### Key Features
- Animated login interface with blur effects
- Secure authentication system
- AI-powered chat functionality
- User profile and subscription management
- Custom UI components and animations

### Tech Stack
- React Native / Expo
- TypeScript
- OpenAI API
- React Navigation
- Expo Blur
- Animated API
- Zustand (State Management)

## Project To-Do

- [ ] Add a timer on voice listener or an entire function to check it, in order to avoid bugs.
- [ ] Solve microphone relay timing, because doesn't work if the button is pressed more than 5 seconds, roughly.

- [ ] Implement case sensitivity handling in login and registration:
  - [ ] Add clear validation for username/email case sensitivity
  - [ ] Display helpful error messages when case mismatches occur
  - [ ] Consider implementing case-insensitive login option

- [ ] Modify scroll wheel behavior for chat clearing:
  - [ ] Add confirmation dialog when scrolling down to clear chat
  - [ ] Implement smooth scroll detection for triggering clear action
  - [ ] Add visual feedback during scroll interaction
  - [ ] Ensure proper handling of scroll events to prevent accidental clearing

- [ ] Add toast notifications for better user feedback:
  - [ ] Implement toast when scrolling down to clear chat:
    - [ ] "Pull down to clear chat history"
    - [ ] "Chat history cleared successfully"
  - [ ] Add toast when copying chat messages:
    - [ ] "Message copied to clipboard"
  - [ ] Add app update notifications:
    - [ ] "New version available. Please update"
    - [ ] "App successfully updated to version X.X.X"
