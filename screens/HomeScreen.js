import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Zufall',
  };



  constructor(props) {
    super(props);
    this.state = {
      fact: '',
      previousFact: '',
      previousButton: false
    };
  }

  _onPressButton = () => {

    this.setState({ previousButton: true })
    this.setState({ previousFact: this.state.fact })

    fetch('http://randomuselessfact.appspot.com/random.json?language=de')
      .then(response => response.json())
      .then(value =>
        this.setState({ fact: value.text })
      )

      //http://randomuselessfact.appspot.com/random.json?language=de

      .catch((error) => {
        console.error(error);
      });

  }

  _previous = () => {

    this.setState({ previousButton: false })
    this.setState({ fact: this.state.previousFact })

  }



  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.image} >
            <Image source={require('./Norris.gif')} />

          </View>
          <View>
            <Text h3 style={styles.text}>
              {this.state.fact}
            </Text>
          </View>

          <View style={styles.previousbutton}>
            {this.state.previousButton ?

              <Button
                onPress={this._previous}
                title="vorheriger Fakt"
                accessibilityLabel="Learn more about this purple button" />
              : null}

          </View>

          <View style={styles.nextbutton}>
            <Button
              onPress={this._onPressButton}
              title="nächster Fakt"
              accessibilityLabel="Learn more about this purple button" />
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25

  },

  nextbutton: {
    position: 'absolute',
    bottom: 25,
    right: 15
  },

  previousbutton: {
    position: 'absolute',
    bottom: 25,
    left: 15
  },

  image: {
    position: 'absolute',
    top: 25
  },

  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },

  navigationFilename: {
    marginTop: 5,
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic'
  }

});
