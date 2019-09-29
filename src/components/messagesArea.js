import React from 'react';
import NewMessageForm from './newMessageForm';
import {connect} from 'react-redux'

class MessagesArea extends React.Component {
  render(){
  return (
    <div className="messagesArea">
      <div className='area-container'>
        <ul style={{padding: '0'}}>{orderedMessages(this.props.messages)}</ul>
      </div>
      <NewMessageForm conversation_id={this.props.id} />
    </div>
  )}
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(MessagesArea);

// helpers

const orderedMessages = messages => {
  try {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map(message => {
    return <li key={message.id}><span style={{fontSize: '10px', color: 'grey'}}>{new Date(message.created_at).toLocaleDateString()+' '}</span>{message.content}</li>;
  });
} catch(e) {

}
};
