import React from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Item, Input } from 'native-base';
import { loadFonts } from '../../utils/loadFonts';
import EthLogo from '../../images/eth.jpg';
import DollarLogo from '../../images/dollar.jpg';
import axios from "axios";
import TimerMixin from "react-timer-mixin";
import ReactMixin from "react-mixin";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      ethPrice: 0,
      timeUpdated: null,
      tempHoldings: "",
      currentHoldings: 0
    }
  }
  async getAndSetHoldings() {
    try {
      const value = await AsyncStorage.getItem('@UserData:ethHoldings');
      if (value !== null){
        // We have data!!
        this.setState({
          currentHoldings: value
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  async componentWillMount() {
    this.setState({
      isReady: await loadFonts()
    });
    this.updatePrice();
    this.getAndSetHoldings();
  }
  async updatePrice() {
    let response = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    this.setState({
      ethPrice: response.data["USD"],
      timeUpdated: dateTime
    });
  }
  componentDidMount() {
    this.setInterval(function() {
      this.updatePrice();
    }.bind(this), 3000)
  }
  setHoldings(value) {
    this.setState({
      tempHoldings: value
    });
  }
  async finalHoldings() {
    try {
      if(this.state.tempHoldings === 0 || this.state.tempHoldings === undefined || !this.state.tempHoldings) {
        ToastAndroid.show('Please set holdings first', ToastAndroid.SHORT);
      } else {
        await AsyncStorage.setItem('@UserData:ethHoldings', this.state.tempHoldings);
        ToastAndroid.show('You set your holdings to: ' + this.state.tempHoldings.toString() + " ETH", ToastAndroid.SHORT);
        this.setState({
          currentHoldings: this.state.tempHoldings,
          tempHoldings: ""
        })
      }
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }
  render() {
    const fontsNotRendered = (
      <View>
        <Text>Fonts loading ...</Text>
      </View>
    );

    if (!this.state.isReady) {
      return (fontsNotRendered);
    }
    return (
      <Container>
       <Header androidStatusBarColor="#222222" backgroundColor="#000000">
       {/*
        <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left> */}
         <Body>
           <Title>ETH to USD</Title>
         </Body>
       </Header>
       <Content style={{ padding: 4}}>

        {this.state.ethPrice === 0 ? (
          <Card>
            <CardItem>
              <Text style={{ fontWeight: "bold"}}>Loading Ethereum Price Data...</Text>
            </CardItem>
          </Card>
        ) : (
          <View>
          <Card>
             <CardItem style={{ flex: 1, flexDirection: "column"}}>
               <View style={{ alignItems: "center", flex: 1, flexDirection: "row"}}>
               <Image source={EthLogo} style={{ width: 60, height: 60}} />
               <Text style={{ fontWeight: "bold", fontSize: 25 }}> 1 Ethereum equals</Text>
               </View>
               <View style={{ alignItems: "center", flex: 1, flexDirection: "row"}}>
               <Image source={DollarLogo} style={{ width: 50, height: 50}} />
               <Text style={{ fontWeight: "bold", fontSize: 30 }}> ${this.state.ethPrice.toFixed(2)} USD </Text>
               </View>
               <Text style={{ marginTop: 20, color: "#999999"}}>Last updated on {this.state.timeUpdated} </Text>
             </CardItem>
         </Card>
         {this.state.currentHoldings !== 0 ? (
            <Card style={{ flex: 1, flexDirection: "column", alignItems: "center"}}>
              <CardItem>
              <Text style={{ fontSize: 15, color: "green", textAlign: "center", fontWeight: "bold"}}>You own {this.state.currentHoldings} ETH currently worth ${(this.state.ethPrice * this.state.currentHoldings).toFixed(2)}</Text>
              </CardItem>
            </Card>
         ) : (null)}
         <Card>
           <CardItem style={{ flex: 1, flexDirection: "column", alignItems: "center"}}>
           <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Update holdings</Text>
            <Item regular>
              <Input keyboardType="numeric" value={this.state.tempHoldings} onChangeText={this.setHoldings.bind(this)} placeholder='Enter your ETH holdings amount' />
            </Item>
            <Item style={{ marginTop: 15}}>
            <Button onPress={this.finalHoldings.bind(this)} dark><Text style={{ color: "#FFFFFF", fontWeight: "bold"}}> Set ETH Holdings </Text></Button>
            </Item>
           </CardItem>
         </Card>
         </View>
        )
      }
       </Content>
     </Container>
    )
  }
}
ReactMixin.onClass(Home, TimerMixin);
export default Home;
