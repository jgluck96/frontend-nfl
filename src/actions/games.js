
export const fetchGames = () => {
 return (dispatch) => {
   fetch('https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=1662f5f588b8442c9655707b64bf78f8')
   .then(res => res.json()).then(week => {
     fetch(`https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/${week}/games.json`,{
       method: 'GET',
       headers: {
         "Authorization": "Basic " + btoa('9e4bd2ea-1f12-4ae1-b062-6c2d0f' + ":" + 'MYSPORTSFEEDS')
       }
     })
     .then(res => res.json())
     .then(data => {
       dispatch({type:'FETCH_GAMES', payload: {games: data.games, refs: data.references.teamReferences}})
       dispatch({type: 'WEEK', payload: week})
    })
   })
 }
}
