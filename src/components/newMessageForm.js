import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import {connect} from 'react-redux'
class NewMessageForm extends React.Component {
  state = {
    content: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.content,
        conversation_id: this.state.conversation_id,
        user_id: this.props.user ? this.props.user.id : 0
      })
    });
    this.setState({ content: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(NewMessageForm);
