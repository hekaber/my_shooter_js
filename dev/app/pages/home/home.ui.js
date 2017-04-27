// dev/app/pages/home/home-ui.js

export function homeSkeleton(data){
// return page skeleton
  return `
    <section id="main_container" class="home_container displayBackground">
      <div class="title">
        <h1>${data.pageTitle}</h1>
        <nav class="clearfix">
          <ul>
            <li><div id="startBtn" class="customBtn">Start Game</div></li>
            <li><div id="scoresBtn" class="customBtn">High Scores</div></li>
            <li><div id="aboutBtn" class="customBtn">About</div></li>
          </ul>
        </nav>
      </div>
      <div id="home_content">
      </div>
    </section>
  `;
}
