document.addEventListener("DOMContentLoaded", () => {
    // Gestion du premier menu déroulant
    const firstSelectBtn = document.querySelector(".first-dropdown .select-btn"),
        firstItems = document.querySelectorAll(".first-dropdown .item");

    // Gestion du premier menu déroulant
    firstSelectBtn.addEventListener("click", () => {
        firstSelectBtn.classList.toggle("open");
    });

    firstItems.forEach(item => {
        // Ajout d'un gestionnaire d'événements sur l'élément pour cocher/décocher la case et sélectionner la ligne
        item.addEventListener("click", () => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked; // Coche ou décoche la case à cocher
            item.classList.toggle("checked", checkbox.checked); // Ajoute ou supprime la classe "checked" en fonction de l'état de la case à cocher
            updateButtonText();
        });

        // Ajout d'un gestionnaire d'événements pour la case à cocher
        item.querySelector('input[type="checkbox"]').addEventListener("click", (event) => {
            const checkbox = event.target;
            const item = checkbox.closest('.item');
            item.classList.toggle("checked", checkbox.checked); // Ajoute ou supprime la classe "checked" en fonction de l'état de la case à cocher
            updateButtonText();
            event.stopPropagation(); // Empêche la propagation de l'événement de clic à l'élément parent
        });
    });

    // Gestion du deuxième menu déroulant
    const secondSelectBtn = document.querySelector(".second-dropdown .select-btn"),
        secondItems = document.querySelectorAll(".second-dropdown .item");

    // Gestion du deuxième menu déroulant
    secondSelectBtn.addEventListener("click", () => {
        secondSelectBtn.classList.toggle("open");
    });

    secondItems.forEach(item => {
        // Ajout d'un gestionnaire d'événements sur l'élément pour cocher/décocher la case et sélectionner la ligne
        item.addEventListener("click", () => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked; // Coche ou décoche la case à cocher
            item.classList.toggle("checked", checkbox.checked); // Ajoute ou supprime la classe "checked" en fonction de l'état de la case à cocher
            updateButtonText();
        });

        // Ajout d'un gestionnaire d'événements pour la case à cocher
        item.querySelector('input[type="checkbox"]').addEventListener("click", (event) => {
            const checkbox = event.target;
            const item = checkbox.closest('.item');
            item.classList.toggle("checked", checkbox.checked); // Ajoute ou supprime la classe "checked" en fonction de l'état de la case à cocher
            updateButtonText();
            event.stopPropagation(); // Empêche la propagation de l'événement de clic à l'élément parent
        });
    });

    // Fonction pour mettre à jour le texte du bouton en fonction des éléments sélectionnés
    function updateButtonText() {
        let checked1 = document.querySelectorAll(".first-dropdown .checked"),
            checked2 = document.querySelectorAll(".second-dropdown .checked"),
            btnText1 = document.querySelector(".first-dropdown .btn-text"),
            btnText2 = document.querySelector(".second-dropdown .btn-text");

        if (checked1.length > 0) {
            btnText1.innerText = `${checked1.length} Selectionné(s)`;
        } else {
            btnText1.innerText = "Selectionnez vos symptomes";
        }

        if (checked2.length > 0) {
            btnText2.innerText = `${checked2.length} Selectionné(s)`;
        } else {
            btnText2.innerText = "Prennez vous des traitements";
        }
    }







    

//pour que si on clique ailleurs que sur les menus ca le ferme 
    document.addEventListener("click", function(event) {
      const firstDropdown = document.querySelector('.first-dropdown');
      const secondDropdown = document.querySelector('.second-dropdown');
  
      // Si l'élément cliqué n'est pas dans le premier menu déroulant
      if (!firstDropdown.contains(event.target)) {
          firstSelectBtn.classList.remove("open"); // Fermer le premier menu déroulant
      }
  
      // Si l'élément cliqué n'est pas dans le deuxième menu déroulant
      if (!secondDropdown.contains(event.target)) {
          secondSelectBtn.classList.remove("open"); // Fermer le deuxième menu déroulant
      }
  });


//pour l aide / assistance


var openChatBtn = document.getElementById("openChatBtn");
var chatContainer = document.getElementById("chatContainer");
var chatOutput = document.getElementById("chatOutput");
var chatInput = document.getElementById("chatInput");
var chatButton = document.getElementById("chatButton");


var voiceToggleBtn = document.getElementById("voiceToggleBtn"); // Nouveau bouton pour activer/désactiver la lecture vocale


// Initialisation de la synthèse vocale
var speechSynthesis = window.speechSynthesis;
var voices = speechSynthesis.getVoices();

