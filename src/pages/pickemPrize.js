import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from '../components/modal'
// import { login } from '../actions/users'
// import { closeModal } from '../actions/modals'

class Pickem extends Component {


  render(){
    return (
      <Modal>
        <div className='login-content'>
          <h3>Prize Structure</h3>
          <div style={{border:'1px solid black'}} className="flex row">
            <div style={{background: 'rgba(0,0,0,0.1)', borderRight:'1px solid black'}} className="flex column">
              <div style={{padding:'5px'}}>Top 10%</div>
              <div style={{borderTop: '1px solid black', padding:'5px',borderBottom: '1px solid black'}}>Top 20%</div>
              <div style={{padding:'5px'}}>Top 30%</div>
            </div>
            <div className="flex column">
              <div style={{padding:'5px'}}>60% of pot</div>
              <div style={{borderTop: '1px solid black', padding: '5px',borderBottom: '1px solid black'}}>25% of pot</div>
              <div style={{padding:'5px'}}>10% of pot</div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default Pickem
