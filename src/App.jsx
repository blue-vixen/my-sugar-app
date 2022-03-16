import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader';
import { SugarApp } from './pages/SugarApp';
import { UserRecords } from './pages/UserRecords';
import { StatisticsPage } from './pages/StatisticsPage';
import { RecordEdit } from './pages/RecordEdit';
import { SigninSignupPage } from './pages/SigninSignupPage';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './store/actions/userActions';

class _App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <Router>
        < div className="App" >
          <AppHeader />
          <main className='container'>
            <Switch>
              <Route component={RecordEdit} path='/record/edit/:id?' />
              <Route component={StatisticsPage} path='/statistics' />
              <Route component={SigninSignupPage} path='/login' />
              <Route component={UserRecords} path='/my-records' />
              <Route component={SugarApp} path='/' />
            </Switch>
          </main>
        </div >
      </Router >
    );
  }
}

// const mapStateToProps = (state) => {
//   const { currentUser } = state.userModule
//   return { currentUser: currentUser }
// }

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export const App = connect(null, mapDispatchToProps)(_App);
