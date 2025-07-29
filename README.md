# Healthcare Management App MVP

A mobile healthcare insurance app built with Expo and React Native, featuring digital insurance cards, claims management, provider finder, and document capture functionality.

## Features

- **Digital Insurance Card**: Display member information with QR code for provider scanning
- **Claims Management**: View claims list with status tracking and detailed claim information
- **Provider Finder**: Search and locate nearby healthcare providers with call functionality
- **Document Camera**: Capture and store insurance documents and receipts
- **Professional UI**: Cigna-branded design with responsive layout for iOS and Android

## Tech Stack

- **Framework**: Expo SDK with React Native
- **Navigation**: React Navigation v6
- **UI Components**: React Native Elements
- **Storage**: AsyncStorage for local data persistence
- **Camera**: Expo Camera for document capture
- **QR Codes**: react-native-qrcode-svg for insurance card QR generation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS testing) or Android Studio (for Android testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Devin-Workshop/healthcare-mgmt-app.git
cd healthcare-mgmt-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web browser
npm run web
```

## Project Structure

```
src/
├── constants/
│   └── colors.js          # Cigna brand colors and theme
├── navigation/
│   └── AppNavigator.js    # Main navigation setup
├── screens/
│   ├── InsuranceCardScreen.js    # Digital insurance card with QR code
│   ├── ClaimsListScreen.js       # Claims list with pull-to-refresh
│   ├── ClaimDetailsScreen.js     # Detailed claim information
│   ├── ProviderFinderScreen.js   # Provider search and directory
│   └── CameraScreen.js           # Document capture functionality
└── components/            # Reusable UI components (future expansion)
```

## Key Features

### Digital Insurance Card
- Displays member ID, group number, and plan details
- Generates QR code for quick provider scanning
- Professional Cigna branding and design
- Stores member data locally using AsyncStorage

### Claims Management
- Lists recent claims with status badges (Approved, Processing, Denied)
- Pull-to-refresh functionality for updated claim data
- Detailed claim view with financial breakdown
- Persistent storage of claim information

### Provider Finder
- Search providers by name, specialty, or location
- Display provider ratings, distance, and availability
- Tap-to-call functionality for direct provider contact
- Integration with maps for directions

### Document Camera
- Camera integration for capturing insurance documents
- Document preview and save functionality
- Local storage of captured documents
- Professional camera interface with guidelines

## Development

### Running Tests
```bash
# Run the app in development mode
npm start

# Test on specific platforms
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

### Building for Production
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Permissions

The app requires the following permissions:
- **Camera**: For document capture functionality
- **Storage**: For saving captured documents and app data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
