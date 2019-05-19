import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './component/header/Header'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'
import DisplayNamePage from './page/displayName/DisplayNamePage'
import AddMoviePage from './page/addMovie/AddMoviePage'
import TestPage from './page/test/TestPage'

class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={() => {

          if (this.props.user && this.props.user.displayName) {
            return <HomePage />

          } else if (this.props.user) {
            return <Redirect to="/display-name" />

          } else {
            return <Redirect to="/login" />
          }

        }} />
        <Route path="/movie/add" component={AddMoviePage} />

        <Route path="/login" component={() => {
          if (this.props.user) {
            return <Redirect to="/" />
          } else {
            return <LoginPage />
          }
        }} />
        <Route path="/signup" component={() => {
          if (this.props.user) {
            return <Redirect to="/" />
          } else {
            return <SignupPage />
          }
        }} />
        <Route path="/display-name" component={() => {
          if (this.props.user && this.props.user.displayName) {
            return <Redirect to="/" />

          } else if (this.props.user) {
            return <DisplayNamePage />

          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/test" component={TestPage} />

      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(App);
