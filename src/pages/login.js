import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from '../components/modal'
import { login } from '../actions/users'
import { closeModal } from '../actions/modals'
import {  HEADERS } from '../constants'
import $ from 'jquery'

class Login extends Component {

  state = {
    username: '',
    errors: ''
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: ''
    })
  }

  submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({username: this.state.username})
    }).then(res => res.json())
    .then(user => {
      if (user.error) {
        console.log(user);
        this.setState({errors: user.errors})
      } else {
        this.props.login(user)
        this.props.closeModal()
    $('#root').removeClass('modal-overflow')

      }
    })
  }

  render(){
    return (
      <Modal>
        <div className='login-content'>
          <h3>Login</h3>
          <span style={{color: 'red'}}>{this.state.errors ? this.state.errors : ''}</span>
          <label>Username:</label>
          <input name='username' onChange={this.changeHandler} value={this.state.username}/>
          <span className='pickem-btn' onClick={this.submit}>login</span>
        </div>
      </Modal>
    )
  }
}

export default connect(null, {login, closeModal})(Login)
