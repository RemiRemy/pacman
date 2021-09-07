// window.addEventListener("load", ()=>{ se chargera en même temps que la page
// });

let pacman = {
    x: 5,
    y: 2,
    direction: 1
};

let greenGhost = {
    x: 7,
    y: 2,
    direction: 0
};

let score = 0

let totalBonbon = 0

let stop = null

let grille = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2],  //MILIEU
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
    [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let plateau
window.addEventListener("load", () => {
    plateau = document.querySelector(".plateau");
    stop = setInterval(tourDeJeu, 200)
    document.body.addEventListener("keyup", clavier) // permet de récupérer la saisie sur le clavier


});

function afficheGrille() {
    plateau.innerHTML = ""  // permet de supprimer à chaque rafraichissement pour ne pa saturer le navigateur
    totalBonbon = 0
    // let plateau = document.querySelector(".plateau"); // déclare la variable plateau et selectionne la classe plateau un peu comme si j'avais ramener la div plateau ici
    for (let i in grille) {  // boucle sur toutes les lignes du tableau 
        for (let j in grille[i]) {  // boucles sur toutes les colonnes d'une ligne
            // console.log(grille[i][j]); // permet d'afficher dans la console 
            let monElement = document.createElement("div"); // créer une nouvelle div
            if (grille[i][j] == 0) {
                monElement.className = "mur"; // donne une valeur mur a la div si 0
            }

            if (grille[i][j] == 1) {
                monElement.className = "sol"; // donne une valeur mur a la div si 1
            }

            if (grille[i][j] == 2) {
                monElement.className = "bonbon"; // donne une valeur mur a la div si 2
                totalBonbon++
            }
            monElement.style.gridArea = (+i + 1) + "/" + (+j + 1)
            plateau.appendChild(monElement); // après avoir créer mes div (monElement) je les envoie dans la div plateau

        };

    }
};

function tourDeJeu() {
    afficheGrille()
    afficheScore()
    movePacman()

    collision()
    mange()
    depasse()

    affichePacman()
    winner()





    // afficheGhost()
};

function affichePacman() {
    let monElement = document.createElement("div");
    monElement.className = "pacman"
    monElement.style.gridArea = pacman.y + "/" + pacman.x  // permet de forcer la position 
    plateau.appendChild(monElement);

}

function afficheGhost() {
    let monElement = document.createElement("div");
    monElement.className = "greenGhost"
    monElement.style.gridArea = greenGhost.y + "/" + greenGhost.x
    plateau.appendChild(monElement);
}

function movePacman() {
    if (pacman.direction == 0) {
        pacman.x++
    }
    if (pacman.direction == 1) {
        pacman.y++
    }
    if (pacman.direction == 2) {
        pacman.x--
    }
    if (pacman.direction == 3) {
        pacman.y--
    }
}

function collision() {
    if (grille[pacman.y - 1][pacman.x - 1] == 0) {
        if (pacman.direction == 0) {
            pacman.x--
        }
        if (pacman.direction == 1) {
            pacman.y--
        }
        if (pacman.direction == 2) {
            pacman.x++
        }
        if (pacman.direction == 3) {
            pacman.y++
        }
    }
}

function clavier(event) {

    if (event.key == "ArrowDown") {
        pacman.direction = 1
    }
    if (event.key == "ArrowUp") {
        pacman.direction = 3
    }
    if (event.key == "ArrowRight") {
        pacman.direction = 0
    }
    if (event.key == "ArrowLeft") {
        pacman.direction = 2
    }
}

function depasse() {
    if (pacman.y < 0) {
        pacman.y = 21
    }
    if (pacman.x < 0) {
        pacman.x = 19
    }
    if (pacman.y > 21) {
        pacman.y = 0
    }
    if (pacman.x > 19) {
        pacman.x = 0
    }
}

function mange() {
    if (grille[pacman.y - 1][pacman.x - 1] == 2) {
        grille[pacman.y - 1][pacman.x - 1] = 1
        score += 10
    }
}

function afficheScore() {
    let divscore = document.querySelector(".score")
    divscore.innerHTML = "Votre score est de :" + score;
}

function winner() {
    if (totalBonbon == 0) {
        alert("Vous avez gagné !!")
        gameStop()
    }
}

function gameStop() {
    clearInterval(stop)
}