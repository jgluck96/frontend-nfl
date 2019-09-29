import React from 'react';
// import { API_ROOT, HEADERS } from '../constants';


class GamesCont extends React.Component {
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

  componentDidMount() {
    // GAMES FOR CURRENT WEEK, POSSIBLE LIVE GAME INFO???


    // LIVE GAME SCORES
    // fetchJsonp('http://www.espn.com/nfl/bottomline/scores', {
    //   method: 'GET',
    //   headers: HEADERS
    // })
    // .then(console.log)
  }

  render = () => {
    console.log(this.state);
    return (
      <div className="">

      </div>
    );
  };
}

export default GamesCont;
