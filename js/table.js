import textFactory from './helper.js';
import { imageFactory } from './helper.js';

export function main() {
  var data = document.getElementById('dataentry').value.split('\n');
  var style = document.getElementById('table-style').value;
  var t = new table(style, data);
  t.processData();
}

class table {
  constructor(style, data) {
	this.stage = new createjs.Stage("table");
	this.data = data;
	this.clans = [];
	this.pl = [];
	//Draw background
	var bg = new createjs.Shape();
	bg.graphics.beginFill("#065861").drawRect(0, 0, 850, 480);
	this.stage.addChild(bg);
	//Add track image, ARC logo, and middle divider
	let i = new imageFactory(this.stage);
	i.loadImage("static/images/dHC.png", 850, 480, 0, 0, 1);
	this.drawARCLogo(this.stage, style);
	var mid = new createjs.Shape();
	mid.graphics.beginFill("#ffffff").drawRect(227, 239, 396, 2);
	this.stage.addChild(mid);
	this.drawPlayerNames();
  }

  processData() {
	let i = 0;
	//Read in data
	i = this.extractTag(i, this.clans);
	i = this.extractPlayers(i + 1, this.clans[0]);
	i = this.extractTag(i + 1, this.clans);
	this.extractPlayers(i + 1, this.clans[1]);
	this.pl.sort((a,b) => {
	  return b.score - a.score;
	});
	if (this.pl.length) this.pl[0]["plcmt"] = "1st";
	for (let j = 1; j < this.pl.length; j++) {
	  let plcmt = "";
	  if (this.pl[j]["score"] == this.pl[j-1]["score"]) {
		this.pl[j]["plcmt"] = this.pl[j-1]["plcmt"];
		continue;
	  }
	  if (j == 1) plcmt = "2nd";
	  else if (j == 2) plcmt = "3rd";
	  else plcmt = j + 1 +  "th";
	  this.pl[j]["plcmt"] = plcmt;
	}
	console.log(this.pl);
	this.clans.sort((a,b) => {
	  return b.score - a.score;
	});
	this.drawClanTag(this.clans[0]["tag"], this.clans[0]["name"], this.stage, true);
	this.drawClanTag(this.clans[1]["tag"], this.clans[1]["name"], this.stage, false);
	this.stage.update();
  }

  extractTag(i, clans) {
	for (i; i < this.data.length; i++) {
	  let line = this.data[i];
	  if (this.isEmptyOrSpaces(line)) continue;
	  else {
		line = line.split(' - ');
		clans.push({
		  "tag": line[0],
		  "name": line[1],
		  "score": 0
		});
		break;
	  }
	}
	return i;
  }

  extractPlayers(i, clan) {
	for (i; i < this.data.length; i++) {
	  let line = this.data[i];
	  if (this.isEmptyOrSpaces(line)) break;
	  line = line.split(' ');
	  let name = line[0];
	  let country = line[1];
	  let score = line[2];
	  let pl = {
		"name": name,
		"country": country,
		"score": score,
		"clan": clan["tag"]
	  };
	  clan["score"] += parseInt(score);
	  this.pl.push(pl);
	}
	return i;
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  //Draw clan tags
  drawClanTag(tag, name, stage, win) {
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

  drawPlayerInfo() {
	
  }

  drawPlayerNames() {
	var test = new createjs.Text();
	test.set({
	  text: "Ace Tman",
	  font: "22px Oswald",
	  color: "#ffffff",
	  textAlign: "center",
	  textBaseLine: "middle",
	  x: 346,
	  y: 36-15
	});
	// var test2 = new createjs.Text();
	// test2.set({
	  // text: "3rd",
	  // font: "16px Oswald",
	  // color: "#ffffff",
	  // textAlign: "center",
	  // textBaseLine: "middle",
	  // x: 390,
	  // y: 41
	// });
	var test2 = new createjs.Text();
	test2.set({
	  text: "Ace Tman",
	  font: "22px Oswald",
	  color: "#ffffff",
	  textAlign: "center",
	  textBaseLine: "middle",
	  x: 346,
	  y: 186+15
	});
	let y_pos = 66-15;
	for (let i = 0; i < 5; i++) {
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
	  this.stage.addChild(rest);
	  y_pos += 30;
	}
	this.stage.addChild(test2);
	this.stage.addChild(test);
	this.stage.update();
  }

  //Draw ARC logo
  drawARCLogo(stage, style = "arc") {
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
  }
}


main();
