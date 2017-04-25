export const AUDIO_TYPE = {
  MUSIC  : 'game_music',
  FIRE   : 'sfx_laser1',
  EXPL_1 : 'expl_01',
  EXPL_2 : 'expl_02'
}

export class AudioManager {
  constructor(audioObjects){
    this.audios = audioObjects;
  }

  startMusic(){
    this.audios['game_music'].play();
  }

  pauseMusic(){
    this.audios['game_music'].pause();
  }

  playFire(){
    this._playAudio(AUDIO_TYPE.FIRE);
  }

  playExpl1(){
    this._playAudio(AUDIO_TYPE.EXPL_1);
  }

  playExpl2(){
    this._playAudio(AUDIO_TYPE.EXPL_2);
  }

  _playAudio(audioType){
    if(!this.audios[audioType].paused){
      this.audios[audioType].currentTime = 0;
    }
    this.audios[audioType].play();
  }

}