// Déclaration d'une variable pour suivre l'état de la lecture vocale
var voiceEnabled = true;

// Fonction pour activer ou désactiver la lecture vocale
function toggleVoice() {
voiceEnabled = !voiceEnabled; // Inverse l'état actuel
if (voiceEnabled) {
  voiceToggleBtn.textContent = "Son ON";
} else {
  voiceToggleBtn.textContent = "Son OFF";
}
}

// Ajout d'un gestionnaire d'événements pour activer/désactiver la lecture vocale lors du clic sur le bouton
voiceToggleBtn.addEventListener("click", function () {
toggleVoice();
});

// Fonction pour lire à voix haute un message
function speakMessage(message) {
var utterance = new SpeechSynthesisUtterance(message);
speechSynthesis.speak(utterance);
}

openChatBtn.addEventListener("click", function () {
    chatContainer.style.display = "block";
    chatInput.disabled = false; // Réactiver la zone de saisie
    chatButton.disabled = false; // Réactiver le bouton d'envoi
    chatInput.value = ""; // Réinitialiser le champ de saisie
    chatOutput.innerHTML = ""; // Effacer l'historique lors de l'ouverture
    appendMessage("Chat", "Comment puis-je vous aidez ? Plusieurs option vous sont disponibles :");
    appendMessageAccueil("Passer le test.");
    appendMessageAccueil("Le taux de pollen.");
    appendMessageAccueil("Le taux de pollution atmosphérique de l'air.");
    appendMessageAccueil("Contacter un spécialiste agréé.");
    appendMessageAccueil("Quitter l'assistance.");
  });

// Gestion de l'envoi du message dans le chat lors de l'appui sur la touche "Entrée"
chatInput.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire (rechargement de la page)
  chatButton.click(); // Simuler un clic sur le bouton d'envoi
}
});

