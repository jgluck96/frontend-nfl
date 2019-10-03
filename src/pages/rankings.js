import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from '../components/modal'
import { closeModal } from '../actions/modals'


class Login extends Component {

  state = {
    rankings: [],
  }

  componentDidMount() {
    this.setState({rankings: this.props.rankings})
  }

  componentDidUpdate(prevState) {
    if (prevState.rankings !== this.props.rankings) {
      this.setState({rankings: this.props.rankings})
    }
  }


  render(){
    return (
      <Modal>
        <div className='login-content'>
          <h3>Live Rankings</h3>
          <div className='rankings-container'>
            {
              this.state.rankings.length > 0 ?
                this.state.rankings.map(user => {
                  return <div className='flex row'>{this.state.rankings.indexOf(user)+1}. <span>{user.username +': '}</span><span>{user.winnings}</span></div>
                })
              :
              null
            }
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return{
  rankings:state.rankings
}
}

export default connect(mapStateToProps,null)(Login)
