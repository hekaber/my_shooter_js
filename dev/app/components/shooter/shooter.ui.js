// dev/app/pages/shooter/shooter.ui.js

export function shooterSkeleton(data){
    return `
      <div class="game_container" id="game_display">
        <canvas id="shooterCanvas" width="980" height="500"></canvas>
        <div id="log"></div>
        <div id="board">
          <div id="play" class="customBtn">Play</div>
          <div id="pause" class="customBtn">Pause</div>
        </div>
      </div>
    `;
}
