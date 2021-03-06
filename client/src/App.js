import React, { Component } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {!this.state.loggedIn ?
        // if user not logged in,  force login
        <Switch>
          <Route
          path="/signup"
          render={() =>
            <Signup/>}
          />

          <Route  //no path on this route means it is a catch-all
          render={() =>
              <LoginForm
                updateUser={this.updateUser}
              />
            }
          />

        </Switch>
        :
        //if user is logged in

          <Switch>
            {/* build out more routes here */}
            <Route
            component={Home} />
          </Switch>
        }

       
        
        

      </div>
    );
  }
}

export default App;
