//prediccón 1 y 2 se ponen en blanco
prediction_1 = ""
prediction_2 = ""

//Se le dan los ajustes a la webcam
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  //se manda a llamar le id de camara
camera = document.getElementById("camera");

//Se muestra la vista de la camara
Webcam.attach('#camera');

 //se crea la función de  take snapshot     
function take_snapshot()
{
  //se toma la foto
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
//se manda a la consola el texto de ml5 version
  console.log('ml5 version:', ml5.version);
 
  //se carga el modelo
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wHchIio5P/model.json',modelLoaded);

//se crea la función modelloaded que sirve para mandar a la consola que se cargo el modelo
  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
  //Se crea la función speak
function speak(){
  //se muestra la predicción y se dice con una voz
  var synth = window.speechSynthesis;
  speak_data_1 = "La primera prediccion es " + prediction_1;
  speak_data_2 = "Y la segunda prediccion es " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

//se crea la función check para mostrar la imagen capturada
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

//se crea la función gotresult que sirve para mandar a la consola si hay un error o si esta bien,
// tambien dependiendo de la emoción se muestra un emoji
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    //se muestra el resultado es su respectiva etiqueta
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    //las predicciones almacenan los rezultados
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    //se manda a llamar la función speak
    speak();
    //si el resultado es feliz se muestra un emoji felz
    if(results[0].label == "Chocala")
    {
	    document.getElementById("update_emoji").innerHTML = "✋;";
    }
    if(results[0].label == "Bien")
    {
	    document.getElementById("update_emoji").innerHTML = "👍";
    }
    if(results[0].label == "mal")
    {
	    document.getElementById("update_emoji").innerHTML = "👎;";
    }
    if(results[0].label == "ven para aca")
    {
	    document.getElementById("update_emoji").innerHTML = ";";
    }
    if(results[0].label == "clase 5")
    {
	    document.getElementById("update_emoji").innerHTML = ";";
    }

    if(results[1].label == "Chocala")
    {
	    document.getElementById("update_emoji2").innerHTML = "✋;";
    }
    if(results[1].label == "bien")
    {
	    document.getElementById("update_emoji2").innerHTML = "👍;";
    }
    if(results[1].label == "mal")
    {
	    document.getElementById("update_emoji2").innerHTML = "👎;";
    }
    if(results[1].label == "ven para aca")
    {
	    document.getElementById("update_emoji2").innerHTML = ";";
    }
    if(results[1].label == "clase 5")
    {
	    document.getElementById("update_emoji2").innerHTML = ";";
    }
  }
}