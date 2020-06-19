# Debtr

A very low effort app to help me keep track of the status of my monthly expenses, given that they're paid at different points in time throughout the month.

Currently only available on [android](https://play.google.com/store/apps/details?id=com.debtr) due to licensing costs

## Build android

- `yarn build:apk` to build an apk
- `yarn build:aab` to build an aab for google store

## Icon and plash

Icon and splash were created using https://github.com/bamlab/react-native-make

- `react-native set-icon -h` to figure out how to create a new icon
- `react-native set-splash -h` to figure out how to create a new splash

Config for [android](https://github.com/crazycodeboy/react-native-splash-screen) and [ios](https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9)

# Running locally on android

- yarn install
- optional: if you want a specific android version have the emulator running
- yarn android

# Runing locally on ios

- yarn install
- cd ios && pod install
- optional: if you want a specific iphone version have the emulator running
- yarn ios

# Contribution

Wanna contribute? Check the [how to](https://github.com/Ribeiro-Tiago/debtr/blob/master/CONTRIBUTING.md) and then see what [needs to be done](https://github.com/Ribeiro-Tiago/debtr/blob/master/TODO.md) or come up with new features yourself

# Credits

Icon from [smashicons](https://www.flaticon.com/authors/smashicons) @ flaticon.com

Store image templates made with [app store screenshots](https://www.appstorescreenshot.com/)

ToS and PP PDFs generated with https://app-privacy-policy-generator.firebaseapp.com/

#

<a href="https://www.buymeacoffee.com/ribeirotiago" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-violet.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
