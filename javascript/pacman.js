// window.addEventListener("load", ()=>{ se chargera en même temps que la page
// });

let pacman = {
    x: 2,
    y: 1,
    direction: 1
};


let score = 0

let totalBonbon = 0

let stop = null

let arrayGhost = [  // je crée mon tableau pour générer les fantômes
    {
        x: 9,
        y: 11,
        directon: 0,
        name: 'green'
    },
    {
        x: 10,
        y: 12,
        direction: 1,
        name: 'red'
    },
    {
        x: 11,
        y: 11,
        direction: 2,
        name: 'orange'
    },
    {
        x: 10,
        y: 10,
        direction: 3,
        name: 'blue'
    }
]





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
    moveGhost()

    mange()
    depasse()

    affichePacman()
    ghostDisplay()
    winner()



    // afficheGhost()
};



function affichePacman() {
    let monElement = document.createElement("div");
    monElement.className = "pacman"
    monElement.style.gridArea = pacman.y + "/" + pacman.x  // permet de forcer la position 
    plateau.appendChild(monElement);

}




function ghostDisplay() {



    for (let i in arrayGhost) {
        let myGhost = document.createElement("div")
        myGhost.className = arrayGhost[i].name // permet de récupérer la valeur de la clef name

        myGhost.style.gridArea = arrayGhost[i].y + "/" + arrayGhost[i].x
        plateau.appendChild(myGhost)
    }

}


// VERSION EMILIE
// function afficheFantomes() {
//     for (f = 0; f < tabFantomes.length; f++) { // boucle pour chaque fantôme dans le tableau
//         let monFantome = document.createElement('div'); // créer div
//         monFantome.classList.add('fantome' + f); // met la classe avec numéro de fantôme
//         monFantome.style.gridArea = tabFantomes[f].y + "/" + tabFantomes[f].x; // place le fantôme selon coordonnées tableau de fantômes
//         plateau.appendChild(monFantome) // ajout de la div sur le plateau 
//     }
// }



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

function moveGhost() {
    for (let i in arrayGhost) {
        if (arrayGhost[i].y == pacman.y && arrayGhost[i].x == pacman.x) {
            loose()
        }
        arrayGhost[i].direction = Math.floor(Math.random() * 4)
        if (arrayGhost[i].direction == 0) {
            arrayGhost[i].x++
        }
        if (arrayGhost[i].direction == 1) {
            arrayGhost[i].y++
        }
        if (arrayGhost[i].direction == 2) {
            arrayGhost[i].x--
        }
        if (arrayGhost[i].direction == 3) {
            arrayGhost[i].y--
        }
        if (grille[arrayGhost[i].y - 1][arrayGhost[i].x - 1] == 0) {
            if (arrayGhost[i].direction == 0) {
                arrayGhost[i].x--
            }
            if (arrayGhost[i].direction == 1) {
                arrayGhost[i].y--
            }
            if (arrayGhost[i].direction == 2) {
                arrayGhost[i].x++
            }
            if (arrayGhost[i].direction == 3) {
                arrayGhost[i].y++
            }
        }
        if (arrayGhost[i].y == pacman.y && arrayGhost[i].x == pacman.x) {
            loose()
        }
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

function loose() {
    alert("Vous avez perdu !!")
    gameStop()
}

