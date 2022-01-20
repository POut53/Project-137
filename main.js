object=[];
status="";
function setup(){
    canvas=createCanvas(600,600);
    canvas.center();
    video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();
}
function draw(){
    image(video, 0, 0, 600, 600);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects"
    object_name=document.getElementById("object_input").value;
}
function modelloaded(){
    console.log("Model is Loaded!")
    status=true;
}
function getresult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}
function draw(){
    image(video,0,0,600,600);
    if(status!=""){
        objectDetector.detect(video,getresult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Objects Detected";
            fill("#FFFF00");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#0000FF");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name + "Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById(object_status).innerHTML=object_name + "Not Found";
            }
        }
    }
}