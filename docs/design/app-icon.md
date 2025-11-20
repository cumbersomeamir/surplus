# App Icon & Splash Implementation Guide

## Vector Source

- Component: `mobile/src/components/SurplusLogo.tsx`
- Export an SVG/PNG version using your preferred design tool to generate platform icons.

## React Native App Icon

1. Export 1024×1024 PNG (`surplus-icon.png`) from the vector.
2. Use `npx react-native-set-icon --path surplus-icon.png` or follow manual steps:
   - **iOS:** Replace assets under `ios/Surplus/Images.xcassets/AppIcon.appiconset`.
   - **Android:** Place density-specific PNGs under `android/app/src/main/res/mipmap-*`.

## Splash Screen

- Screen: `SplashScreen.tsx` (animated, zero extra network calls).
- Background color: `Colors.primary`.
- Animation: scale pulse + micro wobble; duration 1.2s before navigating to `Home`.
- To make it native-fast at app boot:
  1. Install [`react-native-bootsplash`](https://github.com/zoontek/react-native-bootsplash).
  2. Generate static splash assets via `npx react-native generate-splash --background #FFC727 --logo surplus-logo.png`.
  3. Keep the JS splash (already wired) for seamless transition once the native splash hides.

## Asset Checklist

- `surplus-logo.png` (transparent background) for documentation.
- `surplus-icon.png` (filled background) for app icons.
- `surplus-splash.png` (centered logo) for native splash assets.

