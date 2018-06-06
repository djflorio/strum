class MyString {
  constructor(position, speed, note) {
    this.position = position;
    this.speed = speed;
    this.amplitude = 0;
    this.deviation = 0;
    this.elapsed = 0;
    this.note = note;
  }
}

var s = function(p) {

  var elapsed = 0;
  var maxAmp = 40;
  var damping = 0.3;

  var strings = [];

  switchTuning = function(t, event) {
    for (var i = 0; i < t.length; i++) {
      strings[i].note = t[i];
    }

    var btns = document.getElementsByClassName("chord-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("chord-btn--selected");
    }
    event.target.classList.add("chord-btn--selected");
  }

  p.setup = function() {
    var myCanvas = p.createCanvas(210, window.innerHeight);
    myCanvas.parent('myContainer');
    
    var e1 = p.loadSound('notes/e1.mp3');
    var g1 = p.loadSound('notes/g1.mp3');
    var a1 = p.loadSound('notes/a1.mp3');
    var b1 = p.loadSound('notes/b1.mp3');
    var c2 = p.loadSound('notes/c2.mp3');
    var d2 = p.loadSound('notes/d2.mp3');
    var e2 = p.loadSound('notes/e2.mp3');
    var g2 = p.loadSound('notes/g2.mp3');
    var a2 = p.loadSound('notes/a2.mp3');
    var b2 = p.loadSound('notes/b2.mp3');
    var c3 = p.loadSound('notes/c3.mp3');
    var e3 = p.loadSound('notes/e3.mp3');
    var g3 = p.loadSound('notes/g3.mp3');

    var standard = [e1, a1, d2, g2, b2, e3];
    var gmajor   = [g1, b1, d2, g2, b2, g3];
    var cmajor   = [g1, c2, e2, g2, c3, e3];
    var eminor   = [e1, b1, e2, g2, b2, e3];
    var aminor   = [e1, a1, e2, a2, c3, e3];
    
    strings.push(new MyString(30, 0.5, e1));
    strings.push(new MyString(60, 0.7, a1));
    strings.push(new MyString(90, 0.9, d2));
    strings.push(new MyString(120, 1, g2));
    strings.push(new MyString(150, 1.2, b2));
    strings.push(new MyString(180, 1.5, e3));

    var standardBtn = document.querySelector("#btn-standard");
    var gMajorBtn = document.querySelector("#btn-gmajor");
    var cMajorBtn = document.querySelector("#btn-cmajor");
    var eMinorBtn = document.querySelector("#btn-eminor");
    var aMinorBtn = document.querySelector("#btn-aminor");
    standardBtn.addEventListener('click', (e) => switchTuning(standard, e));
    gMajorBtn.addEventListener('click', (e) => switchTuning(gmajor, e));
    cMajorBtn.addEventListener('click', (e) => switchTuning(cmajor, e));
    eMinorBtn.addEventListener('click', (e) => switchTuning(eminor, e));
    aMinorBtn.addEventListener('click', (e) => switchTuning(aminor, e));
  };

  p.draw = function() {
    
    p.clear();

    for (var i = 0; i < strings.length; i++) {

      var s = strings[i];
      var pos = s.position;
      if (
        (p.pmouseX > pos && p.mouseX < pos) ||
        (p.pmouseX < pos && p.mouseX > pos) ||
        (p.mouseX == pos && p.pmouseX != pos)
      ) {
        s.amplitude = maxAmp;
        s.note.play();
      }

      s.deviation = pos + (p.sin(s.elapsed)*s.amplitude);

      s.elapsed += s.speed;
      if (s.amplitude > 0) {
        s.amplitude -= damping;
      }

      p.stroke(121, 204, 229);
      p.strokeWeight(3);
      p.curve(
        s.deviation, p.height/2,
        pos, 0,
        pos, p.height,
        s.deviation, p.height/2
      );
    }
  
  };

  p.windowResized = function() {
    p.resizeCanvas(210, window.innerHeight);
  }
}

var myp5 = new p5(s);

