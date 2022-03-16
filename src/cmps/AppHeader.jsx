import React from 'react';
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/imgs/logo2.svg';
import { connect } from 'react-redux';
import { auth } from '../firebase/firebase.utils'

export function _AppHeader({ currentUser }) {
    return (
        <header className='app-header'>
            <section className='container'>
                <NavLink to='/' className='logo-container'>
                    <Logo />

                </NavLink>
                <nav>
                    <NavLink activeClassName='my-active' exact to='/'>Home</NavLink>
                    {/* <NavLink activeClassName='my-active' to='/statistics'>Statistics</NavLink> */}
                    <NavLink activeClassName='my-active' to='/my-records'>Records</NavLink>
                    {currentUser ?
                        <a href='/' onClick={() => auth.signOut()}>Sign Out</a> :
                        <NavLink activeClassName='my-active' to='/login'>Sign in</NavLink>
                    }
                </nav>
            </section>
        </header>
    )
}

const mapStateToProps = (state) => {
    const { currentUser } = state.userModule
    return { currentUser: currentUser }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)