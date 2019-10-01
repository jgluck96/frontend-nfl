import React from 'react';
import GamesCont from '../containers/gamesCont'
import Home from './home'
import Pickem from './pickem'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConversationsList from '../components/conversationsList';
import {fetchGames} from '../actions/games'
import {connect} from 'react-redux'
import Nav from '../components/nav'
import Login from './login'
import {login} from '../actions/users'
import Signup from './signup'
import $ from 'jquery'

class Main extends React.Component {
  state = {
    title: ''
  };

  componentDidMount() {
    this.props.fetchGames()
    if (localStorage.getItem('user')) {
      const parsedLocal = JSON.parse(localStorage.getItem('user'))
      this.props.login(parsedLocal)
      console.log(typeof parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].week, typeof this.props.week);
      if(parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].week === this.props.week) {
        console.log('yesss');
      }
    }
    // if (this.props.user) {
    //   console.log(this.props.user.pickems[this.props.user.pickems.length-1].week);
    //   const userteams = this.props.user.pickems[this.props.user.pickems.length-1].teams.split(',')
    //   console.log(userteams);
    // }
  }

  componentDidUpdate(prevState) {
    if (localStorage.getItem('user')) {
      const parsedLocal = JSON.parse(localStorage.getItem('user'))
      if(prevState.user && parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].week === this.props.week) {
        $('.mypick').remove()
        const userteams = this.props.user.pickems[this.props.user.pickems.length-1].teams.split(',')
          console.log(prevState.user, userteams);
          userteams.forEach(team => {
            if(team) {
            $(document).find(`[data-id='${team}']`).append(`<div className='mypick'>My Pick</div>`)
            $(document).find(`.pickem-card`).addClass('inactive')
            }
          })
      }
    }
  }

  render = () => {
    return (
      <div className="">
        <Nav />
        <GamesCont />
        <Switch onUpdate={() => window.scrollTo(0, 0)}>
          <Route exact path='/' component={Home} />
          <Route path='/' component={Pickem} />
        </Switch>
        {
          this.props.loginModal ?
          <Login />
          :
          this.props.signupModal ?
          <Signup />
          :
          null
        }
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loginModal: state.modals.loginModal,
    signupModal: state.modals.signupModal,
    week: state.week,
    user: state.user.user
  }
}

export default connect(mapStateToProps, {fetchGames, login})(Main);
// <Switch onUpdate={() => window.scrollTo(0, 0)}>
//   <Route exact path='/' component={Home} />
// </Switch>
