var database;
var ref;
var drawing=[];
var dbDrawing=[]

function setup() {

  //Connection to database
  database=firebase.database();
  console.log(database)

  //refer to the node of database
  ref= database.ref('drawing');
 createCanvas(800,400);


 //listen to change in database
 ref.on("value",drawSketch,showError)
  
}

function draw() {
  background(255,255,255); 
 
 //Give color and weight for drawing
  stroke("red")
  strokeWeight(4)
  noFill()


  //start drawing with connecting all points in db
   beginShape()
   
   for (i=0;i<dbDrawing.length;i++)
   {
    
      vertex(dbDrawing[i].x,dbDrawing[i].y)
   }
   endShape()

  
  drawSprites();
}

function mouseDragged()
{

//store points of location to draw sketch
  point={
    x:mouseX,
    y:mouseY
  }
  //store point in local variable
  drawing.push(point);

  //update database in node drawing and set node d: to points
  database.ref('drawing').set({
    'd':drawing
  })
}

function mouseReleased()
{

}


//Read data from database and store value of d in variable
function drawSketch(data)
{
  dbDrawing=data.val().d;
 
}


//show error if occurred
function showError()
{
  console.log("errorOccurred")
}