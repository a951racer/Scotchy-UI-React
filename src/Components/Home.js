import React, { Component } from 'react';
import { connect } from 'react-redux'

import '../App.css'
import ScotchList from './Scotch/ScotchList'
import Login from './Login'
import PageHeader from './PageHeader'

class Home extends Component {

  render () {
    return (
      this.props.userStatus === 'loggedIn' ?
      <>
        <PageHeader title="Your Scotch Cabinet" />
        <ScotchList />
      </> : 
      <Login />
    )
  }
}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus
})

export default connect(mapStateToProps)(Home)