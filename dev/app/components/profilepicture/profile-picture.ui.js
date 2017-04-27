export function profilePictureSkeleton(data){
    return `
      <div class="game_container" id="profile_display">
        <div id="presentation">
          <h2>${data.pageTitle}</h2>
          <div id="video_container">
            <video id="camera" width="200" autoplay></video>
          </div>
          <div id="snapshot" class="customBtn">Take Picture</div>
          <div id="pictContainer""></div>
        </div>
      </div>
    `;
}
