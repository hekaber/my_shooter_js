export class ImagesPreloader{
  constructor(images, callback){
    this.callback = callback;
    this.nProcessed = 0;
    this._aImages = {};
    this.nImages = images.length;

    for(let i=0; i < images.length; i++){
      this.preload(images[i]);
    }
  }

  getImages(){
      return this._aImages;
  }

  preload(image){
    let oImage = new Image();
    let index = image.split("/");
    let name = index[index.length - 1].split(".")[0];

    oImage.onload = this.onComplete;
    oImage.onerror = this.onError;
    oImage.src = image;
    this._aImages[name] = oImage;
  }

  onComplete(){
    this.nProcessed++;
    if(this.nProcessed >= this.nImages){
      this.callback(this._aImages);
    }
  }

  onError(){
    console.log('error');
  }
}
