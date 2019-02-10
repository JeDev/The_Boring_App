import React from 'react';
import { SearchBar } from 'react-native-elements';


import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  CameraRoll,
  ToastAndroid
} from 'react-native';


export default class LinksScreen extends React.Component {


  static navigationOptions = {
    title: 'Zufall',
  };

  constructor(props) {
    super(props);
    this.state = {
      Gif: 'https://media.giphy.com/media/OF0yOAufcWLfi/giphy.gif',
      search: 'rover',
      previousGif: '',
      previousButton: false,
      cameraRollUri: null,
      OriginalWidth: null,
      OriginalHeight: null

    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  _onPressButton = () => {

    /*  fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(value =>
          this.setState({ joke: value.value })
        )
  
        */

    this.setState({ previousButton: true })
    this.setState({ previousGif: this.state.Gif })

    fetch('https://api.giphy.com/v1/gifs/random?api_key=r5vlDh2ux1S015no1ORrB7jo9wUmTfHZ&rating=PG-13&tag=' + this.state.search)
      .then(response => response.json())
      .then(value =>
        this.setState({ Gif: value.data.image_url }),
      )



      .catch((error) => {
        console.error(error);
      });


    Image.getSize(this.state.Gif, (width, height) => { this.setState({ OriginalWidth: width, OriginalHeight: height }) });


  }

  _previous = () => {

    this.setState({ previousButton: false })
    this.setState({ Gif: this.state.previousGif })

  }

  //-------------------Image speichern---------------------------

  saveToCameraRoll = () => {
    const { selectedImage, downlaodUrl } = this.state
    let url = this.state.Gif;
    //ToastAndroid.show("Image is Saving...", ToastAndroid.SHORT)
    if (Platform.OS === 'android') {

      RNFetchBlob
        .config({
          fileCache: true,
          appendExt: 'gif'
        })
        .fetch('GET', url)
        .then((res) => {
          console.log()
          CameraRoll.saveToCameraRoll(res.path())

            .then((res) => {
              console.log("save", res)
              ToastAndroid.show("Image saved Successfully.", ToastAndroid.SHORT)
            }).catch((error) => {
              ToastAndroid.show("Ops! Operation Failed", ToastAndroid.SHORT)

            })

        })
    } else {
      CameraRoll.saveToCameraRoll(url)
        .then(alert('Erledigt!', 'Das GIF '))
    }
  }

  //-------------------------------------------------------------



  render() {
    const { width } = Dimensions.get('window');

    return (


      <View style={styles.container}>
        <SearchBar
          round
          lighttheme
          placeholder="Filter..."
          onChangeText={this.updateSearch}
          value={this.search}
        />

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.image} >
            <Image source={require('./Norris.gif')} />
          </View>

          <View style={styles.ImageWrapper}>
            <Image
              source={{ uri: this.state.Gif }}
              style={styles.images}
            />
          </View>

          {/*<View style={styles.savebutton}>
            {this.state.previousButton ?

              <Button
                onPress={this.saveToCameraRoll}
                title="GIF speichern"
                accessibilityLabel="Learn more about this purple button" />
              : null}

            </View>*/}

          <View style={styles.previousbutton}>
            {this.state.previousButton ?

              <Button
                onPress={this._previous}
                title="zurück"
                accessibilityLabel="Learn more about this purple button" />
              : null}

          </View>

          <View style={styles.nextbutton}>
            <Button
              onPress={this._onPressButton}
              title="vorwärts"
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

  savebutton: {
    position: 'absolute',
    bottom: 100,
  },

  image: {
    position: 'absolute',
    top: 25
  },

  ImageWrapper: {

    maxHeight: 440
  },

  images: {
    flex: 1,
    width: (Dimensions.get('window').width),
    height: 200,
    resizeMode: 'contain'

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
