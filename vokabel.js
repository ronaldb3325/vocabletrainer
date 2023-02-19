class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.game.checkWord();
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
        this.round = 0;
        this.actualWord = null;
        this.score = 0;

        this.spanmsg = document.getElementById('message');
        this.spanlisting = document.getElementById('listing');
        this.spanfortschritt = document.getElementById('fortschritt');
        this.spanscore = document.getElementById('score');
        
        this.inputen = document.getElementById('worden');
        this.inputde = document.getElementById('wordde');
        this.inputde2 = document.getElementById('wordde2');
        this.inputde3 = document.getElementById('wordde3');
        this.inputunitname = document.getElementById('unitname');
        this.scrout();
        //this.storedUnits = JSON.parse('[{"unitname":"class 1 unit 6", "filename":"units/unit6.json"}]');
        //this.readUnitList();
    }

    readUnitList() {
      this.readTextFile("vokabellists.json", function(text){
        this.storedUnits = JSON.parse(text);
      });
    }

    neuesGame() {
      this.clearList();
      this.unitname = this.inputunitname.value;
      this.loadList();
    }

    clearList() {
      this.anzahl = 0;
      this.unitwords = [];
      this.scrout();
    }
    scrout() {
      this.spanscore.innerHTML = ""+this.round;
      this.spanfortschritt.innerHTML = this.anzahl;
    }
    
    readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    getList(id, fname){
      this.inputunitname.value = id;
      this.readTextFile(fname, function(text){
        console.log(text);
        game.unitwords = JSON.parse(text);
        game.initLoadedList();
      });
    }

    loadList() {
      this.unitwords = JSON.parse(localStorage.getItem(this.unitname));
      this.initLoadedList();
    }

    initLoadedList() {
      this.anzahl = this.unitwords.length;
      this.round = 0;
      this.actualWord = null;
      this.score = 0;
      this.mischen();
      this.nextRound();
      this.scrout();
    }


    mischen() {
			for (let l=0;l<50;l++) {
				let k = this.unitwords.pop();
				let z = Math.floor(Math.random()*this.anzahl);
				this.unitwords.splice(z, 0, k);
			}
		}
    nextRound() {
      this.inputen.value="";
      this.inputde.value="";
      this.inputde2.value="";
      this.inputde3.value="";
      if (this.unitwords.length > 0) {
        this.round++;
        this.actualWord = this.unitwords.pop();
        this.inputde.value = this.actualWord.de.at(0);
        if (this.actualWord.de.length>1) this.inputde2.value = this.actualWord.de.at(1);
        if (this.actualWord.de.length>2) this.inputde3.value = this.actualWord.de.at(2);
      } else {
        this.spanmsg.innerHTML = "Super! Fertig mit allen Wörtern.";
      }
      this.scrout();
    }

    checkWord() {
      if (this.inputen.value === this.actualWord.en) {
        this.score ++;
        this.spanmsg.innerHTML = "okay";
      } else {
        this.spanmsg.innerHTML = "Übersetzung lautet "+ this.actualWord.en;
        //this.unitwords.push(this.actualWord);
        this.unitwords.splice(0, 0, this.actualWord);
      }
      this.nextRound();
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
  }

  const game = new Game();
  const input = new InputHandler(game);




function neuesGame() {
  game.neuesGame();
}
function checkWord() {
  game.checkWord();
}
function getList(id, fname){
  game.getList(id, fname);
}