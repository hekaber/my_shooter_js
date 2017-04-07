// dev/app/pages/home/home-ui.js

export function homeSkeleton(data){
// return page skeleton
  return `
    <section class="home_container displayBackground">
      <h1>${data.pageTitle}</h1>
      <div id="player_display">
        <h1>Players</h1>
        <input id="username" size="40"/>
        <button type="button" id="add_user" type="text">Add</button>
        <ul id="players_list"></ul>
      </div>
    </section>
  `;
}
