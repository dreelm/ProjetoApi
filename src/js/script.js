//DECLARAÇOES DOS ELEMENTOS USANDO DOM
const videoElemento = document.getElementById("video");
const botaoScanear = document.getElementById("btn-texto")
const resultado = document.getElementById("resultado")
const canvas = document.getElementById("canvas");

//FUNÇAO QUE HABILITA A CAMERA

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: "environment"}, //aciona a camera traseira
        });
        //recebe a funçao midia para habilitar a camera
        videoElemento.src0bject = midia;
        //garante que o video comece
        videoElemento.play();
    }catch(erro){
        resultado.innerText="Erro ao acessar a camera",erro
    }
}
//executa a funçao da camera
configurarCamera();

// Funçao para ler o texto que a camera pegar

botaoScanear.onclick = async ()=>{
    botaoScanear.disable=true; // habilita a camera
    resultado.innerText="Fazendo a leitura...aguarde";

    // preparando o canva para criar estrutura
    const contexto = canvas.getContext("2d");

    // ajustar o tamanho do canvas 
    canvas.width = videoElemento.videoWidth; //largura
    canvas.height = videoElemento.videoHeight;  // altura

    //reset para garantir que a foto nao saia invertida
    contexto.setTransform(1, 0, 0, 1, 0, 0);

    //filtro de contraste e escala de cinza antes de tirar a foto
    //ajuda a evitar as letras aleatorias

    contexto.filter = 'contrast(1.2) grayscale(1)';
    try{
        //consumindo api
        const { data: { text }} = await Tesseract.recognize(
            canvas, //aonde o texto vai aparecer
            'por' //idioma do texto
        );
        //Remove espaços excessivos e caracteres especiais 
        const textoFinal = text.trim();
        resultado.innertext = textoFinal.length > 0 ? textoFinal : "Não foi possivel identificar o texto"
    }catch(erro){
        console.error(erro);
        resultado.innertext="Erro ao processar",erro
    }
    finally{
        // desabilita a camera para fazer uma nova captura
        botaoScanear.disable=false;
    }
}