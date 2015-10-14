function init() {
	canvas = document.getElementById('game_canvas');	
	ctx = canvas.getContext('2d');
	background = new Image();
	background.src = 'duckhunt-background.gif';	
	//wait until image loads to drawImage
	background.addEventListener("load", function() {
		ctx.drawImage(background, 0, 0);
	}, false);
	sprites = new Image();
	sprites.src = 'duckhunt_various_sheet.png';
		//wait until image loads to drawImage
	sprites.addEventListener("load", function() {
		ctx.drawImage(sprites, 0, 120, 34, 24, 175, 45, 34, 24);
		ctx.drawImage(sprites, 130, 120, 34, 24, 75, 80, 34, 24);
	}, false);

}
