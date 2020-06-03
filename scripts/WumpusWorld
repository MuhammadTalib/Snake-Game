//import {Graph} from "./graph"
window.onload=myInit()
var rows;
var columns;
var w;
var h;
var cells;
var grid;
var cell_graph;
var cell_boundry;
var selected_cells;
var ctx
var cvs
var whiteCells

var coloring
var colorFlag

var startPos
var move
var x_timer
var stop_timer,source,dest
var i = 0,j=0,k
var index                     //  set your counter to 1
var delayTime


var backgroundColor
var snakeAndWallColor
var snake
var snakeLength
var snakeColor
var currentPos
var move
var moveWatcher
var timer;

function myInit(){
	 
	
	w=40;
	h=40;
	rows=1000/w;
	columns=600/h;
	backgroundColor="#00cc00"
	snakeAndWallColor="#002080"
	snakeLength=1
	snakeColor="#0000b3"
	move=""
	snake=[]
	
	cvs=document.getElementById("mycanvas");
	
	if(cvs.getContext){
		ctx=cvs.getContext("2d");
		
		drawGrid()
		currentPos={x:0,y:0}
		snake.push(currentPos)
		drawSnake(currentPos.x,currentPos.y)
		ctx.stroke();
	}
	document.body.addEventListener('keydown',function(e){
		e=event||window.event;
		
		var keyCode=e.charCode || e.keyCode;
		console.log("keydown",keyCode)
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
			//stop_timer=true
			moveWatcher="false"
			//clearInterval(timer)
		}
		//cell_graph.display()
		
	})
	
}

function moveRight(){
	moveWatcher="right"
	moveSnake()
}
function moveLeft(){
	moveWatcher="left"
	moveSnake()
}
function moveDown(){
	moveWatcher="down"
	moveSnake()
}
function moveUp(){
	moveWatcher="up"
	moveSnake()
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
				grid.rect(rect.x,rect.y,rect.width,rect.height);
				//var n=new Vertex({x:rect.x,y:rect.y,i,j})
				//cell_graph.addNode(n)
				rect.y+=h;
			}
			rect.y=0;
			rect.x+=w;
		}
		ctx.fillStyle=backgroundColor
		ctx.fill(grid);
		ctx.lineWidth=2;
		ctx.zIndex=0;
		ctx.strokeStyle="#006600"
		ctx.stroke(grid)
	
}
function generateRandom(number){
	return Math.floor(Math.random() * number);
}
function drawSnake(x,y){
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
	if(move==="" || move==="false"){
		move=moveWatcher
	}
	//stop_timer=false
	timer=setInterval(animateSnake,10);
}
function RefillGrid(p){
	drawRect({x:p.x,y:p.y,width:w,height:h},backgroundColor)
}
function animateSnake(){
	if(move!=="false"){
		drawSnake(currentPos.x,currentPos.y)
		if(currentPos.x%w===0 && currentPos.y%h===0){
			if(snake.indexOf(currentPos)===-1){
				snake.push(currentPos)
				RefillGrid(snake.shift())
				//console.log("shift",snake.shift())
			}
			console.log("snake",snake)
			move=moveWatcher
		}
		if(move==="down"){
			//console.log("downs")
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
function drawRect(rect,color){
	grid=new Path2D();
	grid.rect(rect.x,rect.y,rect.width,rect.height);
	ctx.fillStyle=color
	ctx.fill(grid);
}























