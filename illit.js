const campo = document.getElementById("campoPesquisa");
const botao = document.getElementById("botaoPesquisa");
const resultado = document.getElementById("resultadoPesquisa");

if (botao){

botao.addEventListener("click", function() {

    const pesquisa = campo.value.toLowerCase().trim();

    if (pesquisa === "vermelho") {
        resultado.textContent = "Combina com branco, preto, dourado, azul, bege.";
    }
    else if (pesquisa === "amarelo") {
        resultado.textContent = "Combina com azul, lilás, preto, branco, cinza, ciano.";
    }
    else if (pesquisa === "azul") {
        resultado.textContent = "Combina com branco, preto, laranja, vermelho, rosa, cinza, bege, dourado.";
    }
    else if (pesquisa === "verde") {
        resultado.textContent = "Combina com marrom, rosa, preto, branco, cinza, laranja.";
    }
    else if (pesquisa === "roxo") {
        resultado.textContent = "Combina com amarelo, rosa, branco, preto, verde, ciano, laranja, cinza.";
    }
    else if (pesquisa === "marrom") {
        resultado.textContent = "Combina com bege, verde, laranja, amarelo, azul, rosa, branco.";
    }
    else if (pesquisa === "preto") {
        resultado.textContent = "Combina com vermelho, rosa, roxo, lilás, ciano, amarelo, cinza, magenta, branco.";
    }
    else if (pesquisa === "laranja") {
        resultado.textContent = "Combina com azul, roxo, marrom, preto, branco.";
    }
    else if (pesquisa === "cinza") {
        resultado.textContent = "Combina com rosa, lilás, amarelo, verde, azul, turquesa, preto.";
    }
    else if (pesquisa === "rosa") {
        resultado.textContent = "Combina com roxo, vermelho, verde, amarelo, branco, preto.";
    }
    else if (pesquisa === "branco") {
        resultado.textContent = "Combina com rosa, roxo, magenta, azul, ciano, amarelo, preto, cinza, lilás.";
    }
    else {
        resultado.textContent = "Não encontramos em nossa biblioteca.";
    }

});}




const cores = document.querySelectorAll(".cor");

cores.forEach(function(cor) {

    cor.addEventListener("click", function() {

        const codigoHex = cor.dataset.hex;
        const codigo = cor.querySelector(".codigo");

        codigo.textContent = codigoHex;

    });

});

const roda = document.getElementById("colorWheel");
const selectedColor = document.getElementById("selectedColor");
const selectedHEX = document.getElementById("selectedHEX")

if (roda) {roda.addEventListener("click", function(event) { 
        const x = event.offsetX;
        const y = event.offsetY;
        const centroX = 150;
        const centroY = 150;
        const angulo = Math.atan2(y - centroY, x - centroX);
        
        const graus = angulo * (180 / Math.PI); 
        let grausCorrigidos = graus + 90;
        if (grausCorrigidos < 0) {
            grausCorrigidos += 360;
        }
        if (grausCorrigidos >= 360) {
            grausCorrigidos -= 360;
        }
        let hex;
        let cor;
        if (grausCorrigidos < 30 || grausCorrigidos >= 330) {
            cor = "Vermelho";
            hex = "#ff0000"
        }
        else if (grausCorrigidos < 60) {
            cor = "Laranja";
            hex = "#ffa500"
        }  
        else if (grausCorrigidos < 90) { 
            cor = "Amarelo";
            hex = "#ffff00"
        }
        else if (grausCorrigidos < 150) {
            cor = "Verde";
            hex = "#008000"
        }
        else if (grausCorrigidos < 210) {
            cor = "Ciano";
            hex = "#00ffff"
        }
        else if (grausCorrigidos < 270) {
            cor = "Azul";
            hex = "#0000ff"
        }
        else if (grausCorrigidos < 330) {
            cor = "Roxo";
            hex = "#800080"
        }
        else {
            cor = "Vermelho";
        }
        selectedColor.textContent = cor;
        selectedHEX.textContent = hex;
                                     
});
}

       
    
