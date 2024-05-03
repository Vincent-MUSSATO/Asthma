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

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('localisation');
  input.addEventListener('input', function() {
      this.value = this.value.toLowerCase();
  });
});


//pour le chat bow

//pour le chat box


document.addEventListener("DOMContentLoaded", function () {
  var specialiteDropdown = document.getElementById("specialiteDropdown");
  var specialiteInput = document.getElementById("specialiteInput");
  var searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", function () {
      rechercherSurDoctolib();
  });

  function rechercherSurDoctolib() {
      var specialite = specialiteDropdown.value.trim().toLowerCase();
      var localisation = document.getElementById("localisation").value.trim();

      if (specialite === "" || localisation === "") {
          alert("Veuillez remplir tous les critères.");
          return;
      }

      var url = "https://www.doctolib.fr/" + encodeURIComponent(specialite) + "/" + encodeURIComponent(localisation);
      window.open(url, "_blank"); // Ouvre le lien dans une nouvelle fenêtre ou un nouvel onglet
  }


//pouur l assistance 


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


// Ajouter un gestionnaire d'événements à chaque titre de section
document.querySelectorAll("#categories h3").forEach(function(title) {
  title.addEventListener("mouseenter", function() {
    // Créer un HR pour la catégorie survolée si elle n'est pas déjà sélectionnée
    if (!title.classList.contains("selected")) {
      var hr = document.createElement("hr");
      title.appendChild(hr);
    }
  });

  title.addEventListener("mouseleave", function() {
    // Supprimer le HR lorsque la souris quitte la catégorie si elle n'est pas sélectionnée
    if (!title.classList.contains("selected")) {
      title.removeChild(title.querySelector("hr"));
    }
  });

  title.addEventListener("click", function() {
    // Récupérer l'ID du titre cliqué
    var id = this.id;

    // Masquer tous les paragraphes
    document.querySelectorAll("#contenu p").forEach(function(paragraph) {
      paragraph.style.display = "none";
    });

    // Afficher le paragraphe correspondant au titre cliqué
    document.getElementById(id + "Content").style.display = "block";

    // Supprimer tous les HR précédents
    document.querySelectorAll("hr").forEach(function(hr) {
      hr.remove();
    });

    // Supprimer la classe "selected" de tous les éléments h3
    document.querySelectorAll("#categories h3").forEach(function(item) {
      item.classList.remove("selected");
      // Supprimer le HR pour tous les éléments h3 sauf celui sélectionné
      if (item !== title && item.contains(item.querySelector("hr"))) {
        item.removeChild(item.querySelector("hr"));
      }
    });

    // Ajouter la classe "selected" à l'élément h3 sélectionné
    title.classList.add("selected");

    // Créer un HR pour le titre cliqué
    var hr = document.createElement("hr");
    title.appendChild(hr);
  });
});


});



