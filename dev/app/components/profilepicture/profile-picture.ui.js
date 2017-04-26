export function profilePictureSkeleton(data){
    return `
      <div class="game_container" id="profile_display">
        <div id="presentation">
          <h1>${data.pageTitle}</h1>
          <div id="video_container">
            <video id="camera" width="200" autoplay></video>
          </div>
          <div id="snapshot" class="customBtn">Take Picture</div>
          <div id="pictContainer""></div>
        </div>
      </div>
    `;
}