console.log("Arquivo illit.js carregado com sucesso!");

const coresEscolhidas = [];
const areaCores = document.getElementById("coresEscolhidas");
const botaoAdicionar = document.getElementById("adicionarCor");
const botaoSalvarPaleta = document.getElementById("salvarPaleta");
const mensagemPaleta = document.getElementById("mensagem Paleta");

function mostrarCoresEscolhidas(){
    if (!areaCores) return;
    areaCores.replaceChildren();

coresEscolhidas.forEach(function(cor) {
    const quadrado = document.createElement("div");
    quadrado.style.backgroundColor = cor.hex;
      quadrado.style.width = "45px";
      quadrado.style.height = "45px";
      quadrado.style.display = "inline-block";
      quadrado.style.margin = "5px";
      quadrado.title = cor.hex;
    areaCores.appendChild(quadrado);
});
}  

if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click",function() {
        if (!selectedHEX || selectedHEX.textContent === "---") {
            mensagemPaleta.textContent = "Escolha uma cor na roda";
            return;
        }
        if (coresEscolhidas.length >= 6) {
            mensagemPaleta.textContent = "Sua paleta já tem 6 cores";
            return;
        }
        const hex = selectedHEX.textContent;
        if (coresEscolhidas.some(function(cor) {
            return cor.hex === hex;
        }
        )) {
            mensagemPaleta.textContent = "Essa cor já está na sua paleta";
            return;
        }
        coresEscolhidas.push({
            hex : hex
        });
        mostrarCoresEscolhidas();

        mensagemPaleta.textContent = "Cor adicionada (" + coresEscolhidas.length + "/6)";
    
    }
 );
}
if (botaoSalvarPaleta) {
    botaoSalvarPaleta.addEventListener("click", function() {
        if (coresEscolhidas.length === 0) {
            mensagemPaleta.textContent = "Adicione pelo menos uma cor";
            return;
        }
        const chave = "paletasColorMatch";
        const paletas = JSON.parse(
            localStorage.getItem(chave) || "[]"
        );

        const novaPaleta = coresEscolhidas.map(function(cor) {
            return cor.hex;
        }
    );
    paletas.push(novaPaleta);
    localStorage.setItem(chave, JSON.stringify(paletas)
);

coresEscolhidas.length = 0;
mostrarCoresEscolhidas();
mensagemPaleta.textContent = "Paleta salva com sucesso"
    }
);
}
function mostrarPaletasNaBiblioteca() {
    const recentes = document.querySelector(".cor-paletaR");
    const salvas = document.querySelector(".cor-paletaS");

    const paletas = JSON.parse(
        localStorage.getItem("paletasColorMatch") || "[]"
    );

    if (recentes) {
        const ultimaPaleta = paletas[paletas.length - 1] || [];
        const quadradinhos = recentes.querySelectorAll("div");

        quadradinhos.forEach(function(quadrado, indice) {
            const hex = ultimaPaleta[indice];

            quadrado.style.backgroundColor = hex || "transparent";
            quadrado.title = hex || "";
       
        });
    }
    if (salvas) {
        salvas.replaceChildren();
        salvas.style.display = "flex";
        salvas.style.flexDirection = "column";
        salvas.style.gap = "20px";
        salvas.style.marginTop = "15px"
        salvas.style.alignItems = "flex-start";

        paletas.forEach(function(paleta) {
            const linha = document.createElement("div");

            linha.style.display = "flex";
            linha.style.flexWrap = "wrap";
            linha.style.gap = "15px";

             for (let i = 0; i < 6; i++) {
                const quadrado = document.createElement("div");
                const hex = paleta[i];

                quadrado.style.width = "66px";
                quadrado.style.height = "66px";
                quadrado.style.display = "inline-block";
                quadrado.style.backgroundColor = hex || "transparent";
                quadrado.style.border = "1px solid #ccccccc";
                quadrado.title = hex || "Espaço vazio";

                linha.appendChild(quadrado);
             }
             salvas.appendChild(linha);
        }
    );
    }
}
    mostrarPaletasNaBiblioteca();