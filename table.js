function test() {
  var data = document.getElementById('dataentry').value.split('\n');
  console.log(data);
}

function drawTable() {
  var stage = new createjs.Stage("table");
  //Draw Background
  var bg = new createjs.Shape();
  bg.graphics.beginFill("#065861").drawRect(0, 0, 850, 480);
  stage.addChild(bg);
  var queue = new createjs.LoadQueue();
  queue.loadFile({src:"dHC.png", id:"image"});
  queue.on("complete", (event) => {
	var image = queue.getResult("image");
	var bmp = new createjs.Bitmap(image);
	bmp.scaleX = 850 / bmp.image.width;
	bmp.scaleY = 480 / bmp.image.height;
	stage.addChild(bmp);
	stage.setChildIndex(bmp, 1);
	stage.update();
  });

  //Add Text
  var ARC = new createjs.Text();
  ARC.set({
	text: "ARC",
	font: "bold 100px Tahoma",
	color: "#ffffff",
	textAlign: "center",
	textBaseLine: "middle",
	x: 155,
	y: 60
  });
  ARC.shadow = new createjs.Shadow("#000000", 2, 2, 2);
  //Middle Divider
  var mid = new createjs.Shape();
  mid.graphics.beginFill("#ffffff").drawRect(227, 239, 396, 2);
  // mid.beginFill("#ffffff");
  stage.addChild(ARC, mid);
}

drawTable();


//color=065861
