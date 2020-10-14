import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Score from './Components/Score/Score';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'


//BACKGROUND PARTICLES
const ParticleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

//create an initial state object to allow a refresh of state when logged out (onroutechange function)

const initialState = {
  input: '',        //input from imageinputbox that takes the url from oninputchange()
  imageurl: '',     //takes the input value when onclick button is pushed via onSubmit()
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
// testing fetching data from server.js
// componentDidMount(){
//   fetch('http://localhost:3000/')
//   .then(response=> response.json())
//   .then(data => console.log(data))
// }


calculateFaceLocation = (data) => {
const faceboxdata = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const imagewidth = Number(image.width);
const imageheight = Number(image.height);
return {
  leftCol: faceboxdata.left_col * imagewidth,
  topRow: faceboxdata.top_row * imageheight,
  rightCol: imagewidth - (faceboxdata.right_col * imagewidth),
  bottomRow: imageheight - (faceboxdata.bottom_row * imageheight)
   }
}

displayFacebox = (boxdata) => {
  this.setState({box: boxdata});
}

onInputChange = (event) =>{
  this.setState({input: event.target.value});
}

//Aswell as setting imageurl state to match the url submitted, onSubmit() also draws in API data
//It puts that data through calculateFacelocation() which obtains the API data draws the box
//this API data is passed to displayFacebox() and set's the state to match that API data

onSubmit = () => {
  this.setState({imageurl: this.state.input});
  fetch('https://still-caverns-19083.herokuapp.com/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    input: this.state.input
     })
   })
  .then(response => response.json())
  .then(response => {
    if (response) {
      fetch('https://still-caverns-19083.herokuapp.com/image', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
       id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(countdata =>{
        this.setState(Object.assign(this.state.user, {entries: countdata}))
      })
      .catch(console.log) //catches any errors from the fetch element

    }
    this.displayFacebox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err));
}

//this function changes state between Signin, Register and Home and uses if statements and true/false to display certain pages

onroutechangefunction = (routevalue) => {
  if(routevalue === 'signin') {
    this.setState(initialState)
  } else if (routevalue === 'home') {
    this.setState({isSignedIn: true});
  }
this.setState({route: routevalue});
}

render() {

const { imageurl, box, isSignedIn} = this.state //destructoring

  return (
    <div className="App">
     <Particles className = 'particles' params={ParticleOptions}/>
     <Navigation isSignedIn ={isSignedIn} onroutechange={this.onroutechangefunction}/>
     <Logo />
     { this.state.route === 'home' ? 
          <div>
              <Score name ={this.state.user.name} entrieamount ={this.state.user.entries}/>
              <ImageForm props = {this.onInputChange} buttonclick = {this.onSubmit}/>
              <FaceRecognition props = {imageurl} box = {box} />
          </div> :
          (
            this.state.route === 'register' ?
            <Register loadUser={this.loadUser} onroutechange={this.onroutechangefunction} /> :
            <Signin loadUser={this.loadUser} onroutechange={this.onroutechangefunction} />
          )
     }
    </div>
  );
 }
}

export default App;
