function test() {
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
  var queue = new createjs.LoadQueue();
  queue.loadFile({src:"static/images/dHC.png", id:"image"});
  queue.on("complete", (event) => {
	var image = queue.getResult("image");
	var bmp = new createjs.Bitmap(image);
	bmp.scaleX = 850 / bmp.image.width;
	bmp.scaleY = 480 / bmp.image.height;
	stage.addChild(bmp);
	stage.setChildIndex(bmp, 1);
	stage.update();
  });

//Draw Middle Divider
  var mid = new createjs.Shape();
  mid.graphics.beginFill("#ffffff").drawRect(227, 239, 396, 2);
  stage.addChild(mid);
  drawClanTag("ARC", "Arcadia Terra", stage, true);
  drawClanTag("Bz", "Blizzard", stage, false);
  drawARCLogo(stage, style);
}

//Draw clan tags
function drawClanTag(tag, name, stage, win) {
  //Add Text
  let y_pos;
  win ? y_pos = 55 : y_pos = 310;
  var tagText = new createjs.Text();
  tagText.set({
	text: tag,
	font: "bold 100px Tahoma",
	color: "#ffffff",
	textAlign: "center",
	textBaseLine: "middle",
	x: 155,
	y: y_pos
  });
  var nameText = new createjs.Text();
  nameText.set({
	text: name,
	font: "22px Oswald",
	color: "#ffffff",
	textAlign: "center",
	textBaseLine: "middle",
	x: 155,
	y: y_pos + 98
  });
  tagText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
  nameText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
  stage.addChild(tagText);
  stage.addChild(nameText);
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
  console.log(filename);
  var queue = new createjs.LoadQueue();
  queue.loadFile({src:"static/images/" + filename, id:"image"});
  queue.on("complete", (event) => {
	var image = queue.getResult("image");
	var bmp = new createjs.Bitmap(image);
	bmp.x = 117;
	bmp.y = 207;
	stage.addChild(bmp);
	stage.update();
  });
}
