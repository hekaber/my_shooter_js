export class ImagesPreloader{
  constructor(images){
    this.nProcessed = 0;
    this._aImages = {};
    this.nImages = images.length;
    this.images = images;
  }

  loadImages(){
    return new Promise(
      (resolve, reject) => {
        for(let i=0; i < this.nImages; i++){
          this.preload(resolve, reject, this.images[i]);
        }
      }
    );
  }

  preload(resolve, reject, image){
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
      reject(Error('One of the images has not been loaded properly'));
    }

    oImage.src = image;
    this._aImages[name] = oImage;
  }
}
