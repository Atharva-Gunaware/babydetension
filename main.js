
img = "";
objects = [];
Status = "";
song="";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;  
}

function preload(){  
  song = play("alarm_classic.mp3");
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "status : Baby Detected";
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person")
            {
              document.getElementById("status").innerHTML="Baby found";
              console.log("stop");
              song.stop();
            }
            else{
              document.getElementById("number_of_objects").innerHTML="Baby not found";
              console.log("play");
              song.play();
            }
        } 

        if (objects.length == 0)
        {

          //document.getElementById("number_of_objects").innerHTML="Baby Not found";
          console.log("play");
          song.play();
        }
      }
}



