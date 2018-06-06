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

  p.setup = function() {
    var myCanvas = p.createCanvas(210, window.innerHeight);
    myCanvas.parent('myContainer');
    
    var e3 = p.loadSound('notes/e3.mp3');
    var b2 = p.loadSound('notes/b2.mp3');
    var g2 = p.loadSound('notes/g2.mp3');
    var d2 = p.loadSound('notes/d2.mp3');
    var a1 = p.loadSound('notes/a1.mp3');
    var e1 = p.loadSound('notes/e1.mp3');
    strings.push(new MyString(30, 0.5, e1));
    strings.push(new MyString(60, 0.7, a1));
    strings.push(new MyString(90, 0.9, d2));
    strings.push(new MyString(120, 1, g2));
    strings.push(new MyString(150, 1.2, b2));
    strings.push(new MyString(180, 1.5, e3));
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
}

var myp5 = new p5(s);