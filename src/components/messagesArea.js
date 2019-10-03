import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'

class MessagesArea extends React.Component {

  render(){
  return (
    <div className="messagesArea">
      <div className='area-container'>
        <ul className='scroll-msg' style={{padding: '0'}}>{orderedMessages(this.props.messages)}</ul>
      </div>

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

  // $(".scroll-msg").stop().animate({ scrollTop: $(".scroll-msg")[0].scrollHeight}, 1000);
  return sortedMessages.map(message => {
    return <li key={message.id}><div style={{color: 'crimson'}} className='flex column ptb-5'><span style={{fontSize: '10px', color: 'grey'}}>{new Date(message.created_at).toLocaleDateString()}</span><span style={{fontSize: '15px'}}>{message.username + ': '}<span style={{fontSize: '14px', color: 'rgba(0,0,0,0.7)'}}>{message.content}</span></span></div></li>;
  });

} catch(e) {

}
};
