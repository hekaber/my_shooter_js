// dev/app/pages/shooter/shooter.ui.js

export function shooterSkeleton(data){
    return `
      <div class="game_container" id="game_display">
        <h1>${data.gameTitle}</h1>
        <canvas id="shooterCanvas" width="980" height="500"></canvas>
        <div id="ships_display">
          <h1>${data.shipsHeader}</h1>
          <ul id="ships_list"></ul>
        </div>
        <div id="log"></div>
        <div id="board">
          <div id="play" class="customBtn">Play</div>
          <div id="pause" class="customBtn">Pause</div>
        </div>
      </div>
    `;
}
