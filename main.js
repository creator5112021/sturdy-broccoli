Webcam.set({
 width:350,
 height:300,
 image_format: "png",
 png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach( ' #webcam ')

function snapic() {
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'" >'
    });
}

console.log('ml5 version', ml5.version)

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/wfhC_KYsH/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis)
}
function identify() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult)
}

function gotresult(error, results) {
    console.log("got result")
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        document.getElementById("emoji_name1").innerHTML = results[0].label;
        document.getElementById("emoji_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Victory"){
            document.getElementById("emoji1").innerHTML = "&#9996;";
        }
        if(results[0].label == "Good"){
            document.getElementById("emoji1").innerHTML = "&#128077;";
        }
        if(results[0].label == "Bad"){
            document.getElementById("emoji1").innerHTML = "&#128078;";
        }
        if(results[1].label == "Victory"){
            document.getElementById("emoji2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Good"){
            document.getElementById("emoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Bad"){
            document.getElementById("emoji2").innerHTML = "&#128078;";
        }
    }
}