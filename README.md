# go8-ads-app - React Native Mobile Application

This is the mobile application built with React Native using Expo for the **go8-ads** platform. It connects to a backend built using Laravel and is styled with **NativeWind** (Tailwind for React Native) and **react-native-reusables** (Shadcn for React Native). The app displays advertisements and integrates user management, authentication, and ad management features.

## Features

- **Fetch and Display Ads**: Fetch ads from the backend and display them with a polished UI.
- **User Authentication**: Login and authentication functionality with JWT tokens.
- **Ad Upload**: Option to upload ads via the backend and manage them.
- **Responsive UI**: Styled using NativeWind (Tailwind) and reusable components.

## Tech Stack

- **React Native** with Expo
- **NativeWind** (Tailwind for React Native)
- **react-native-reusables** (Shadcn for React Native)
- **Laravel** (Backend for database connection and API)

## Getting Started

### Prerequisites

1. Install [Node.js](https://nodejs.org/)
2. Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
3. Clone the repository:

   ```bash
   git clone https://github.com/kc-aquino/go8-ads-app
   cd go8-ads-app
   npm install
   expo start

### Website
   ```bash
      git clone https://github.com/kairo-18/go8-ads-nestjs
      cd go8-ads-nestjs
      npm install
      docker-compose up
      # Set up .env file
      npm run start:dev
   ```
## Notes
- Ensure you have the backend running to fully test the app features.
- The app is designed for easy navigation and ad management, but requires the API to be up and running for data fetching and user interaction.

License: This project is open-source under the MIT License.
