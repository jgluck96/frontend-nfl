
export const fetchGames = (week) => {
 return (dispatch) => {

     fetch(`https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/${week}/games.json`,{
       method: 'GET',
       headers: {
        "Authorization": "Basic " + btoa('9e4bd2ea-1f12-4ae1-b062-6c2d0f' + ":" + 'MYSPORTSFEEDS')
       }
     }).then(res => res.json())
     .then(data => {
       dispatch({type:'FETCH_GAMES', payload: {games: data.games, refs: data.references.teamReferences}})
       dispatch({type: 'WEEK', payload: week})
    })
      setInterval( () => {
        fetch(`https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/${week}/games.json`,{
          method: 'GET',
          headers: {
           "Authorization": "Basic " + btoa('9e4bd2ea-1f12-4ae1-b062-6c2d0f' + ":" + 'MYSPORTSFEEDS')
          }
        }).then(res => res.json())
        .then(data => {
          dispatch({type:'FETCH_GAMES', payload: {games: data.games, refs: data.references.teamReferences}})
          dispatch({type: 'WEEK', payload: week})

          fetch('http://localhost:3000/team_odds')
          .then(res=> res.json())
          .then(teamOdds => {
            const oddsCurrWeek = teamOdds.filter(team => team.week === week)
            const grouped = getGroupedBy(oddsCurrWeek, "user_id")
            function getGroupedBy(persons, key) {
              var groups = {}, result = [];
              persons.forEach(function (a) {
                  if (!(a[key] in groups)) {
                      groups[a[key]] = [];
                      result.push(groups[a[key]]);
                  }
                  groups[a[key]].push(a);
              });
              return result;
          }
          // console.log(grouped);
          const leaderboard = []
          const gg = grouped.map(userGroup => {
            let totalWinnings = 0;
            let username = ''
            userGroup.forEach(teamOdd => {
              const gameFound = data.games.find(game => game.schedule.awayTeam.abbreviation === teamOdd.name || game.schedule.homeTeam.abbreviation === teamOdd.name)
              if(gameFound){
                let winningTeam;
                if(gameFound.score.awayScoreTotal !== null){
                  if (gameFound.score.awayScoreTotal > gameFound.score.homeScoreTotal) {
                    winningTeam = gameFound.schedule.awayTeam.abbreviation
                  } else {
                    winningTeam = gameFound.schedule.homeTeam.abbreviation
                  }

                  if (winningTeam === teamOdd.name) {
                    totalWinnings+=teamOdd.winnings
                  }
                  username=teamOdd.user.username
                } else {
                  username=teamOdd.user.username
                }
              }
            })
            return {username:username, winnings: totalWinnings}
            username=''
            totalWinnings = 0
          })
          const sortedWinnings = gg.sort(function(a, b){
            return b.winnings-a.winnings
          })
          dispatch({type: 'RANKINGS', payload: sortedWinnings})
            // for(let i = 0; i<oddsCurrWeek; i++){
            //
            // }
          })

       })
     }, 10000)


 }
}



export const fetchOdds = () => {
   return (dispatch) => {
     fetch('https://app.oddsapi.io/api/v1/odds?sport=american-football&country=usa&apikey=adde1ac0-e4af-11e9-a06a-a7f3dafb5df3')
     .then(res => res.json()).then(odds=> {
       dispatch({type: 'FETCH_ODDS', payload: odds})
     })
   }
}
