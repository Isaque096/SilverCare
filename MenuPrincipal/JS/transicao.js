const loader = document.getElementById("loader");
const scene = document.getElementById("scene");
const loaderFill = document.getElementById("loaderFill");

function buildWord(elId, text, startDelay, stepDelay) {
    const el = document.getElementById(elId);
    el.innerHTML = "";

    [...text].forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = ch;
        span.style.animationDelay = (startDelay + i * stepDelay) + "s";
        el.appendChild(span);
    });
}

const LOAD_TIME = 1900;   // duração da tela de carregamento
const LOOP_TIME = 5200;   // tempo que a animação fica visível
const EXIT_TIME = 2200;   // duração da saída

function runCycle() {

    // Reinicia os estados
    scene.classList.remove("show", "exit");
    loader.classList.remove("hide");
    loaderFill.classList.remove("fill");

    void loaderFill.offsetWidth;

    buildWord("word-silver", "Silver", 0.15, 0.045);
    buildWord("word-care", "Care", 0.45, 0.045);

    requestAnimationFrame(() => {
        loaderFill.classList.add("fill");
    });

    // Carregamento
    setTimeout(() => {

        loader.classList.add("hide");
        scene.classList.add("show");

        // Aguarda a animação principal
        setTimeout(() => {

            scene.classList.add("exit");

            // Aguarda a saída
            setTimeout(() => {

                document.querySelector(".stage").classList.add("hide");

            }, EXIT_TIME);

        }, LOOP_TIME);

    }, LOAD_TIME);
}

window.addEventListener("load", () => {

    const stage = document.querySelector(".stage");

    // Se a animação já foi exibida nesta sessão
    if (sessionStorage.getItem("introJaMostrada")) {

        stage.style.display = "none";
        document.body.style.overflow = "auto";

        return;
    }

    // Marca que a introdução já foi exibida
    sessionStorage.setItem("introJaMostrada", "true");

    // Executa a animação
    runCycle();

});