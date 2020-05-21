var database;
var ref,countRef;
var drawing=[];
var dbDrawing=[];
var currentpath=[];
var drawPath=[];
isDrawing=false
var count=0
var dname;

function setup() {

  //Connection to database
  database=firebase.database();
  

  //refer to the node of database
  ref= database.ref('drawing');
 

 createCanvas(800,400);


 //listen to change in database
 ref.on("value",drawSketch,showError)
 
  
}

function draw() {
  background(255,255,255); 
 
  if(isDrawing)
  
  {
    var point={
      x:mouseX,
      y:mouseY
    }
    currentpath.push(point)

    //create different paths for every mousePressed
    dname="drawing/path"+count
    console.log(dname)

   //update database in node drawing /path and set node d: to points
    database.ref(dname).set({d:currentpath})
   
  }
 //Give color and weight for drawing
  stroke("red")
  strokeWeight(4)
  noFill()
  
 
if(dbDrawing!==undefined)
{
  for(var path in dbDrawing)
  {
    drawPath=dbDrawing[path].d
    if(drawPath!==undefined)
    {
    beginShape()
    for(var j in drawPath)
    {
      vertex(drawPath[j].x,drawPath[j].y)
    }
    endShape()
  }
  }
}

  

  
  drawSprites();
}

function mouseDragged()
{

  isDrawing=true

}

function mouseReleased()
{
  isDrawing=false;
  count=count+1
  currentpath=[]
}



//Read data from database and store value of d in variable
function drawSketch(data)
{
  dbDrawing=data.val();
 
}


//show error if occurred
function showError()
{
  console.log("errorOccurred")
}