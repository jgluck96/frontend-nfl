import React, {Fragment} from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import NewConversationForm from './newConversationForm';
import MessagesArea from './messagesArea';
import NewMessageForm from './newMessageForm';
import Cable from './cable';
import $ from 'jquery'

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
    clicked: false
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations })).then(setTimeout(()=>this.handleClick(8),1000))
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    console.log(response);
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  closeChat = () => {
    // $('conversationsList').addClass('collapse')
    this.setState({clicked: !this.state.clicked})
    if (this.state.clicked) {
      $('.conversationsList').height('auto')
    } else {

      $('.conversationsList').animate({height:20},500)
    }
  }

  render = () => {
    console.log(this.state);
    const { conversations, activeConversation } = this.state;
    return (
    <Fragment>

      <div className={this.state.clicked ? "conversationsList collapse-chat" : "conversationsList"}>
        <div onClick={this.closeChat} className='exit-chat'>
          <div className={this.state.clicked ? 'enter-chat1' : 'exit-chat1'}></div>
          <div className={this.state.clicked ? 'enter-chat2' : 'exit-chat2'}></div>
        </div>
        <ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length > 0 ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div style={{textAlign: 'center', curser: 'pointer'}}>Chat</div>
        {activeConversation ? (
          <MessagesArea
            id={8} title={'football'} messages={this.state.conversations.length > 0 ? this.state.conversations[0].messages : null}
          />
        ) : null}
        <NewMessageForm conversation_id={8} />
      </div>
      </Fragment>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return 8

};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};
