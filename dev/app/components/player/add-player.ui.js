export function addPlayerSkeleton(data){
  return `
    <div id="player_display">
      <h1>${data.pageTitle}</h1>
      <input id="username" size="40"/>
      <button type="button" id="addPlayer" type="text">Add</button>
      <ul id="players_list"></ul>
    </div>
  `;
}
