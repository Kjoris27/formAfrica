# 🌍 FormAfrica - Plateforme de Gestion de Formations

Bienvenue sur FormAfrica, une plateforme complète conçue pour faciliter la découverte, l'inscription et la gestion de formations en Afrique ! Que vous soyez un apprenant à la recherche de nouvelles compétences, un formateur souhaitant partager votre expertise, ou un administrateur gérant le contenu, FormAfrica est l'outil qu'il vous faut.

## ✨ Fonctionnalités Clés

Notre plateforme est riche en fonctionnalités pour offrir une expérience utilisateur fluide et efficace :

*   **Gestion des Utilisateurs & Rôles 🧑‍💻**
    *   Système robuste d'authentification et d'autorisation avec différents rôles : Apprenant, Formateur, et Administrateur.
    *   Chaque rôle dispose de permissions spécifiques pour accéder aux fonctionnalités de la plateforme.

*   **Catalogue de Formations Détaillé 📚**
    *   Créez, modifiez et consultez des formations avec des informations complètes : titre, description, programme détaillé, prérequis, formateur, dates, lieu, et avis des participants.
    *   Les formateurs peuvent gérer leurs propres formations.

*   **Découverte de Formations par Géolocalisation 📍**
    *   Recherchez des formations à proximité de votre position géographique grâce à l'intégration GeoJSON de MongoDB.
    *   Les formateurs peuvent définir précisément les lieux de leurs formations.

*   **Gestion Intelligente des Places Disponibles ✅**
    *   Définissez le nombre maximum de participants par formation.
    *   Un système de réservation sécurisé assure que les inscriptions respectent la capacité maximale, évitant ainsi les surréservations grâce à l'utilisation de transactions MongoDB.

*   **Processus de Réservation & Inscription Simplifié ✍️**
    *   Les utilisateurs peuvent s'inscrire aux formations, et leur statut d'inscription (en attente, confirmée, annulée, terminée) est clairement géré.

*   **Tickets Numériques Uniques 🎟️**
    *   Après chaque réservation confirmée, un ticket numérique unique avec un code et des données pour QR code est généré pour chaque participant.
    *   Les utilisateurs peuvent consulter leurs tickets à tout moment.

*   **Suivi des Inscriptions pour les Formateurs 📊**
    *   Les formateurs ont une vue dédiée pour suivre toutes les inscriptions à leurs propres formations, y compris les détails des apprenants et de la formation.

*   **Système de Notifications par Email 📧**
    *   Recevez des confirmations d'inscription, des notifications d'annulation ou de modification, et des rappels automatiques avant le début des formations par email.
    *   Utilisation de `Nodemailer` avec des templates HTML pour des communications claires et professionnelles.

## 🚀 Technologies Utilisées

Ce projet est construit avec des technologies modernes et robustes :

*   **Node.js & Express.js** : Pour un serveur backend rapide et évolutif.
*   **MongoDB & Mongoose** : Base de données NoSQL flexible et ODM puissant pour la modélisation des données.
*   **JSON Web Tokens (JWT)** : Pour une authentification sécurisée.
*   **Bcrypt.js** : Pour le hachage sécurisé des mots de passe.
*   **Nodemailer** : Pour l'envoi d'emails transactionnels et de notifications.
*   **Node-cron** : Pour la planification de tâches automatiques (ex: rappels).
*   **UUID** : Pour la génération de codes uniques (tickets).

## 🛠️ Installation

Pour faire fonctionner ce projet en local, suivez ces étapes :

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/FormAfrica.git
    cd FormAfrica
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    ```
    (Assurez-vous d'avoir Node.js et npm installés sur votre machine.)

3.  **Configuration des variables d'environnement :**
    Créez un fichier `.env` à la racine du projet et ajoutez-y les variables suivantes (exemple) :
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/formafrica # Votre URI MongoDB
    JWT_SECRET=supersecretjwtkey # Une clé secrète forte et unique
    JWT_EXPIRES_IN=1h

    # Configuration Email (Mailtrap pour le développement, par exemple)
    EMAIL_HOST=smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_USER=votre_utilisateur_mailtrap
    EMAIL_PASSWORD=votre_mot_de_passe_mailtrap
    EMAIL_FROM=no-reply@formafrica.com
    ```
    Remplacez les valeurs par les vôtres, en particulier pour `MONGODB_URI`, `JWT_SECRET` et les informations de votre service d'email. Pour les tests en développement, [Mailtrap](https://mailtrap.io/) est recommandé.

4.  **Lancer l'application :**
    ```bash
    npm start
    ```
    Le serveur devrait démarrer sur `http://localhost:3000` (ou le port que vous avez défini).

## 🚀 Utilisation de l'API

L'API est structurée autour des ressources suivantes :

*   `/api/v1/auth` : Inscription, connexion, gestion des tokens.
*   `/api/v1/users` : Gestion des utilisateurs et des rôles (nécessite des permissions d'administrateur pour certaines actions).
*   `/api/v1/formations` : Création, consultation, mise à jour des formations.
    *   `GET /api/v1/formations/nearby?lat=XX.XXXX&lng=YY.YYYY&distance=DDDD` : Recherche de formations à proximité.
*   `/api/v1/enrollments` : Gestion des inscriptions et des réservations.
    *   `GET /api/v1/enrollments/my-formations-enrollments` : Pour les formateurs, suivre les inscriptions à leurs formations.
*   `/api/v1/tickets` : Consultation des tickets numériques.

Pour des exemples détaillés des requêtes, veuillez vous référer aux contrôleurs et aux fichiers de routes dans le projet.

## 🤝 Contribution

Nous accueillons les contributions ! Si vous souhaitez améliorer FormAfrica, n'hésitez pas à :

1.  Faire un fork du projet.
2.  Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`).
3.  Commiter vos changements (`git commit -m 'Add some AmazingFeature'`).
4.  Pusher vers la branche (`git push origin feature/AmazingFeature`).
5.  Ouvrir une Pull Request.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Made with ❤️ by Joris

