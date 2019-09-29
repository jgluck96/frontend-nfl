import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {closeModal} from '../actions/modals'
import $ from 'jquery'

class Modal extends Component {

  componentDidMount() {
    if (this.props.modals.login || this.props.modals.signup) {
      setTimeout(() => $('.modal').addClass('drop'),0)
    }
  }

  closeModal = () => {
    this.props.closeModal()
    $('#root').removeClass('modal-overflow')
  }

  render() {
    return (
      <Fragment>
      <div className='modal-background' onClick={this.closeModal}>
      </div>
      <div className={'modal login-modal'}>
        <div onClick={this.closeModal} className='exit-container'>
          <div className='exit-cross1'></div>
          <div className='exit-cross2'></div>
        </div>
      {this.props.children}
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    modals: state.modals
  }
}

export default connect(mapStateToProps, {closeModal})(Modal)
