import React from 'react';
import {connect} from 'react-redux'
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
    'PIT':'Pitsburgh Steelers',
    'SF':'SF 49ers',
    'NYJ':'NY Jets'
  }

  state = {
    home: '',
    homeCity: '',
    homeName: '',
    away: '',
    awayCity: '',
    awayName: '',
    homeimg: '',
    awayimg: '',
    homeClicked: false,
    awayClicked: false
  }

  componentDidMount() {
    const hometeam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.homeTeam.abbreviation)
    const awayteam = this.props.refs.find(team => team.abbreviation === this.props.game.schedule.awayTeam.abbreviation)
    const home = this.weekTimes[this.props.game.schedule.homeTeam.abbreviation]
    const away = this.weekTimes[this.props.game.schedule.awayTeam.abbreviation]
    this.setState({
      home: home,
      away: away,
      homeCity: home.split(' ')[0],
      homeName: home.split(' ')[1],
      awayCity: away.split(' ')[0],
      awayName: away.split(' ')[1],
      homeimg: hometeam.officialLogoImageSrc,
      awayimg: awayteam.officialLogoImageSrc
    })
  }

  picking = (e) => {
    console.log(e.target)
    if (e.target.id === 'away') {
      this.setState({awayClicked: !this.state.awayClicked, homeClicked: false})
    } else {
      this.setState({homeClicked: !this.state.homeClicked, awayClicked: false})
    }
  }

  render = () => {
    return (
      <div className="py10">
        <div className="flex justify-align">
          <div onClick={this.picking} id='away' data-id={this.state.awayName} className={this.state.awayClicked ? 'pickem-card active-pick row' : 'pickem-card row'}>
            <div className='flex column' id='away'>
                <div id='away' style={{color: 'rgba(0,0,0,0.5)', fontSize: '13px'}}>{this.state.awayCity}</div>
                <div id='away' >{this.state.awayName}</div>
            </div>
            {this.state.awayClicked ? <div className='my-pick'>My Pick</div> : null }
            <img id='away' style={{width: '50px', height: '50px'}} src={this.state.awayimg} alt=''/>
          </div>
          <span className='mlr15'>@</span>
          <div onClick={this.picking} id='home' data-id={this.state.homeName} className={this.state.homeClicked ? 'pickem-card active-pick row' : 'pickem-card row'}>
            <div id='home' className='flex column'>
                <div id='home' style={{color: 'rgba(0,0,0,0.5)', fontSize: '13px'}}>{this.state.homeCity}</div>
                <div id='home' >{this.state.homeName}</div>
            </div>
            {this.state.homeClicked ? <div className='my-pick'>My Pick</div> : null }
            <img id='home' style={{width: '50px', height: '50px'}} src={this.state.homeimg} alt=''/>
          </div>
        </div>
      </div>
    );
  };
}

  const mapStateToProps = state => {
    return {
      refs: state.games.refs
    }
  }

export default connect(mapStateToProps, null)(PickemCard);
