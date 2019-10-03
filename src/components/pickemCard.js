import React from 'react';
import {connect} from 'react-redux'
import $ from 'jquery'

var ODDS = {}
class PickemCard extends React.Component {

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

  teams = {
    'Philadelphia Eagles':'PHI',
    'Green Bay Packers':'GB',
    'New England Patriots':'NE',
    'Buffalo Bills':'BUF',
    'Cleveland Browns':'CLE',
    'Baltimore Ravens':'BAL',
    'Kansas City Chiefs':'KC',
    'Detroit Lions':'DET',
    'Carolina Panthers':'CAR',
    'Houston Texans':'HOU',
    'Oakland Raiders':'OAK',
    'Indianapolis Colts':'IND',
    'Los Angeles Chargers':'LAC',
    'Miami Dolphins':'MIA',
    'Washington Redskins':'WAS',
    'New York Giants':'NYG',
    'Tennessee Titans':'TEN',
    'Atlanta Falcons':'ATL',
    'Seattle Seahawks':'SEA',
    'Arizona Cardinals':'ARI',
    'Tampa Bay Buccaneers':'TB',
    'Los Angeles Rams':'LA',
    'Minnesota Vikings':'MIN',
    'Chicago Bears':'CHI',
    'Jacksonville Jaguars':'JAX',
    'Denver Broncos':'DEN',
    'Dallas Cowboys':'DAL',
    'New Orleans Saints':'NO',
    'Cincinnati Bengals':'CIN',
    'Pittsburgh Steelers':'PIT',
    'San Francisco 49ers':'SF',
    'New York Jets':'NYJ'
  }

  getDay = {
    0:'Sun',
    1:'Mon',
    2: 'Tue',
    3: 'Wed',
    4:'Thu',
    5:'Fri',
    6:'Sat'

  }

  state = {
    home: '',
    homeOdds:'',
    awayOdds:'',
    homeCity: '',
    homeName: '',
    away: '',
    awayCity: '',
    awayName: '',
    homeimg: '',
    awayimg: '',
    homeClicked: false,
    awayClicked: false,
    quarters: [],
    status: '',
    homeScore: 0,
    awayScore: 0,
    down: 0,
    yardsRemaining: 0,
    possession: '',
    lineOfScrimmage: '',
    quarterSeconds: '',
    currQuarter: 0,
    salary: 0
  }

  // oddsCheck = (obj) => {
  //   for (key in obj) {
  //     if (key.home && (this.teams[this.props.game.schedule.homeTeam.abbreviation] === key.home && )) {
  //
  //     }
  //   }
  // }