// Gestion de l'envoi du message dans le chat
chatButton.addEventListener("click", function () {
  var message = chatInput.value.trim().toLowerCase();

 

  if (message.includes("passer") || message.includes("test") || message.includes("faire ")|| message.includes("Passe")) {
    appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
    showTypingIndicator(); // Afficher l'indicateur de saisie
    setTimeout(function () {
        hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
        appendMessage("Chat", "Rendez vous donc sur la page d'accueil de notre application.");
        appendMessageAccueil( " Puis-je vous être utile pour autre chose ?");

    }, 1500);

  }
  
  
  else if (message.includes("pollen")) {
      appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
      showTypingIndicator(); // Afficher l'indicateur de saisie
      setTimeout(function () {
          hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
          appendMessage("Chat", "Souhaitez-vous consulter la carte du taux de pollen ?");
          appendMessageAccueil("Tappez 1 : oui.");
          appendMessageAccueil("Tappez 2 : non.");

          chatInput.value = ""; // Réinitialiser le champ de saisie
      }, 1500); // Délai de réponse de 1.5 secondes
    }          
     else if (message ==="1") {
                // Ouvrir la page Google dans une nouvelle fenêtre
               
                chatInput.value = ""; // Réinitialiser le champ de saisie après chaque message

                hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
                appendMessage("Chat", "Très bien nous nous vous redirigeons vers le site ...");
                
                setTimeout(function () {
                  window.open("https://www.pollens.fr/", "_blank");
              
              }, 3000 ); // Délai de réponse de 1.5 secondes
              appendMessage("Chat", " Puis-je vous être utile pour autre chose ?");

              }
            else if (message ==="2") {
              appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
              showTypingIndicator(); // Afficher l'indicateur de saisie
              setTimeout(function () {
                  hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
                  appendMessage("Chat", "Très bien, puis-je vous être utile pour autre chose ?");
                  chatInput.value = ""; // Réinitialiser le champ de saisie
              }, 1500); // Délai de réponse de 1.5 seconde
            } 
   

    else if (message.includes("pollution") || message.includes("air") || message.includes("atmosphérique") || message.includes("atmospherique")) {
      appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
      showTypingIndicator(); // Afficher l'indicateur de saisie
      setTimeout(function () {
          hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
          appendMessage("Chat", "Souhaitez-vous consulter la carte de la pollution atmosphérique de l'air ?");
          appendMessageAccueil("Tappez 3 : oui.");
          appendMessageAccueil("Tappez 4 : non.");

          chatInput.value = ""; // Réinitialiser le champ de saisie
      }, 1500); // Délai de réponse de 1.5 secondes
           
    } else if (message ==="3") {

      chatInput.value = ""; // Réinitialiser le champ de saisie après chaque message

      hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
      appendMessage("Chat", "Très bien nous nous vous redirigeons vers le site ...");
      
      setTimeout(function () {
        window.open("https://www.atmo-france.org/", "_blank");
    
    }, 3000 ); // Délai de réponse de 1.5 secondes
    appendMessage("Chat", " Puis-je vous être utile pour autre chose ?");

            }
            else if (message ==="4") {
              appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
              showTypingIndicator(); // Afficher l'indicateur de saisie
              setTimeout(function () {
                  hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
                  appendMessage("Chat", "Très bien, puis-je vous être utile pour autre chose ?");
                  chatInput.value = ""; // Réinitialiser le champ de saisie
              }, 1500); // Délai de réponse de 1.5 seconde
            } 
    
    else if (message.includes("contacter") || message.includes("specialiste") || message.includes("spécialiste")|| message.includes("spe")|| message.includes("spé")|| message.includes("cont")|| message.includes("contact")) {
      appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
      showTypingIndicator(); // Afficher l'indicateur de saisie
      setTimeout(function () {
          hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
          appendMessage("Chat", "Souhaitez-vous contacter un spécialiste ?");
          appendMessageAccueil("Tappez 5 : oui.");
          appendMessageAccueil("Tappez 6 : non.");

          chatInput.value = ""; // Réinitialiser le champ de saisie
      }, 1500); // Délai de réponse de 1.5 secondes
     }else  if (message ==="5" ){
                appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
                showTypingIndicator(); // Afficher l'indicateur de saisie
                setTimeout(function () {
                    hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
                    appendMessage("Chat", "Quels types de spécialistes ?");
                    appendMessageAccueil("pneumologue");
                    appendMessageAccueil("allergologue");
                    appendMessageAccueil("pédiatre");
                    appendMessageAccueil("médecin généraliste");

                    chatInput.value = ""; // Réinitialiser le champ de saisie
                }, 1500); // Délai de réponse de 1.5 secondes
                    
              }
              else if (message.includes("pneumologue") || message.includes("pneu")) {
                console.log("Recherche de médecin généraliste détectée."); // Ajout du console.log()
                      var specialiste ="pneumologue"
                      rechercherSurDoctolibAssistance(specialiste);
                      chatContainer.style.display = "none";
                      }
                    else if (message.includes("allergologue") || message.includes("allergo")) {
                        var specialiste ="allergologue"
                        rechercherSurDoctolibAssistance(specialiste);
                        chatContainer.style.display = "none";
                    }
                    else if (message.includes("pediatre") || message.includes("pédiatre")|| message.includes("pedi")|| message.includes("pédi")) {
                      var specialiste ="pediatre"
                      rechercherSurDoctolibAssistance(specialiste);
                      chatContainer.style.display = "none";
                    }
                    else if (message.includes("medecin") || message.includes("médecin")|| message.includes("docteur")|| message.includes("généraliste")|| message.includes("general")) {
                      var specialiste ="medecin-generaliste"
                      rechercherSurDoctolibAssistance(specialiste);
                      chatContainer.style.display = "none";
                    }
            
            else if (message ==="6") {
              appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
              showTypingIndicator(); // Afficher l'indicateur de saisie
              setTimeout(function () {
                  hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
                  appendMessage("Chat", "Très bien, puis-je vous être utile pour autre chose ?");
                  chatInput.value = ""; // Réinitialiser le champ de saisie
              }, 1500); // Délai de réponse de 1.5 seconde
            } 
    
    else if (message.includes( "quitter")  || message.includes("quit")  || message.includes("termin") ) {
              appendMessage("Utilisateur", message); // Ajouter la réponse "non" de l'utilisateur à l'historique
              appendMessage("Chat", "Très bien, rappelez-moi si vous avez besoin d'autres choses.");
              chatInput.disabled = true;
              chatButton.disabled = true;
              setTimeout(function () {
                  chatContainer.style.display = "none"; // Fermer la fenêtre de chat après un délai
              }, 2000); // Délai de fermeture de 2 secondes
    }
    
    else {
      appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
      showTypingIndicator(); // Afficher l'indicateur de saisie
      setTimeout(function () {
          hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
          appendMessage("Chat", "Je n'ai pas compris, veuillez saisir à nouveau.");
          chatInput.value = ""; // Réinitialiser le champ de saisie
      }, 1500); // Délai de réponse de 1.5 secondes
  }


    chatInput.value = ""; // Réinitialiser le champ de saisie après chaque message
});

