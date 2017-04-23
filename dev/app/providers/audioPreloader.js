export class AudioPreloader{
  constructor(audios){
    /*
    Sounds is an array of paths
    */
    this.nProcessed = 0;
    this._aAudios = {};
    this.nAudios = audios.length;
    this.audios = audios;
  }

  load(){
    return new Promise(
      (resolve, reject) => {
        for(let i=0; i < this.nAudios; i++){
          document.getElementById('log').insertAdjacentHTML('beforeend',
          '<span> Loading sound ' + this.audios[i] + ', </span></br>');
          this._preload(resolve, reject, this.audios[i]);
        }
      }
    );
  }

  _preload(resolve, reject, audio){
    let oAudio = new Audio();
    let index = audio.split("/");
    let name = index[index.length - 1].split(".")[0];

    oAudio.oncanplaythrough = () => {
      this.nProcessed++;
      if(this.nProcessed >= this.nAudios){
          resolve(this._aAudios);
      }
    };

    oAudio.onError = () => {
      reject(Error('Audio file '+ name +' has not been loaded properly'));
    };

    oAudio.src = audio;
    this._aAudios[name] = oAudio;
  }
}
