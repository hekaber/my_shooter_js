export class ImagesPreloader{
  constructor(images){
    /*
    Images is an array of paths
    */
    this.nProcessed = 0;
    this._aImages = {};
    this.nImages = images.length;
    this.images = images;
  }

  load(){
    return new Promise(
      (resolve, reject) => {
        for(let i=0; i < this.nImages; i++){
          document.getElementById('log').insertAdjacentHTML('beforeend',
          '<span> Loading image ' + this.images[i] + ', </span>');
          this._preload(resolve, reject, this.images[i]);
        }
      }
    );
  }

  _preload(resolve, reject, image){
    let oImage = new Image();
    let index = image.split("/");
    let name = index[index.length - 1].split(".")[0];

    oImage.onload = () => {
      this.nProcessed++;
      if(this.nProcessed >= this.nImages){
        resolve(this._aImages);
      }
    };
    oImage.onerror = () => {
      reject(Error('Image '+ name +' has not been loaded properly'));
    };

    oImage.src = image;
    this._aImages[name] = oImage;
  }
}