// Fonction pour afficher l'indicateur de saisie
function showTypingIndicator() {
    var typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typingIndicator");
    typingIndicator.textContent = "Chat écrit...";
    chatOutput.appendChild(typingIndicator);
}

// Fonction pour masquer l'indicateur de saisie
function hideTypingIndicator() {
    var typingIndicator = document.querySelector(".typingIndicator");
    if (typingIndicator) {
        chatOutput.removeChild(typingIndicator);
    }
}

// Fonction pour ajouter un message à l'historique du chat
function appendMessage(sender, message) {
  var messageElement = document.createElement("div");
  messageElement.classList.add("chatMessage");
  messageElement.innerHTML = `<span style="color: red;">${sender}</span>: <br> ${message}`;
  chatOutput.appendChild(messageElement);

  // Si la lecture vocale est activée, lire le message à voix haute
if (voiceEnabled) {
speakMessage(message);
}

}
// Fonction pour ajouter un message à l'historique du chat
function appendMessageAccueil(message) {
var messageElement = document.createElement("div");
messageElement.classList.add("chatMessage");
messageElement.innerHTML =` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• ${message}`;
chatOutput.appendChild(messageElement);

// Si la lecture vocale est activée, lire le message à voix haute
if (voiceEnabled) {
speakMessage(message);
}

}


function afficherMessageAlert(message, tempsAffichage) {
var alertBox = document.createElement('div');
alertBox.textContent = message;
alertBox.style.position = 'fixed';
alertBox.style.top = '50%';
alertBox.style.left = '50%';
alertBox.style.transform = 'translate(-50%, -50%)'; // Centrer verticalement et horizontalement
alertBox.style.backgroundColor = '#f0f0f0';
alertBox.style.padding = '20px'; // Rembourrage
alertBox.style.border = '2px solid #ccc'; // Épaisseur de la bordure
alertBox.style.borderRadius = '10px'; // Rayon de la bordure
alertBox.style.zIndex = '9999';
alertBox.style.fontSize = '18px'; // Taille du texte
alertBox.style.fontWeight = 'bold'; // Texte en gras
document.body.appendChild(alertBox);
setTimeout(function() {
    alertBox.style.display = 'none';
    document.body.removeChild(alertBox);
}, tempsAffichage);
}

// Ajout d'un gestionnaire d'événements pour minimiser la boîte de chat lorsque l'utilisateur clique n'importe où en dehors de la boîte de chat
document.addEventListener("click", function(event) {
if (!chatContainer.contains(event.target) && event.target !== openChatBtn) {
  chatContainer.style.display = "none";
}
});

// Ajout d'un gestionnaire d'événements pour restaurer la boîte de chat lorsque l'utilisateur clique sur le bouton d'ouverture du chat
openChatBtn.addEventListener("click", function(event) {
chatContainer.style.display = "block";

});



function rechercherSurDoctolibAssistance(specialiste) {
afficherMessageAlert("Nous vous redirigeons vers un site agréé...", 3000); // Affiche le message pendant 2 secondes
setTimeout(function () {
    var url = "https://www.doctolib.fr/" + encodeURIComponent(specialiste);
    console.log("URL:", url); // Ajout du console.log()
    window.open(url, "_blank"); // Ouvre le lien dans une nouvelle fenêtre ou un nouvel onglet
}, 2000); // Attendre 2 secondes avant de rediriger
}


});

//pour le menu sur la droite

const hamburgerButton = document.querySelector(".nav-toggler")
const navigation = document.querySelector("nav")

hamburgerButton.addEventListener("click", toggleNav)

function toggleNav(){
  hamburgerButton.classList.toggle("active")
  navigation.classList.toggle("active")
}
// Écouter les clics sur l'ensemble du document
document.addEventListener("click", (event) => {
  // Vérifier si le clic n'est pas sur le bouton hamburger ou à l'intérieur du menu
  if (!event.target.closest(".nav-toggler") && !event.target.closest("nav")) {
    // Fermer le menu
    hamburgerButton.classList.remove("active");
    navigation.classList.remove("active");
  }
});

// Vérifie la complétude du champ Genre
document.querySelector('form').addEventListener('submit', function(e) {
  // Vérifie si un bouton radio est sélectionné
  const isGenderSelected = document.querySelector('input[name="Genre"]:checked');
  const errorSpan = document.getElementById('genre-error');

  if (!isGenderSelected) {
      // Empêche la soumission du formulaire
      e.preventDefault();
      // Affiche le message d'erreur
      errorSpan.style.display = 'block';
  } else {
      // Cache le message d'erreur
      errorSpan.style.display = 'none';
  }
});

