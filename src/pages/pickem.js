import React from 'react';
import PickemCont from '../containers/pickemCont'
import ConversationsList from '../components/conversationsList';


class Main extends React.Component {
  state = {
    title: ''
  };



  render = () => {
    return (
      <div className="">
        
        <PickemCont />
        <ConversationsList />

      </div>
    );
  };
}

export default Main;
