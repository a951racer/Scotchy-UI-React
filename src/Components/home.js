import React, { Component } from 'react';


import '../App.css'
import ScotchList from './ScotchList'
import Login from './Login'
import PageHeader from './PageHeader'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.setState({loggedIn: true})
  }

  render () {
    return (
      this.state.loggedIn ?
      <>
        <PageHeader title="Your Scotch Cabinet" />
        <ScotchList />
      </> : 
      <Login onSubmit={this.onSubmit}/>
    )
  }
}

export default Home