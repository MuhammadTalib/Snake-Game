window.onload=myInit()
var rows;
var columns;
var w;
var h;
var ctx
var cvs
var backgroundColor
var snakeAndWallColor
var snake
var snakeLength
var snakeColor
var currentPos
var move
var moveWatcher
var timer;
var food
var score
var start
var pause
var img
var leftcanvas
var leftctx
var leaveimg

function myInit(){
	 
	
	w=40;
	h=40;
	
	rows=1000/w;
	columns=600/h;
	backgroundColor="#00cc00"
	snakeAndWallColor="#002080"
	snakeLength=1
	snakeColor="#003300"
	move=""
	snake=[]
	score=0
	start=0
	pause=0
	stop=0
	
	cvs=document.getElementById("mycanvas");
	leftcanvas=document.getElementById("leftcanvas")
	if(leftcanvas.getContext){
		leftctx=leftcanvas.getContext("2d")
		leaveimg=new Image();
		leaveimg.src='image/leave.jpg';
		
		console.log("loeee",leaveimg)
		
	}
	if(cvs.getContext){
		ctx=cvs.getContext("2d");
		img=new Image();
		img.onload=function(){
			drawGrid()
		}
		img.src='image/grass.jpeg';
		
		currentPos={x:0,y:0}
		snake.push(currentPos)
		drawSnake(currentPos.x,currentPos.y)
		ctx.stroke();
	}
	document.body.addEventListener('keydown',function(e){
		e=event||window.event;
		
		
		
		var keyCode=e.charCode || e.keyCode;
		if(start===0 && (keyCode=== 40||keyCode=== 39||keyCode===38||keyCode===37)){
			start=1
			food=drawFood()
			moveSnake()
		}
		if(keyCode=== 40){
			moveDown()
		}
		if(keyCode=== 39){
			moveRight()
		}
		if(keyCode===38){
			moveUp()
		}
		if(keyCode===37){
			moveLeft()
		}
		if(keyCode===32){
			if(pause===0){
				pause=1
			}
			else{
				pause=0
			}
		}
		
	})
	
}
function moveRight(){
	if(moveWatcher!=="left")
		moveWatcher="right"
}
function moveLeft(){
	if(moveWatcher!=="right")
		moveWatcher="left"
}
function moveDown(){
	if(moveWatcher!=="up")
		moveWatcher="down"
}
function moveUp(){
	if(moveWatcher!=="down")
		moveWatcher="up"
}
function drawGrid(){
	var rect={
			x:0,
			y:0,
			width:w,
			height:h
		}
		grid=new Path2D();
		var i,j;
		for(i=0;i<rows;i++){
			for(j=0;j<columns;j++){
				ctx.drawImage(img,rect.x,rect.y,rect.width,rect.height);
				//grid.rect(rect.x,rect.y,rect.width,rect.height);

				rect.y+=h;
			}
			rect.y=0;
			rect.x+=w;
		}
		/*ctx.fillStyle=backgroundColor
		ctx.fill(grid);
		ctx.lineWidth=2;
		ctx.zIndex=0;
		ctx.strokeStyle="#006600"*/
		
		ctx.stroke(grid)
	
}
function generateRandom(number){
	return Math.floor(Math.random() * number);
}
function drawSnake(x,y){
	//  console.log(x,y)
	var radius = (w/2-3);
	ctx.beginPath();
	ctx.arc((x*2+w)/2,(y*2+h)/2, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = snakeColor;
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = snakeColor;
	ctx.stroke();  
    
}
function moveSnake(){
	if(move==="" || move==="false" || pause===0){
		move=moveWatcher
	}
	timer=setInterval(animateSnake,5);
}
function RefillGrid(p){
	ctx.drawImage(img,p.x,p.y,w,h);
	ctx.zIndex="9999"
	ctx.stroke()
	//drawRect({x:p.x,y:p.y,width:w,height:h},backgroundColor)
}
function animateSnake(){
	if(pause===0 && stop===0){
		
		drawSnake(currentPos.x,currentPos.y)
		if(touchBorder(currentPos)){
			stop=1
		}else{
			if(currentPos.x%w===0 && currentPos.y%h===0){
				console.log("curr",currentPos,columns,(columns*h)-40) 
				if(snake.indexOf(currentPos)===-1){
					if(touchSnake(currentPos)){
						stop=1
					}else{
						snake.push(currentPos)
						RefillGrid(snake.shift())
					}
				}
				if(currentPos.x===food.x && currentPos.y===food.y){
					snake.push(currentPos)
					food=drawFood()
					score+=10
					console.log("score",score)
					document.getElementById("myscore").textContent="Score:"+score
				}
				
				move=moveWatcher
			}
			if(move==="down"){
				 currentPos={x:currentPos.x,y:currentPos.y+1}
			}
			else if(move==="up"){
				//console.log("up")
				currentPos={x:currentPos.x,y:currentPos.y-1}
			}
			else if(move==="left"){
				//console.log("left")
				currentPos={x:currentPos.x-1,y:currentPos.y}
			}
			else if(move==="right"){
				//console.log("right")
				currentPos={x:currentPos.x+1,y:currentPos.y}
			}
		}
	}
}
function drawRect(rect,color){
	grid=new Path2D();
	grid.rect(rect.x,rect.y,rect.width,rect.height);
	ctx.fillStyle=color
	ctx.lineWidth=2;
	ctx.strokeStyle="#006600"
	ctx.fill(grid);
	ctx.stroke(grid);
}
function drawTail(rect,color){
	grid=new Path2D();
	grid.rect(rect.x,rect.y+10,rect.width,rect.height-10);
	ctx.fillStyle=color
	ctx.lineWidth=2;
	ctx.strokeStyle="#006600"
	ctx.fill(grid);
	ctx.stroke(grid);
}
function drawFood(){
	while(1){
		var x=generateRandom(rows)*w
		var y=generateRandom(columns)*h
		var c=0
		for(var i=0;i<snake.length;i++){
			if(snake[i].x===x && snake[i].y===y){
				c=1
			}
		}
		if(c===1) continue
		else break
	}
	//console.log("food",x,y,rows,columns)
	var radius = (w/2-3);
    ctx.beginPath();
    ctx.arc((x*2+w)/2,(y*2+h)/2, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#f00";
    ctx.stroke();
	
	return {x,y}
}
function touchSnake(c){
	for(var i=0;i<snake.length;i++){
		if(snake[i].x===c.x && snake[i].y===c.y){
			console.log("touching")
			return true
		}
	}
	return false
	
}
function touchBorder(c){
	console.log("c",c,(columns*h)-40 )
	
		if(c.y>(columns*h)-40+2){
			console.log("touxcccc")
			return true
		}
		if(c.x>(rows*w)-40+2){
			return true
		}
		if(c.y<-2){
			console.log("touxcccc")
			return true
		}
		if(c.x<-2){
			return true
		}
	
	return false
}



















