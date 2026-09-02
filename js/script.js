
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
            else if (targetHref === '#dashboard') {
                mainContentArea.innerHTML = dashboardHTMLTemplate;
                initialiserGraphiquesParDefaut();
            } else if (targetHref === '#dashboard') {
                // Si clic sur Tableau de bord -> On recharge le dashboard initial
                mainContentArea.innerHTML = dashboardHTMLTemplate;
                // Optionnel : Re-déclencher l'initialisation des graphiques si nécessaire
                initialiserGraphiquesParDefaut();
        } else {
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





