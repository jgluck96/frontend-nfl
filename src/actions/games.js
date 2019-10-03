
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
