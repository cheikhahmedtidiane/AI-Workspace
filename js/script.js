
// GESTION DES VUES : NAVIGATION DANS LE MENU LATÉRAL
console.log("Fichier lié avec succès !");
// Sélection des éléments du DOM
const menuItems = document.querySelectorAll('.sidebar-nav li');
const mainContentArea = document.querySelector('.main-content');

// Sauvegarde du code HTML initial du Tableau de Bord pour pouvoir y revenir
const dashboardHTMLTemplate = mainContentArea.innerHTML;

// Écoute du clic sur chaque lien du menu latéral
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Enlève la classe active de l'ancien élément et l'ajoute au nouveau
        document.querySelector('.sidebar-nav li.active').classList.remove('active');
        this.classList.add('active');

        const targetHref = this.querySelector('a').getAttribute('href');

            
        if (targetHref === '#summary') {
            // Si clic sur Résumé de texte -> On charge l'interface correspondante
                chargerInterfaceResume();
            } 
            else if (targetHref === '#translation') {
                chargerInterfaceTraduction();
            }
            else if (targetHref === '#chat') {
                chargerInterfaceChat(); 
            }
            else if (targetHref === '#dashboard') {
                mainContentArea.innerHTML = dashboardHTMLTemplate;
                initialiserGraphiquesParDefaut();
            } else if (targetHref === '#dashboard') {
                // Si clic sur Tableau de bord -> On recharge le dashboard initial
                mainContentArea.innerHTML = dashboardHTMLTemplate;
                // Optionnel : Re-déclencher l'initialisation des graphiques si nécessaire
                initialiserGraphiquesParDefaut();
            }
            else if (targetHref === '#classification') {
                chargerInterfacePrediction();
            }
            else {
            // Pour les autres modules en attente de développement
            mainContentArea.innerHTML = `
                <header class="navbar">
                    <div class="navbar-title">AI Workspace</div>
                    <div class="navbar-user"><span class="user-name">Admin User</span></div>
                </header>
                <main class="dashboard-view">
                    <div class="dashboard-header">
                        <h1>Module en cours de développement</h1>
                        <p>La connexion de ce service IA est prévue dans la prochaine itération.</p>
                    </div>
                </main>
            `;
        }
    });
});


// INJECTION DE L'INTERFACE "RÉSUMÉ DE TEXTE"
function chargerInterfaceResume() {
    mainContentArea.innerHTML = `
        <!-- Barre supérieure préservée -->
        <header class="navbar">
            <div class="navbar-title">AI Workspace</div>
            <div class="navbar-user">
                <span class="user-name">Admin User</span>
                <span class="user-arrow">▼</span>
            </div>
        </header>

        <!-- Contenu spécifique au Résumé de Texte -->
        <main class="dashboard-view">
            <div class="dashboard-header">
                <h1>Service de Résumé de Texte</h1>
                <p>Exploitez la puissance des LLM pour condenser vos rapports et documents complexes en quelques secondes.</p>
            </div>

            <div class="data-grid" style="grid-template-columns: 1fr;">
                <div class="table-card" style="padding: 30px; gap: 20px;">
                    
                    <!-- Zone de saisie du texte -->
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label for="text-to-summarize" style="font-weight: 600; color: var(--text-main);">
                            Insérez le texte long à analyser :
                        </label>
                        <textarea id="text-to-summarize" rows="10" placeholder="Collez votre texte ici (minimum 20 caractères)..." style="width: 100%; padding: 15px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; resize: vertical; outline: none;"></textarea>
                    </div>

                    <!-- Bouton d'action -->
                    <div>
                        <button id="btn-summarize" style="background-color: var(--color-blue); color: #fff; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">
                            Générer le résumé
                        </button>
                    </div>

                    <!-- Zone d'affichage du résultat (Masquée par défaut) -->
                    <div id="summary-result-box" style="display: none; background-color: #f8fafc; border-left: 4px solid var(--color-green); padding: 20px; border-radius: 4px; margin-top: 10px;">
                        <h3 style="margin-bottom: 10px; color: var(--color-green); font-size: 1.05rem;">Résumé IA Généré :</h3>
                        <p id="summary-text" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; white-space: pre-line;"></p>
                    </div>

                </div>
            </div>
        </main>
    `;

    // Attacher l'écouteur d'événement sur le bouton fraîchement créé
    document.getElementById('btn-summarize').addEventListener('click', executerResumeSimule);
}


