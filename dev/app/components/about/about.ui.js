// dev/app/pages/shooter/shooter.ui.js

export function aboutSkeleton(data){
    return `
      <div id="about_display">
        <h1>${data.pageTitle}</h1>
        <h2>Developer</h2>
        <p>Karl Berger</p>
        <h2>Credits</h2>
        <h3>Collision detection</h3>
        <p>Timo Hausmann quadtree</p>
        <h3>Game music</h3>
        <p>Hydrocity Zone Remix (Act 2) - Sonic 3</p>
        <p>Plasma3Music Remixes</p>
      </div>
    `;
}
