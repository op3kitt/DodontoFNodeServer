const merge = require('object-merge');
const stateHolder = require('stateHolder');

class CharacterData {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.draggable = true;
    this.rotation = 0;
    this.isHide = true;
    this.imgId = null;
    this.name = null;
    this.roomNumber = -1;
  }

  function set(params, record = false){
    this.merge(params);
  }

  function add(roomNumber) {
    if(stateHolder.roomData[roomNumber]){
      stateHolder.roomData[roomNumber].data.character[this.imgId] = this;
    }
  }

  function remove(){
    if(stateHolder.roomData[roomNumber]){
      del stateHolder.roomData[roomNumber].data.character[this.imgId];
    }
  }
}