// LOGIQUE IA SIMULÉE : TRAITEMENT DU RÉSUMÉ

function executerResumeSimule() {
    const textInput = document.getElementById('text-to-summarize').value.trim();
    const resultBox = document.getElementById('summary-result-box');
    const resultText = document.getElementById('summary-text');
    const btn = document.getElementById('btn-summarize');

    // Validation basique
    if (textInput.length < 20) {
        alert("Veuillez saisir un texte d'au moins 20 caractères pour permettre l'analyse.");
        return;
    }

    // Effet visuel de chargement pour imiter l'attente d'une API
    btn.disabled = true;
    btn.innerText = "Calcul de l'IA en cours...";
    resultBox.style.display = "none";

    setTimeout(() => {
        // Simulation d'une logique de traitement NLP (Extraction de mots-clés ou phrases types)
        const mots = textInput.split(' ');
        const phraseA = mots.slice(0, Math.min(10, mots.length)).join(' ');
        const phraseB = mots.length > 20 ? mots.slice(Math.floor(mots.length/2), Math.floor(mots.length/2) + 12).join(' ') : "";
        
        // Construction du résumé simulé intelligent
        let resumeGenere = `[Synthèse Automatique]\n• L'analyse principale se concentre autour de : "${phraseA}...".\n`;
        if (phraseB) {
            resumeGenere += `• Les corrélations secondaires mettent en évidence que : "${phraseB}...".\n`;
        }
        resumeGenere += `• Conclusion : Le document traite de données volumineuses nécessitant une automatisation des processus métiers de l'entreprise.`;

        // Affichage du résultat dans l'interface
        resultText.innerText = resumeGenere;
        resultBox.style.display = "block";
        
        // Rétablissement du bouton
        btn.disabled = false;
        btn.innerText = "Générer le résumé";
    }, 1200); // Délai artificiel de 1,2 seconde (latence réseau simulée)
}





// ==========================================================================
// FONCTIONS AJOUTÉES POUR LE MODULE TRADUCTION
// ==========================================================================
function chargerInterfaceTraduction() {
    mainContentArea.innerHTML = `
        <header class="navbar">
            <div class="navbar-title">AI Workspace</div>
            <div class="navbar-user">
                <span class="user-name">Admin User</span>
                <span class="user-arrow">▼</span>
            </div>
        </header>
        <main class="dashboard-view">
            <div class="dashboard-header">
                <h1> Service de Traduction Automatique</h1>
                <p>Traduisez instantanément vos contenus professionnels grâce à des modèles de traduction neuronale optimisés.</p>
            </div>
            <div class="data-grid" style="grid-template-columns: 1fr;">
                <div class="table-card" style="padding: 30px; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label for="target-language" style="font-weight: 600; color: var(--text-main);">Sélectionnez la langue cible :</label>
                        <select id="target-language" style="width: 100%; max-width: 300px; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; outline: none; color: var(--text-main);">
                            <option value="en">Anglais (English)</option>
                            <option value="es">Espagnol (Español)</option>
                            <option value="de">Allemand (Deutsch)</option>
                            <option value="it">Italien (Italiano)</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label for="text-to-translate" style="font-weight: 600; color: var(--text-main);">Texte en Français à traduire :</label>
                        <textarea id="text-to-translate" rows="6" placeholder="Saisissez ou collez votre texte ici..." style="width: 100%; padding: 15px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; resize: vertical; outline: none;"></textarea>
                    </div>
                    <div>
                        <button id="btn-translate" style="background-color: var(--color-blue); color: #fff; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">Traduire le texte</button>
                    </div>
                    <div id="translation-result-box" style="display: none; background-color: #f8fafc; border-left: 4px solid var(--color-purple); padding: 20px; border-radius: 4px; margin-top: 10px;">
                        <h3 style="margin-bottom: 10px; color: var(--color-purple); font-size: 1.05rem;">Traduction IA Générée :</h3>
                        <p id="translation-text" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; font-style: italic; white-space: pre-line;"></p>
                    </div>
                </div>
            </div>
        </main>
    `;
    document.getElementById('btn-translate').addEventListener('click', executerTraductionSimulee);
}

