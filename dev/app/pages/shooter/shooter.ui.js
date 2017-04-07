// dev/app/pages/shooter/shooter.ui.js

export function shooterSkeleton(data){
    return `
      <div class="game_container" id="game_display">
        <h1>${data.gameTitle}</h1>
        <canvas id="shooterCanvas" width="900" height="320"></canvas>
        <div id="ships_display">
          <h1>${data.shipsHeader}</h1>
          <ul id="ships_list"></ul>
        </div>
        <div id="board">
          <button type="button" name="play" id="play">Play</button>
          <button type="button" name="pause" id="pause">Pause</button>
          <h1 id="score">Score: <span></span></h1>
        </div>
      </div>
    `
}
