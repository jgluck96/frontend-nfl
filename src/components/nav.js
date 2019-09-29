import React, {Component, Fragment} from 'react'
import { NavLink } from "react-router-dom";
import {openLogin, openSignup} from '../actions/modals'
import {logout} from '../actions/users'
import {connect} from 'react-redux'
class Nav extends Component {

  login = () => {
    this.props.openLogin()
    document.getElementById('root').setAttribute('class', 'modal-overflow')
  }
  signup = () => {
    this.props.openSignup()
    document.getElementById('root').setAttribute('class', 'modal-overflow')
  }




  render(){
    return (
      <div>
        <ul className='navbar'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
            Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/pickem'>
            Pick'em
            </NavLink>
          </li>
          {
            localStorage.getItem('user') ?
          <Fragment>
            <li onClick={()=> this.props.logout()} className='nav-item'>
              <a className='nav-link' href='/'>
              Logout
              </a>
            </li>
          </Fragment>
          :
          <Fragment>
            <li className='nav-item' onClick={this.login}>
              <div className='nav-link'>
              Log in
              </div>
            </li>
            <li className='nav-item' onClick={this.signup}>
              <div className='nav-link'>
              Sign up
              </div>
            </li>
          </Fragment>
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, {openLogin, logout, openSignup})(Nav)