function executerTraductionSimulee() {
    const textInput = document.getElementById('text-to-translate').value.trim();
    const langSelect = document.getElementById('target-language').value;
    const resultBox = document.getElementById('translation-result-box');
    const resultText = document.getElementById('translation-text');
    const btn = document.getElementById('btn-translate');

    if (textInput.length === 0) {
        alert("Veuillez saisir un texte à traduire.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Connexion au modèle de traduction...";
    resultBox.style.display = "none";

    setTimeout(() => {
        const dictionnaireSimulation = {
            en: "Here is the simulated translation of your text into English. The corporate API successfully processed the sequence.",
            es: "Aquí está la traducción simulada de su texto al español. La API corporativa procesó con éxito la secuencia.",
            de: "Hier ist die simulierte Übersetzung Ihres Textes ins Deutsche. Die Unternehmens-API hat die Sequenz erfolgreich verarbeitet.",
            it: "Ecco la traduzione simulata del tuo testo in italiano. L'API aziendale ha elaborato correttamente la sequenza."
        };

        let traductionGenere = dictionnaireSimulation[langSelect] || "Translation unavailable.";
        traductionGenere += `\n\n[Données de l'API : Source en Français (${textInput.length} caractères) → Cible (${langSelect.toUpperCase()})]`;

        resultText.innerText = traductionGenere;
        resultBox.style.display = "block";
        
        btn.disabled = false;
        btn.innerText = "Traduire le texte";
    }, 1000);
}



// FONCTIONS AJOUTÉES POUR LE MODULE CHAT IA

function chargerInterfaceChat() {
    mainContentArea.innerHTML = `
        <!-- Barre supérieure -->
        <header class="navbar">
            <div class="navbar-title">AI Workspace</div>
            <div class="navbar-user">
                <span class="user-name">Admin User</span>
                <span class="user-arrow">▼</span>
            </div>
        </header>

        <!-- Contenu spécifique au Chat -->
        <main class="dashboard-view" style="display: flex; flex-direction: column; height: calc(100vh - 70px); padding-bottom: 20px;">
            <div class="dashboard-header" style="margin-bottom: 15px;">
                <h1>Chat Assistant IA</h1>
                <p>Discutez en temps réel avec un grand modèle de langage pour poser vos questions de code, analyse ou stratégie.</p>
            </div>

            <!-- Fenêtre de Chat Principale -->
            <div class="table-card" style="flex-grow: 1; display: flex; flex-direction: column; border-radius: 8px; overflow: hidden; background-color: var(--bg-card);">
                
                <!-- Zone d'affichage des messages -->
                <div id="chat-messages-container" style="flex-grow: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; max-height: 450px;">
                    <!-- Message initial du système -->
                    <div class="message-bubble system" style="background-color: #f1f5f9; padding: 12px 16px; border-radius: 8px; max-width: 80%; align-self: flex-start; border-left: 4px solid var(--text-light);">
                        <p style="font-size: 0.9rem; color: var(--text-main);">
                            <strong>Assistant IA :</strong> Bonjour ! Je suis votre agent virtuel interne connecté à nos modèles de langage. Comment puis-je vous aider dans vos tâches aujourd'hui ?
                        </p>
                    </div>
                </div>

                <!-- Zone d'indicateur de chargement (Masquée par défaut) -->
                <div id="chat-loading-indicator" style="display: none; padding: 0 20px 10px 20px; font-size: 0.85rem; color: var(--text-light); font-style: italic; align-self: flex-start;">
                    L'IA est en train d'écrire...
                </div>

                <!-- Barre d'outils de saisie de texte -->
                <div style="padding: 15px 20px; border-top: 1px solid var(--border-color); background-color: #f8fafc; display: flex; gap: 10px; align-items: center;">
                    <input type="text" id="chat-user-input" placeholder="Posez votre question ici..." style="flex-grow: 1; padding: 12px 15px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; outline: none;">
                    <button id="btn-chat-send" style="background-color: var(--color-green); color: #fff; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: background 0.2s; white-space: nowrap;">
                        Envoyer
                    </button>
                </div>

            </div>
        </main>
    `;

    // Écouteurs d'événements pour l'envoi du message (Clic bouton et touche Entrée)
    document.getElementById('btn-chat-send').addEventListener('click', envoyerMessageChat);
    document.getElementById('chat-user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            envoyerMessageChat();
        }
    });
}

