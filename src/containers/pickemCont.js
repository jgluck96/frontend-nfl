import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import PickemCard from '../components/pickemCard'
import {connect} from 'react-redux'
import $ from 'jquery'

class PickemCont extends React.Component {
  state = {
    week: ''
  };

  weekTimes = {
    'Philadelphia':'PHI',
    'Green Bay':'GB',
    'New England':'NE',
    'Buffalo':'BUF',
    'Cleveland':'CLE',
    'Baltimore':'BAL',
    'Kansas City':'KC',
    'Detroit':'DET',
    'Carolina':'CAR',
    'Houston':'HOU',
    'Oakland':'OAK',
    'Indianapolis':'IND',
    'Los Angeles':'LAC',
    'Miami':'MIA',
    'Washington':'WAS',
    'NY':'NYG',
    'Tennessee':'TEN',
    'Atlanta':'ATL',
    'Seattle':'SEA',
    'Arizona':'ARI',
    'Tampa Bay':'TB',
    'Los Angeles':'LA',
    'Minnesota':'MIN',
    'Chicago':'CHI',
    'Jacksonville':'JAX',
    'Denver':'DEN',
    'Dallas':'DAL',
    'New Orleans':'NO',
    'Cincinnati':'CIN',
    'Pitsburg':'PIT',
    'San Fransisco':'SF',
    'NY':'NYJ'
  }

  submit = () => {
    let teams = ""
    const clickedd = $('.active-pick')
    for (let i=0;i<clickedd.length;i++) {
      teams+=clickedd[i].dataset.id+','
    }
    console.log(teams);
    fetch('http://localhost:3000/pickems', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        teams: teams,
        user_id: this.props.user.id,
        week: this.props.games[0].schedule.week
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(`Your picks are in for week ${this.props.games[0].schedule.week}!`)
    })
  }

  render = () => {
    console.log(this.props);
    return (
      <div className="flex column justify-align azure">
        <h1>Venmo @Joshua-Gluck</h1>
        <h3 style={{color: 'grey', marginTop: '-5px'}}>$20 Buy-in Winner Take All</h3>
      {
        this.props.games ?
        this.props.games.map(game => {
          return <PickemCard game={game} />
        })
        :
        'loading...'
      }
      <span onClick={this.submit} className={this.props.user && this.props.games ? !localStorage.getItem('user') || this.props.user.pickems[this.props.user.pickems.length-1].week === this.props.games[0].schedule.week ? 'pickem-btn inactive' : 'pickem-btn' : null}>Save</span>
      </div>
    );
  };
}

const mapStateToProps = state => {
  console.log(state);
  return {
    games: state.games.games,
    refs: state.games.refs,
    user:state.user.user

  }
}

export default connect(mapStateToProps, null)(PickemCont);
