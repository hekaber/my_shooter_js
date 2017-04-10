export class ControlManager {
  constructor(){
    this.downPressed = false;
    this.upPressed = false;
    this.firePressed = false;

    this.setListeners();
  }

  _keyUpHandler(e){
    if(e.keyCode == 40){
      this.downPressed = false;
    }
    else if(e.keyCode == 38){
      this.upPressed = false;
    }
    // If user hits f key
    else if(e.keyCode == 70){
      this.firePressed = false;
    }
  }

  _keyDownHandler(e){
    if(e.keyCode == 40){
      this.downPressed = true;
      // console.log('down');
    }
    else if(e.keyCode == 38){
      this.upPressed = true;
      // console.log('up');
    }
    // If user hits f key
    else if(e.keyCode == 70){
      this.firePressed = true;
    }
  }

  setListeners(){
    document.addEventListener('keydown', evt => this._keyDownHandler(evt), false);
    document.addEventListener('keyup', evt => this._keyUpHandler(evt), false);
  }

  unsetListeners(){
    document.removeEventListener('keydown', this._keyDownHandler);
    document.removeEventListener('keyup', this._keyUpHandler);
  }
}
