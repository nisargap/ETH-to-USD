import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Text } from 'native-base';

export default class EthTwitterScreen extends React.Component {
  render() {
    return(
      <Container>
        <Header androidStatusBarColor="#222222" backgroundColor="#333333">
         <Left>
             <Button
               transparent
               onPress={() => this.props.navigation.navigate("DrawerOpen")}
             >
               <Icon name="menu" />
             </Button>
           </Left>
          <Body>
            <Title>Tweets</Title>
          </Body>
        </Header>
        <Content>
          <Text>Ethereum Twitter</Text>
        </Content>
      </Container>
    )
  }
}
