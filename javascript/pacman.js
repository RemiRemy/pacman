// window.addEventListener("load", ()=>{ se chargera en même temps que la page
// });

let pacman = {
    x: 5,
    y: 2,
    direction: 0
};

let greenGhost = {
    x: 7,
    y: 2,
    direction: 0
};

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
    setInterval(tourDeJeu, 500)


});

function afficheGrille() {
    plateau.innerHTML = ""  // permet de supprimer à chaque rafraichissement pour ne pa saturer le navigateur
    // let plateau = document.querySelector(".plateau"); // déclare la variable plateau et selectionne la classe plateau un peu comme si j'avais ramener la div plateau ici
    for (let i in grille) {  // boucle sur toutes les lignes du tableau 
        for (let j in grille[i]) {  // boucles sur toutes les colonnes d'une ligne
            console.log(grille[i][j]); // permet d'afficher dans la console 
            let monElement = document.createElement("div"); // créer une nouvelle div
            if (grille[i][j] == 0) {
                monElement.className = "mur"; // donne une valeur mur a la div si 0
            }

            if (grille[i][j] == 1) {
                monElement.className = "sol"; // donne une valeur mur a la div si 1
            }

            if (grille[i][j] == 2) {
                monElement.className = "bonbon"; // donne une valeur mur a la div si 2
            }
            monElement.style.gridArea = (+i + 1) + "/" + (+j + 1)
            plateau.appendChild(monElement); // après avoir créer mes div (monElement) je les envoie dans la div plateau

        };

    }
};

function tourDeJeu() {
    afficheGrille()
    affichePacman()
    afficheGhost()
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
        pacman.x
    }
}