  comm = () => {
    // if (this.props.odds) {

      const foundOdds = this.props.odds.filter(game => {
        return game.league.name === 'NFL' && game.sites && this.props.game.schedule.homeTeam.abbreviation === this.teams[game.event.home] && this.props.game.schedule.awayTeam.abbreviation === this.teams[game.event.away]
      })
      // if (foundOdds.length === 0) {
      //   $('.pickem-card').addClass('inactive')
      // } else {
      if(foundOdds[0]){

        ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation]=foundOdds[0].sites.homeaway[Object.keys(foundOdds[0].sites.homeaway)[1]]
      }

  }

  oddsChecker = () => {
    if(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation]) {
       if(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[2] >= 2) {
         this.setState({awayOdds: parseInt((ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[2]-1)*100)})
       } else {
         this.setState({awayOdds: parseInt((-100)/(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[2]-1))})
       }
     }
    if(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation]) {
       if(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[1] >= 2) {
         this.setState({homeOdds: parseInt((ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[1]-1)*100)})
       } else {
         this.setState({homeOdds: parseInt((-100)/(ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation].odds[1]-1))})
       }
     }

  }

  componentDidMount() {
    const hometeam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.homeTeam.abbreviation)
    const awayteam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.awayTeam.abbreviation)
    const home = this.weekTimes[this.props.game.schedule.homeTeam.abbreviation]
    const away = this.weekTimes[this.props.game.schedule.awayTeam.abbreviation]
    const salary = 60000/this.props.gamess.length
    setTimeout(()=> {
        this.comm()
    }, 2000)
    this.oddsChecker()
    this.setState({
      home: home,
      away: away,
      salary: salary,
      homeCity: home.split(' ')[0],
      homeName: home.split(' ')[1],
      awayCity: away.split(' ')[0],
      awayName: away.split(' ')[1],
      status: this.props.game.schedule.playedStatus,
      homeimg: hometeam.officialLogoImageSrc,
      awayimg: awayteam.officialLogoImageSrc,
      currQuarter: this.props.game.score.currentQuarter ? this.props.game.score.currentQuarter : 0,
      quarterSeconds: this.props.game.score.currentQuarterSecondsRemaining ? this.props.game.score.currentQuarterSecondsRemaining : '',
      quarters: this.props.game.score.quarters ? this.props.game.score.quarters : [],
      homeScore: this.props.game.score.homeScoreTotal ? this.props.game.score.homeScoreTotal : 0,
      awayScore: this.props.game.score.awayScoreTotal ? this.props.game.score.awayScoreTotal : 0,
      down: this.props.game.score.currentDown ? this.props.game.score.currentDown : 0,
      yardsRemaining: this.props.game.score.currentYardsRemaining ? this.props.game.score.currentYardsRemaining : '',
      possession: this.props.game.score.teamInPossession ? this.props.game.score.teamInPossession.abbreviation : '',
      lineOfScrimmage: this.props.game.score.lineOfScrimmage ? {team: this.props.game.score.lineOfScrimmage.team.abbreviation, yardline: this.props.game.score.lineOfScrimmage.yardLine} : ''
    })
  }

  componentDidUpdate(prevState) {

    const hometeam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.homeTeam.abbreviation)
    const awayteam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.awayTeam.abbreviation)
    const home = this.weekTimes[this.props.game.schedule.homeTeam.abbreviation]
    const away = this.weekTimes[this.props.game.schedule.awayTeam.abbreviation]
    const salary = 60000/this.props.gamess.length
    if (prevState.game.score.currentQuarterSecondsRemaining !== this.props.game.score.currentQuarterSecondsRemaining) {
      this.setState({
        home: home,
        away: away,
        salary: salary,
        homeCity: home.split(' ')[0],
        homeName: home.split(' ')[1],
        awayCity: away.split(' ')[0],
        awayName: away.split(' ')[1],
        status: this.props.game.schedule.playedStatus,
        homeimg: hometeam.officialLogoImageSrc,
        awayimg: awayteam.officialLogoImageSrc,
        currQuarter: this.props.game.score.currentQuarter ? this.props.game.score.currentQuarter : 0,
        quarterSeconds: this.props.game.score.currentQuarterSecondsRemaining ? this.props.game.score.currentQuarterSecondsRemaining : '',
        quarters: this.props.game.score.quarters ? this.props.game.score.quarters : [],
        homeScore: this.props.game.score.homeScoreTotal ? this.props.game.score.homeScoreTotal : 0,
        awayScore: this.props.game.score.awayScoreTotal ? this.props.game.score.awayScoreTotal : 0,
        down: this.props.game.score.currentDown ? this.props.game.score.currentDown : 0,
        yardsRemaining: this.props.game.score.currentYardsRemaining ? this.props.game.score.currentYardsRemaining : '',
        possession: this.props.game.score.teamInPossession ? this.props.game.score.teamInPossession.abbreviation : '',
        lineOfScrimmage: this.props.game.score.lineOfScrimmage ? {team: this.props.game.score.lineOfScrimmage.team.abbreviation, yardline: this.props.game.score.lineOfScrimmage.yardLine} : ''
      })
    }
    if (localStorage.getItem('user')) {
      const parsedLocal = JSON.parse(localStorage.getItem('user'))
      if(prevState.user && (parsedLocal.user.pickems.length > 0 && parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].week === this.props.week)) {
        $('.mypick').remove()
        $('.my-pick').remove()
        const userteams = parsedLocal.user.pickems[parsedLocal.user.pickems.length-1].teams.split(',')
          userteams.forEach(team => {
            if(team) {
              const newDiv = document.createElement('div')
              newDiv.innerHTML = 'My Pick'
              newDiv.className ='mypick'
            $(document).find(`[data-id='${team}']`).children()[1].before(newDiv)
            $(document).find(`.pickem-card`).addClass('inactive')
            }
          })
      }
    }
  }

  picking = (e) => {
    // this.state.
    // this.props.addSalary()
    if (e.target.id === 'away') {
      // CALC SALARY WINNINGS
      let away;
      let other;
      if(this.state.awayOdds > 0) {
         away = (this.state.salary * (this.state.awayOdds/Math.pow(10, 2))) + this.state.salary;
         if(this.state.homeOdds > 0) {
           other = (this.state.salary * (this.state.homeOdds/Math.pow(10, 2))) + this.state.salary;
         } else {
           other = (this.state.salary/(Math.abs(this.state.homeOdds)/Math.pow(10, 2)))+this.state.salary
         }
      } else {
         away = (this.state.salary/(Math.abs(this.state.awayOdds)/Math.pow(10, 2)))+this.state.salary
         if(this.state.homeOdds > 0) {
           other = (this.state.salary * (this.state.homeOdds/Math.pow(10, 2))) + this.state.salary;
         } else {
           other = (this.state.salary/(Math.abs(this.state.homeOdds)/Math.pow(10, 2)))+this.state.salary
         }
      }
      // const winnings =
      this.props.addTeam(this.props.away, this.props.home, away, other, this.state.awayOdds)

      // this.setState({awayClicked: !this.state.awayClicked, homeClicked: false})
    } else {
      // CALC SALARY WINNING
      let other;
      let home;
      if(this.state.homeOdds > 0) {
         home = (this.state.salary * (this.state.homeOdds/Math.pow(10, 2))) + this.state.salary;
         if(this.state.awayOdds > 0) {
           other = (this.state.salary * (this.state.awayOdds/Math.pow(10, 2))) + this.state.salary;
         } else {
           other = (this.state.salary/(Math.abs(this.state.awayOdds)/Math.pow(10, 2)))+this.state.salary
         }
      } else {
         home = (this.state.salary/(Math.abs(this.state.homeOdds)/Math.pow(10, 2)))+this.state.salary
         if(this.state.awayOdds > 0) {
           other = (this.state.salary * (this.state.awayOdds/Math.pow(10, 2))) + this.state.salary;
         } else {
           other = (this.state.salary/(Math.abs(this.state.awayOdds)/Math.pow(10, 2)))+this.state.salary
         }
      }
      this.props.addTeam(this.props.home, this.props.away, home, other, this.state.homeOdds)
      // this.setState({homeClicked: !this.state.homeClicked, awayClicked: false})
    }
  }

  numm = {
    0: '',
    1: 'st',
    2: 'nd',
    3: 'rd',
    4: 'th'
  }

  render = () => {
    return (
      <div className='flex column'>
        <div className='game-info-container column flex justify-align'>
        {
          this.state.quarterSeconds === 0 && this.state.status === 'LIVE' ?
          <div className='box-time'>HALFTIME</div>

          :
          this.state.status === 'LIVE' ?
        <div className='box-time column'>
          {this.state.possession ? this.state.possesion === this.props.game.schedule.homeTeam.abbreviation ? <i class="fas fa-football-ball homeball"></i> : <i class="fas awayball fa-football-ball"></i> : ''}
          <div style={{fontWeight: 'normal'}}>{this.state.down + this.numm[this.state.down]} and {this.state.yardsRemaining} on {this.state.lineOfScrimmage.team} {this.state.lineOfScrimmage.yardline}</div>
          <div style={{fontWeight: 'normal'}}>{(this.state.quarterSeconds/60).toFixed(2).toString().replace('.', ':')+' '+this.state.currQuarter + '' +this.numm[this.state.currQuarter]} Qtr</div>
        </div>

        :

          <div className='box-time'>{this.state.status === 'UNPLAYED' ? this.getDay[new Date(this.props.game.schedule.startTime).getDay()] +' ' +new Date(this.props.game.schedule.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})+ ' '+new Date(this.props.game.schedule.startTime).toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2] : this.state.status === 'COMPLETED' || this.state.status === 'COMPLETED_PENDING_REVIEW' ? 'FINAL' : ''}</div>
        }
          <div className='game-info-content row flex'>
            <div className="score-gi">{this.state.awayScore}</div>
            <div className='flex column box-content'>
              <div className="flex row box-score-border">
                <div className="box-team">{this.props.game.schedule.awayTeam.abbreviation}</div>
                <div className="box-score">{this.state.quarters.length > 0 ? this.state.quarters[0].awayScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 1 ? this.state.quarters[1].awayScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 2 ? this.state.quarters[2].awayScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 3 ? this.state.quarters[3].awayScore : 0}</div>
              </div>
              <div className="flex row">
                <div className="box-team">{this.props.game.schedule.homeTeam.abbreviation}</div>
                <div className="box-score">{this.state.quarters.length > 0 ? this.state.quarters[0].homeScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 1 ? this.state.quarters[1].homeScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 2 ? this.state.quarters[2].homeScore : 0}</div>
                <div className="box-score">{this.state.quarters.length > 3 ? this.state.quarters[3].homeScore : 0}</div>
              </div>
            </div>
            <div className="score-gi">{this.state.homeScore}</div>
          </div>
        </div>
        <div className="py10">
          <div className="flex justify-align">
            <div onClick={this.picking} id='away' data-id={this.props.away} className={this.props.game.schedule.playedStatus === 'UNPLAYED' && ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation] ? 'pickem-card row' : this.props.game.schedule.playedStatus === 'COMPLETED' || this.state.status === 'COMPLETED_PENDING_REVIEW' ? this.state.awayScore > this.state.homeScore ? 'pickem-card win inactive row':'pickem-card inactive loss row' : 'pickem-card inactive row' }>
              <div className='flex column' id='away'>
                  <div id='away' style={{color: 'rgba(0,0,0,0.5)', fontSize: '13px'}}>{this.state.awayCity}</div>
                  <div id='away'>{this.state.awayName}</div>
                  <div style={{color: 'green', fontSize: '14px'}} id='away'>{this.state.awayOdds ? this.state.awayOdds >= 2 ? '+'+this.state.awayOdds : this.state.awayOdds : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}</div>
              </div>
              {this.props.teams.includes(this.props.away) ? <div className='my-pick'>My Pick</div> : null }
              <img id='away' className='pickem-img' src={this.state.awayimg} alt=''/>
            </div>
            <span className='mlr15'>@</span>
            <div onClick={this.picking} id='home' data-id={this.props.home} className={this.props.game.schedule.playedStatus === 'UNPLAYED' && ODDS[this.props.game.schedule.homeTeam.abbreviation+this.props.game.schedule.awayTeam.abbreviation] ? 'pickem-card row' : this.props.game.schedule.playedStatus === 'COMPLETED' || this.state.status === 'COMPLETED_PENDING_REVIEW' ? this.state.homeScore > this.state.awayScore ? 'pickem-card win inactive row':'pickem-card inactive loss row' : 'pickem-card inactive row' }>
              <img id='home' className='pickem-img' src={this.state.homeimg} alt=''/>
              {this.props.teams.includes(this.props.home) ? <div className='my-pick'>My Pick</div> : null }

              <div id='home' style={{alignItems: 'flex-end'}}className='flex column'>
                  <div id='home' style={{color: 'rgba(0,0,0,0.5)', fontSize: '13px'}}>{this.state.homeCity}</div>
                  <div id='home' >{this.state.homeName}</div>
                  <div style={{color: 'green', fontSize: '14px'}} id='away'>{this.state.homeOdds ? this.state.homeOdds >=2 ? '+'+this.state.homeOdds : this.state.homeOdds : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };
}

  const mapStateToProps = state => {
    return {
      refs: state.games.refs,
      user:state.user.user,
      gamess: state.games.games,
      week:state.week,
      odds: state.odds
    }
  }

export default connect(mapStateToProps, null)(PickemCard);
