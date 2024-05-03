//menu de droite

const hamburgerButton = document.querySelector(".nav-toggler")
const navigation = document.querySelector(".navbar-side") // Modifier le sélecteur pour sélectionner la classe navbar-side

hamburgerButton.addEventListener("click", toggleNav)

function toggleNav(){
  hamburgerButton.classList.toggle("active")
  navigation.classList.toggle("active")
}

//pour le chat bow

//pour le chat box

document.addEventListener("DOMContentLoaded", function () {
  var specialiteInput = document.getElementById("specialiteInput");
  var specialiteDropdown = document.getElementById("specialiteDropdown");

  specialiteInput.addEventListener("input", function () {
      var inputValue = specialiteInput.value.trim().toLowerCase();

      if (inputValue === "") {
          specialiteDropdown.style.display = "none";
      } else {
          specialiteDropdown.style.display = "block";
      }

      for (var i = 0; i < specialiteDropdown.options.length; i++) {
          var optionValue = specialiteDropdown.options[i].value.toLowerCase();

          if (optionValue.startsWith(inputValue)) {
              specialiteDropdown.selectedIndex = i;
              break;
          }
      }
  });

  specialiteDropdown.addEventListener("change", function () {
      specialiteInput.value = specialiteDropdown.value;
  });

  specialiteInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
          if (specialiteDropdown.selectedIndex !== -1) {
              specialiteInput.value = specialiteDropdown.value;
          }
          rechercherSurDoctolib();
          specialiteDropdown.style.display = "none";
          e.preventDefault();
      }
  });

  var openChatBtn = document.getElementById("openChatBtn");
  var chatContainer = document.getElementById("chatContainer");
  var chatOutput = document.getElementById("chatOutput");
  var chatInput = document.getElementById("chatInput");
  var chatButton = document.getElementById("chatButton");

  openChatBtn.addEventListener("click", function () {
    chatContainer.style.display = "block";
    chatInput.disabled = false; // Réactiver la zone de saisie
    chatButton.disabled = false; // Réactiver le bouton d'envoi
    chatInput.value = ""; // Réinitialiser le champ de saisie
    chatOutput.innerHTML = ""; // Effacer l'historique lors de l'ouverture
    appendMessage("Chat", "Souhaitez-vous trouver un pneumologue ?");
  });

  // Gestion de l'envoi du message dans le chat
  chatButton.addEventListener("click", function () {
    var message = chatInput.value.trim().toLowerCase();

    if (message === "oui") {
        rechercherSurDoctolibPage();
        chatContainer.style.display = "none";
    } else if (message === "non") {
        appendMessage("Utilisateur", message); // Ajouter la réponse "non" de l'utilisateur à l'historique
        appendMessage("Chat", "Très bien, rappelez-moi si vous avez besoin d'autres choses.");
        chatInput.disabled = true;
        chatButton.disabled = true;
        setTimeout(function () {
            chatContainer.style.display = "none"; // Fermer la fenêtre de chat après un délai
        }, 2000); // Délai de fermeture de 2 secondes
    } else {
        appendMessage("Utilisateur", message); // Ajouter la réponse de l'utilisateur à l'historique
        showTypingIndicator(); // Afficher l'indicateur de saisie
        setTimeout(function () {
            hideTypingIndicator(); // Masquer l'indicateur de saisie après un délai
            appendMessage("Chat", "Je n'ai pas compris, veuillez répondre 'oui' ou 'non'.");
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
    messageElement.textContent = sender + ": " + message;
    chatOutput.appendChild(messageElement);
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

  // Fonction de recherche sur Doctolib
  function rechercherSurDoctolibPage() {
    var specialite = specialiteInput.value.trim().toLowerCase();
    var localisation = document.getElementById("localisation").value.trim();

    if (specialite === "" || localisation === "") {
        alert("Veuillez remplir tous les critères.");
        return;
    }

    afficherMessageAlert("Nous vous redirigeons vers un site agréé...", 3000); // Affiche le message pendant 2 secondes
    setTimeout(function () {
        var url = "https://www.doctolib.fr/" + encodeURIComponent(specialite) + "/" + encodeURIComponent(localisation);
        window.open(url, "_blank"); // Ouvre le lien dans une nouvelle fenêtre ou un nouvel onglet
    }, 2000); // Attendre 2 secondes avant de rediriger
  }
});
