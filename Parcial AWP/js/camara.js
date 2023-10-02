const endpointURL = "https://651a08a2340309952f0cd5c0.mockapi.io/api/v1/reel"
const arrayReels = [];


alert("Doble click en la imagen para abrir la camara o subir archivo")

const camera = document.createElement("input");
const btnPost = document.getElementById("post__btn")

const inputImage = document.querySelector("img");
const inputName = document.getElementById("name");
const time = document.getElementById("card__datetime");


function runCamera() {
  camera.type = "file";
  camera.accept = "image/*";
  camera.capture = "environment";
  camera.click();
}
inputImage.addEventListener("dblclick", runCamera);

camera.addEventListener("change", () => {
  if (camera.files[0]) {
    inputImage.src = URL.createObjectURL(camera.files[0]);
    inputImage.addEventListener("load", ()=>{
        convertImgToBase64()  
    })
  }
});
function convertImgToBase64(){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = inputImage.width;
    canvas.height = inputImage.height;
    ctx.drawImage(inputImage, 0, 0, inputImage.width, inputImage.height);
    return canvas.toDataURL("image/webp")
}

function createReel() {
    const newReel = {
        image: convertImgToBase64(),
        name: inputName.value
    }
    fetch(endpointURL, {
        method:"POST", 
        headers:{"content-type": "application/json"},
        body: JSON.stringify(newReel)
    })
    .then((response)=> {
        if (response.ok) {
            alert("¡Su imagen fue publicada con exito!")
            return response.json()
        }else{
            throw new Error("No se logro completar la petición")
        }
    })
}
btnPost.addEventListener("click", createReel)




