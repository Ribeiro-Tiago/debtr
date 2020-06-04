# Monthly pay tracker

A very low effort app to help me keep track of the status of my monthly expenses, given that they're paid at different points in time throughout the month

## Build android

- `yarn build`

## Icon and plash

Icon and splash were created using https://github.com/bamlab/react-native-make

- `react-native set-icon -h` to figure out how to create a new icon
- `react-native set-splash -h` to figure out how to create a new splash

Config for (android)[https://github.com/crazycodeboy/react-native-splash-screen] and (ios)[https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9]

# Todo

- add settings to choose the reset day
- add tests
- added i18n support
- better use of themes

# Runing locally on ios

- yarn install
- cd ios && pod install
- open ios/MonthlyPayTracker.xcworkspace on xcode
- run from xcode

# Credits

Icon from [smashicons](https://www.flaticon.com/authors/smashicons) @ flaticon.com