// Fonction pour gérer l'envoi du message de l'utilisateur et la réponse simulée de l'IA

function envoyerMessageChat() {
    const inputField = document.getElementById('chat-user-input');
    const userText = inputField.value.trim();
    const messagesContainer = document.getElementById('chat-messages-container');
    const loadingIndicator = document.getElementById('chat-loading-indicator');
    const sendBtn = document.getElementById('btn-chat-send');

    if (userText === "") return;

    // 1. Ajouter le message de l'utilisateur à l'écran
    const userBubble = document.createElement('div');
    userBubble.style.cssText = "background-color: #e0e7ff; padding: 12px 16px; border-radius: 8px; max-width: 80%; align-self: flex-end; border-right: 4px solid var(--color-blue); text-align: left;";
    userBubble.innerHTML = `<p style="font-size: 0.9rem; color: var(--text-main);"><strong>Vous :</strong> ${userText}</p>`;
    messagesContainer.appendChild(userBubble);

    // Vider le champ de saisie
    inputField.value = "";
    
    // Défiler vers le bas automatiquement
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Activer l'état de chargement de l'IA
    loadingIndicator.style.display = "block";
    sendBtn.disabled = true;
    inputField.disabled = true;

    // 3. Simuler la latence de traitement du LLM (1,5 seconde)
    setTimeout(() => {
        // Réponses simulées génériques mais contextualisées pour la Data Science
        const reponsesIA = [
            "C'est une excellente question. D'un point de vue analyse de données, nous devrions d'abord nettoyer les valeurs manquantes avant d'entraîner ce modèle.",
            "J'ai analysé votre requête. Les logs système indiquent que l'API cible répond correctement avec un code HTTP 200.",
            "Pour implémenter cela sans framework, assurez-vous de bien structurer vos requêtes asynchrones en utilisant la méthode native JavaScript 'fetch()'.",
            "Votre demande de script d'automatisation a été prise en compte. N'oubliez pas de configurer les variables d'environnement pour stocker vos clés API de manière sécurisée."
        ];

        // Sélection aléatoire d'une réponse
        const reponseAleatoire = reponsesIA[Math.floor(Math.random() * reponsesIA.length)];

        // Ajouter la bulle de réponse de l'IA à l'écran
        const aiBubble = document.createElement('div');
        aiBubble.style.cssText = "background-color: #d1fae5; padding: 12px 16px; border-radius: 8px; max-width: 80%; align-self: flex-start; border-left: 4px solid var(--color-green);";
        aiBubble.innerHTML = `<p style="font-size: 0.9rem; color: var(--text-main);"><strong>Assistant IA :</strong> ${reponseAleatoire}</p>`;
        messagesContainer.appendChild(aiBubble);

        // Désactiver le chargement et restaurer les contrôles
        loadingIndicator.style.display = "none";
        sendBtn.disabled = false;
        inputField.disabled = false;
        inputField.focus();

        // Redéfiler vers le bas
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}



// FONCTIONS AJOUTÉES POUR LE MODULE PRÉDICTION (CLASSIFICATION)

function chargerInterfacePrediction() {
    mainContentArea.innerHTML = `
        <!-- Barre supérieure -->
        <header class="navbar">
            <div class="navbar-title">AI Workspace</div>
            <div class="navbar-user">
                <span class="user-name">Admin User</span>
                <span class="user-arrow">▼</span>
            </div>
        </header>

        <!-- Contenu spécifique à la Prédiction -->
        <main class="dashboard-view">
            <div class="dashboard-header">
                <h1>Modèle de Prédiction</h1>
                <p>Estimez le profil d'éligibilité ou la segmentation d'un utilisateur à partir de variables démographiques et financières.</p>
            </div>

            <div class="data-grid" style="grid-template-columns: 1fr;">
                <div class="table-card" style="padding: 30px; gap: 20px;">
                    
                    <form id="prediction-form-io" onsubmit="event.preventDefault();">
                        
                        <!-- Ligne 1 : Âge et Revenu (Flexbox) -->
                        <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
                            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 200px;">
                                <label for="pred-age" style="font-weight: 600; color: var(--text-main);">Âge du client :</label>
                                <input type="number" id="pred-age" placeholder="Ex: 34" min="18" max="100" required style="padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; outline: none;">
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 200px;">
                                <label for="pred-income" style="font-weight: 600; color: var(--text-main);">Revenu annuel (€) :</label>
                                <input type="number" id="pred-income" placeholder="Ex: 45000" min="0" required style="padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; outline: none;">
                            </div>
                        </div>

                        <!-- Ligne 2 : Sélection de la Ville -->
                        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                            <label for="pred-city" style="font-weight: 600; color: var(--text-main);">Ville de résidence :</label>
                            <select id="pred-city" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.95rem; outline: none; color: var(--text-main);">
                                <option value="" disabled selected>Choisir une ville...</option>
                                <option value="Paris">Paris</option>
                                <option value="Lyon">Lyon</option>
                                <option value="Marseille">Marseille</option>
                                <option value="Bordeaux">Bordeaux</option>
                                <option value="Autre">Autre ville</option>
                            </select>
                        </div>

                        <!-- Bouton d'action -->
                        <div style="margin-bottom: 20px;">
                            <button id="btn-predict" type="submit" style="background-color: var(--color-blue); color: #fff; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">
                                Lancer la prédiction
                            </button>
                        </div>

                    </form>

                    <!-- Zone d'affichage du résultat fictif (Masquée par défaut) -->
                    <div id="prediction-result-box" style="display: none; background-color: #f8fafc; border-left: 4px solid var(--color-blue); padding: 20px; border-radius: 4px;">
                        <h3 style="margin-bottom: 10px; color: var(--color-blue); font-size: 1.05rem;">Résultat du modèle (Scoring IA) :</h3>
                        <p id="prediction-text" style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; white-space: pre-line;"></p>
                    </div>

                </div>
            </div>
        </main>
    `;

    // Attacher l'événement sur le bouton fraîchement généré
    document.getElementById('btn-predict').addEventListener('click', executerPredictionSimulee);
}

function executerPredictionSimulee() {
    const age = document.getElementById('pred-age').value;
    const income = document.getElementById('pred-income').value;
    const city = document.getElementById('pred-city').value;
    
    const resultBox = document.getElementById('prediction-result-box');
    const resultText = document.getElementById('prediction-text');
    const btn = document.getElementById('btn-predict');

    // Validation HTML5 basique manuelle si déclenché par clic direct
    if (!age || !income || !city) {
        alert("Veuillez remplir l'âge, le revenu et sélectionner une ville.");
        return;
    }

    // Simulation visuelle de calcul de matrice / inférence
    btn.disabled = true;
    btn.innerText = "⚡ Inférence du modèle en cours...";
    resultBox.style.display = "none";

    setTimeout(() => {
        // Logique "Data Science" fictive basée sur les entrées pour donner un résultat cohérent
        let scoreApetence = Math.min(100, Math.floor((income / 1500) + (age * 0.4)));
        let segment = "Standard";
        
        if (income > 60000 || (income > 45000 && city === "Paris")) {
            segment = "Premium / Haute Valeur";
        } else if (income < 25000 && age < 26) {
            segment = "Jeune / Entrée de gamme";
        }

        // Construction de la réponse formatée
        let reponseFictive = `• Segment Client Estimé : **${segment}**\n`;
        reponseFictive += `• Score d'appétence aux services : **${scoreApetence} / 100**\n`;
        reponseFictive += `• Fiabilité de la prédiction (F1-Score) : 94.2%\n\n`;
        reponseFictive += `[Données traitées : Âge: ${age} ans | Revenu: ${income} € | Localisation: ${city}]`;

        // Rendu dans l'interface
        resultText.innerText = reponseFictive;
        resultBox.style.display = "block";
        
        // Rétablissement des contrôles
        btn.disabled = false;
        btn.innerText = "Lancer la prédiction";
    }, 1300); // Latence réseau / calcul de 1,3 seconde
}
