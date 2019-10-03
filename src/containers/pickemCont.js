import React from 'react';
import { HEADERS } from '../constants';
import PickemCard from '../components/pickemCard'
import {connect} from 'react-redux'
import {openPickemPrize, openRankings} from '../actions/modals'
import {updateUser} from '../actions/users'
import CountUp from 'react-countup';

import $ from 'jquery'

class PickemCont extends React.Component {
  state = {
    week: '',
    games: '',
    teams: '',
    remaining: 60000,
    salary: 0,
    teamOdds: []
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



  componentDidMount() {
    this.setState({games: this.props.games})
  }

  componentDidUpdate(prevState) {
    if (prevState.games !== this.props.games) {

      this.setState({games: this.props.games})
    }
  }

  submit = () => {
    // let teams = ""
    // const clickedd = $('.active-pick')
    // for (let i=0;i<clickedd.length;i++) {
    //   teams+=clickedd[i].dataset.id+','
    // }
    fetch('http://localhost:3000/pickems', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        teams: this.state.teams,
        user_id: this.props.user.id,
        week: this.props.games[0].schedule.week,
        salary: this.state.salary.toFixed(4)
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(`Your picks are in for week ${this.props.week}!`)
      // this.props.updateUser(data)
      // $('.mypick').remove()
      // $('.my-pick').remove()
      // const userteams = data.user.pickems[data.user.pickems.length-1].teams.split(',')
      //   userteams.forEach(team => {
      //     if(team) {
      //       const newDiv = document.createElement('div')
      //       newDiv.innerHTML = 'My Pick'
      //       newDiv.className ='mypick'
      //     $(document).find(`[data-id='${team}']`).children()[1].before(newDiv)
      //     $(document).find(`.pickem-card`).addClass('inactive')
      //     }
      //   })
      this.props.updateUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      this.state.teamOdds.map(team => {
        fetch('http://localhost:3000/team_odds', {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({
            odds: team.odds,
            user_id: this.props.user.id,
            name: team.name,
            week: team.week,
            winnings: team.winnings
          })
        })
      })
      this.setState({
        week: '',
        games: '',
        teams: '',
        remaining: 60000,
        salary: 0,
        teamOdds: []

      })
    })
  }

  // addSalary = (e) => {
  //   const potential = this.state.salary + e.target.value
  //   this.setState({salary: potential})
  // }

  addTeam = (team1, team2, team1Money, team2Money, odds) => {
    const adjust = this.state.teams.split(',')

    if (!adjust[0]) {
      adjust.shift()
    }

    if (adjust.includes(team1)) {
      const index1 = adjust.indexOf(team1)
      adjust.splice(index1,1)
      const newTeams = this.state.teamOdds.filter(team => team.name !== team1)
      this.setState({teams: adjust.join(','), teamOdds: newTeams, remaining: this.state.remaining+(60000/this.props.games.length), salary: this.state.salary-team1Money}, ()=> console.log(this.state.teamOdds))
    } else {
      const index2 = adjust.indexOf(team2)
      let money = this.state.salary + team1Money
      let remaining = this.state.remaining-(60000/this.props.games.length)
      let newTeams = [...this.state.teamOdds,{name: team1, winnings: team1Money, week: this.props.week, odds: odds}]
      if(index2 != -1) {
        money-=team2Money
        remaining += (60000/this.props.games.length)
        adjust.splice(index2,1)
        newTeams = newTeams.filter(team => team.name !== team2)
      }
      adjust.push(team1)
      // [{name:.., odds:..., week:.., winnings: ..., week: this.props.week}]

      this.setState({teams: adjust.join(','), remaining: remaining, salary: money, teamOdds: newTeams}, ()=> console.log(this.state.teamOdds))

    }
  }

  render = () => {

    return (
      <div className="flex column justify-align azure">
        <h2>Venmo @Joshua-Gluck</h2>
        <h3 style={{color: 'grey', marginTop: '-5px'}}><span style={{color: 'blue', cursor: 'pointer'}} onClick={()=>this.props.openRankings()}>Live Rankings </span>$20 Buy-in Winner Take All <span style={{color: 'blue', cursor: 'pointer'}} onClick={()=>this.props.openPickemPrize()}>Prize Layout</span></h3>
        <h4>Instructions: Pick your game-winners wisely as your profits from games you won will be accummulated. </h4>
        <div style={{fontSize:'25px'}}><span>Salary Remaining:</span>
          <CountUp
            className="custom-count"
            end={this.state.remaining}
            start={0}
            duration={1}
            useEasing={true}
            separator=","
            decimal="."
            prefix=" $"
            onComplete={this.onComplete}
            onStart={this.onStart}
          />
        </div>
      {
        this.state.games ?
        this.state.games.map(game => {
          return <PickemCard home={game.schedule.homeTeam.abbreviation} away={game.schedule.awayTeam.abbreviation} addTeam={this.addTeam} teams={this.state.teams.split(',')} key={Math.random()} game={game} />
        })
        :
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      }
      <span onClick={this.submit} className={this.props.user && this.props.games ? !localStorage.getItem('user') || (this.props.user.pickems.length > 0 && this.props.user.pickems[this.props.user.pickems.length-1].week === this.props.games[0].schedule.week) ? 'pickem-btn inactive' : 'pickem-btn' : 'pickem-btn inactive'}>Submit</span>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    games: state.games.games,
    refs: state.games.refs,
    week: state.week,
    user:state.user.user

  }
}

export default connect(mapStateToProps, {openPickemPrize, openRankings, updateUser})(PickemCont);
