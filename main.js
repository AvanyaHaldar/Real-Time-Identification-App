function setup() {
  canvas = createCanvas(400, 320);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw() {
  image(video, 0, 0, 400, 320);
  classifier.classify(video, gotResult);
}

previous_result = "";

function modelLoaded() {
  console.log("Model is Loaded");
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    if ((result[0].confidence > 0.5) && (previous_result != result[0].label)) {
      console.log(result);
      previous_result=result[0].label;
      synth=window.speechSynthesis;
      speakdata="Object detected is"+result[0].label;
      utterThis=new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML=result[0].label;
      document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
    }
  }
}




