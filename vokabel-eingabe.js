class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.game.addWord();
      }
    });
  }
}
  class Word {
    constructor(de, en) {
      this.de = de;
      this.en = en;
    }
  } 


  class Game {

    constructor() {
        this.unitname = "";
        this.unitwords = [];
        this.anzahl = 0;

        this.spanmsg = document.getElementById('message');
        this.spananzahl = document.getElementById('anzahl');
        this.spanlisting = document.getElementById('listing');
        
        this.inputen = document.getElementById('worden');
        this.inputde = document.getElementById('wordde');
        this.inputde2 = document.getElementById('wordde2');
        this.inputde3 = document.getElementById('wordde3');
        this.inputunitname = document.getElementById('unitname');
        this.inputexport = document.getElementById('export');
        this.scrout();
    }
    clearList() {
      this.anzahl = 0;
      this.unitwords = [];
      this.scrout();
    }
    scrout() {
      this.spananzahl.innerHTML= ""+this.anzahl;
    }

    loadList() {
      this.unitname = this.inputunitname.value;
      this.unitwords = JSON.parse(localStorage.getItem(this.unitname));
      this.anzahl = this.unitwords.length;
      this.scrout();
      //console.log(this.unitwords);
    }

    addWord() {
      let en = this.inputen.value;
      let de = [];
      if (this.inputde.value != "") {
        de.push(this.inputde.value);
      }
      if (this.inputde2.value != "") {
        de.push(this.inputde2.value);
      }
      if (this.inputde3.value != "") {
        de.push(this.inputde3.value);
      }
      let w = new Word(de, en);
      this.unitwords.push(w);
      this.anzahl++;
      this.scrout();
      this.clearEingabe();
      this.inputen.focus();
    }
    clearEingabe() {
      this.inputde.value = "";
      this.inputde2.value = "";
      this.inputde3.value = "";
      this.inputen.value = "";
    }
    saveList() {
      this.unitname = this.inputunitname.value;
      localStorage.setItem(this.unitname, JSON.stringify(this.unitwords));
    }
    showList() {
      let text = "</br>";
      this.unitwords.forEach(w => {
        text = text + w.en + " => ";
        w.de.forEach( d => {
          text = text + " ; " + d;
        });
        text = text + "</br>";
      });
      this.spanlisting.innerHTML=text;
    }
    exportList() {
      this.inputexport.value = JSON.stringify(this.unitwords);
    }
    importList() {
      this.unitwords = JSON.parse(this.inputexport.value);
      this.anzahl = this.unitwords.length;
      this.scrout();
      //console.log(this.unitwords);
      
    }
  }

  const game = new Game();
  const input = new InputHandler(game);


function clearList() {
  game.clearList();
}

function loadList() {
  game.loadList();
}
function addWord() {
  game.addWord();
}
function saveList() {
  game.saveList();
}

function showList() {
  game.showList();
}

function exportList() {
  game.exportList();
}
function importList() {
  game.importList();
}