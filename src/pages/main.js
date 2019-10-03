import React from 'react';
import GamesCont from '../containers/gamesCont'
import Home from './home'
import Pickem from './pickem'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConversationsList from '../components/conversationsList';
import {fetchGames, fetchOdds} from '../actions/games'
import {connect} from 'react-redux'
import Nav from '../components/nav'
import Login from './login'
import {login} from '../actions/users'
import Signup from './signup'
import Rankings from './rankings'
import PickemPrize from './pickemPrize'
import $ from 'jquery'

class Main extends React.Component {
  state = {
    title: ''
  };

  componentDidMount() {
    fetch('https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=1662f5f588b8442c9655707b64bf78f8')
    .then(res=> res.json()).then(week => {
      this.props.fetchGames(week)
      this.props.fetchOdds(week)
    })

    if (localStorage.getItem('user')) {
      const parsedLocal = JSON.parse(localStorage.getItem('user'))
      this.props.login(parsedLocal)

    }
    // if (this.props.user) {
    //   console.log(this.props.user.pickems[this.props.user.pickems.length-1].week);
    //   const userteams = this.props.user.pickems[this.props.user.pickems.length-1].teams.split(',')
    //   console.log(userteams);
    // }
  }

  weekTimes = {
    'PHI':'Philadelphia Eagles',
    'GB':'GB Packers',
    'NE':'NE Patriots',
    'BUF':'Buffalo Bills',
    'CLE':'Cleveland Browns',
    'BAL':'Baltimore Ravens',
    'KC':'KC Chiefs',
    'DET':'Detroit Lions',
    'CAR':'Carolina Panthers',
    'HOU':'Houston Texans',
    'OAK':'Oakland Raiders',
    'IND':'Indianapolis Colts',
    'LAC':'LA Chargers',
    'MIA':'Miami Dolphins',
    'WAS':'Washington Redskins',
    'NYG':'NY Giants',
    'TEN':'Tennessee Titans',
    'ATL':'Atlanta Falcons',
    'SEA':'Seattle Seahawks',
    'ARI':'Arizona Cardinals',
    'TB':'TB Buccaneers',
    'LA':'LA Rams',
    'MIN':'Minnesota Vikings',
    'CHI':'Chicago Bears',
    'JAX':'Jacksonville Jaguars',
    'DEN':'Denver Broncos',
    'DAL':'Dallas Cowboys',
    'NO':'NO Saints',
    'CIN':'Cincinnati Bengals',
    'PIT':'Pittsburgh Steelers',
    'SF':'SF 49ers',
    'NYJ':'NY Jets'
  }

  componentDidUpdate(prevState) {
    // if (localStorage.getItem('user')) {
    //   const parsedLocal = JSON.parse(localStorage.getItem('user'))
    //   // console.log(prevState.user, prevState);
    //   if(this.props.user && (parsedLocal.user.pickems.length > 0 && parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].week === this.props.week)) {
    //     console.log('innn');
    //     $('.mypick').remove()
    //     const userteams = this.props.user.pickems[this.props.user.pickems.length-1].teams.split(',')
    //       userteams.forEach(team => {
    //         if(team) {
    //           console.log($(document).find(`[data-id='${team}']`), team);
    //           const newDiv = document.createElement('div')
    //           newDiv.innerHTML = 'My Pick'
    //           newDiv.className ='mypick'
    //         $(document).find(`[data-id='${team}']`).children()[1].before(newDiv)
    //         $(document).find(`.pickem-card`).addClass('inactive')
    //         }
    //       })
    //   }
    // }
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
          this.props.pickemModal ?
          <PickemPrize />
          :
          this.props.rankingsModal ?
          <Rankings />
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
    pickemModal: state.modals.pickemModal,
    rankingsModal: state.modals.rankingsModal,
    week: state.week,
    user: state.user.user,
    odds: state.odds
  }
}

export default connect(mapStateToProps, {fetchGames, fetchOdds, login})(Main);
// <Switch onUpdate={() => window.scrollTo(0, 0)}>
//   <Route exact path='/' component={Home} />
// </Switch>
