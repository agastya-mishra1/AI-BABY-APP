song="";
status1="";
objects=[];

function preload(){
song=loadSound("alarm.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("staatus").innnerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized");
    status1=true;
    objectDetector.detect(video,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
 image(video,0,0,380,380);
 if(status1 != ""){
     r = random(255);
     g = random(255);
     b = random(255);
     for(i=0; i<objects.length; i++){
         document.getElementById("staatus").innerHTML="Objects Detected";
         document.getElementById("number_objects").innerHTML="Number of Objects Detected : "+objects.length;
         fill(r,g,b);
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x + 15,objects[i].y + 15);
         noFill();
         stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("number_objects").innerHTML="Baby Found!";
            song.stop();

        }
        else{
            document.getElementById("number_objects").innerHTML="Baby NOT Found!";
            song.play();
        }
     }
     if(objects.length==0){
        document.getElementById("number_objects").innerHTML="Baby NOT Found!";
        song.play();
     }
 }
}