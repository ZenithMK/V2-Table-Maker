import textFactory from './helper.js';
import { imageFactory } from './helper.js';

function main() {
  var data = document.getElementById('dataentry').value.split('\n');
  var style = document.getElementById('table-style').value;
  drawTable(style);
  console.log(style);
}

function drawTable(style) {
  var stage = new createjs.Stage("table");
  //Draw Background
  var bg = new createjs.Shape();
  bg.graphics.beginFill("#065861").drawRect(0, 0, 850, 480);
  stage.addChild(bg);
  //Add track image
  let i = new imageFactory(stage);
  i.loadImage("static/images/dHC.png", 850, 480, 0, 0, 1);

//Draw Middle Divider
  var mid = new createjs.Shape();
  mid.graphics.beginFill("#ffffff").drawRect(227, 239, 396, 2);
  stage.addChild(mid);
  drawClanTag("ARC", "Arcadia Terra", stage, true);
  drawClanTag("ώƒ", "World Friend Star", stage, false);
  drawARCLogo(stage, style);
  drawPlayerNames(stage);
}

//Draw clan tags
function drawClanTag(tag, name, stage, win) {
  //place on top or bottom for win or loss
  let y_pos;
  win ? y_pos = 55 : y_pos = 312;
  //draw clan tag
  let t = new textFactory("Tahoma", 100, "bold");
  let tagText = t.getText(tag, 155, y_pos);
  tagText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
  stage.addChild(tagText);
  //draw clan name
  t = new textFactory("Oswald", 22, "");
  let nameText = t.getText(name, 155, y_pos + 98);
  nameText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
  stage.addChild(nameText);
  stage.update();
}

function drawPlayerNames(stage) {
  var test = new createjs.Text();
  test.set({
	text: "Ace Tman",
	font: "22px Oswald",
	color: "#ffffff",
	textAlign: "center",
	textBaseLine: "middle",
	x: 346,
	y: 36
  });
  var test2 = new createjs.Text();
  test2.set({
	text: "Ace Tman",
	font: "22px Oswald",
	color: "#ffffff",
	textAlign: "center",
	textBaseLine: "middle",
	x: 346,
	y: 186
  });
  let y_pos = 66;
  for (let i = 0; i < 4; i++) {
	var rest = new createjs.Text();
	rest.set({
	  text: "Ace Tman",
	  font: "22px Oswald",
	  color: "#ffffff",
	  textAlign: "center",
	  textBaseLine: "middle",
	  x: 346,
	  y: y_pos
	});
	stage.addChild(rest);
	y_pos += 30;
  }
  stage.addChild(test2);
  stage.addChild(test);
  stage.update();
}

//Draw ARC logo
function drawARCLogo(stage, style) {
  let filename;
  switch(style) {
  case "arc":
	filename = "arc1_web.png"
	break;
  case "sky":
	filename = "arcsky_web.png"
	break;
  case "terra":
	filename = "arcterra_web.png"
	break;
  }
  let i = new imageFactory(stage);
  i.loadImage("static/images/" + filename, 0, 0, 117, 210);
  // var queue = new createjs.LoadQueue();
  // queue.loadFile({src:"static/images/" + filename, id:"image"});
  // queue.on("complete", (event) => {
  // 	var image = queue.getResult("image");
  // 	var bmp = new createjs.Bitmap(image);
  // 	bmp.x = 117;
  // 	bmp.y = 210;
  // 	stage.addChild(bmp);
  // 	stage.update();
  // });
}

drawTable();

//346 x, 36 buffer
