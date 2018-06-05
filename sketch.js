class String {
  constructor(position, speed) {
    this.position = position;
    this.speed = speed;
    this.amplitude = 0;
    this.deviation = 0;
    this.elapsed = 0;
  }
}

var s = function(p) {

  var stringSpacing = 30;
  var elapsed = 0;
  var maxAmp = 40;
  var damping = 0.5;
  var speed = 1;

  var strings = [
    new String(50, 1),
    new String(80, 0.5),
    new String(110, 0.75),
    new String(140, 1),
    new String(170, 0.3),
    new String(200, 0.8)
  ];

  p.setup = function() {
    p.createCanvas(640, 480);
  };

  p.draw = function() {
    
    p.clear();

    for (var i = 0; i < strings.length; i++) {

      var s = strings[i];
      var pos = s.position;
      if ((p.pmouseY > pos && p.mouseY < pos) || (p.pmouseY < pos && p.mouseY > pos) || p.mouseY == pos) {
        s.amplitude = maxAmp;
      }

      s.deviation = pos + (p.sin(s.elapsed)*s.amplitude);

      s.elapsed += s.speed;
      if (s.amplitude > 0) {
        s.amplitude -= damping;
      }

      p.stroke(250, 0, 0);
      p.curve(
        p.width/2, s.deviation,
        0, pos,
        p.width, pos,
        p.width/2, s.deviation
      );
    }
  
  };
}

var myp5 = new p5(s);