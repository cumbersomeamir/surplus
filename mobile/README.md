# Surplus Mobile

Minimal React Native 0.73.6 starter with TypeScript and Redux Toolkit. Only foundational packages are installed; expand with Firebase, payments, analytics, and media SDKs as features are implemented.

## Commands

```bash
npm install
npm start          # Metro bundler
npm run android    # Android build
npm run ios        # iOS build
npm test           # Jest + RTL
npm run lint
npm run typecheck
```

## Structure

- `src/App.tsx` – Root component (Redux, navigation, safe areas)
- `src/navigation/` – Stack navigator scaffolding
- `src/store/` – Redux Toolkit + Persist setup
- `src/screens/` – Example `HomeScreen`

## Next Steps

- Add Firebase modules, auth providers, payments, and media utilities as needed.
- Configure native modules (iOS Podfile / Android Gradle) after installing new packages.
- Set up CI (Fastlane, Detox, etc.) once platform builds are enabled.

