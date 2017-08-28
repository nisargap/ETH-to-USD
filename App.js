import React from 'react';
import Expo from 'expo';
import Home from './views/HomeScreen/index.js';

export default class App extends React.Component {
  render() {
    return (
      <Home />
    )
  }
}
// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isReady: false,
//       currentPriceUSD: 0
//     }
//   }
//
//   async componentWillMount() {
//     await Expo.Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//       Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
//     });
//
//     this.setState({ isReady: true });
//   }
//   render() {
//     const fontsNotRendered = (
//       <View>
//         <Text>Fonts loading ...</Text>
//       </View>
//     );
//
//     if (!this.state.isReady) {
//       return (fontsNotRendered);
//     }
//     return (
//        StackNavigator({
//           Home: { screen: Home }
//         });
//     );
//   }
// }
