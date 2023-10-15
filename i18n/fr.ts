import i18nDict from "./i18nDict.js"

const frDict: i18nDict = {
    nav: {
        resume: `<a href="res/en1.9.3.pdf">CV</a>`,
        works: "productions",
        resources: "ressources",
        contact: "contact"
    },
    home: {
        intro: "Part d'informations publiques/professionnelles de Stardust Motion<br><br>qui ne nécessite probablement pas plus d'explications"
    },
    works: {
        workDate: "Date",
        workProject: "Production",
        workType: "Genre",
        workTypeGame: "Jeu",
        workTypeStage: "Niveau",
        workTypeVR: "Vidéo VR",
        workUnity: `<a target="_blank" href="https://unity.com/fr">Unity</a>`,
        workCredits: "Avec",

        bur00Desc: `Niveau de Match à mort pour <a target="_blank" href="https://cutstuff.net/mm8bdm/">Mega Man 8-bit Deathmatch</a> pour une <a target="_blank" href="https://cutstuff.net/forum/index.php?topic=11976.0">map jam</a><br><br>Un large vaisseau avec un pont, une section proche des rotors, et des plates-formes d'accès suspendues. Périodiquement, le vaisseau rentre dans une turbulence affectant dangeureusement le contrôle des joueurs<br>`,
        bur00Build: "Temps passé:<br>2 mois",
        bur00Credit: "Tuiles pour base de texture et musique issues de sources externes",
        bur00Video: "Visionner",

        xoverOngoing: "2014<br>(en cours)",
        xoverDesc: `Modification pour <a target="_blank" href="https://cutstuff.net/mm8bdm/">Mega Man 8-bit Deathmatch</a> qui ajoute un système de fusion d'armes<br><br>Les armes fusionées sont plus puissantes et définies par le mode de fonctionnement et élément de leurs ingrédients. L'arme fusionée est aussi un ingrédient enchaînable vers une autre fusion.<br><br>30+ nouvelles armes codées`,
        xoverBuild: "Temps passé:<br>v1 - quelques semaines<br>v2 - 6 mois",
        xoverCredit: "Échantillons de sons et la référence pour certains sprites issus de sources externe",
        xoverCode: "Aperçu du code",
        xoverThread: "Lien vers forum",
        xoverVideo: "Gameplay (v1)",

        casinopolisTitle: "Casinopolis",
        casinopolisDesc: `Vidéo en réalité virtuelle et hommage à <a target="_blank" href="https://www.youtube.com/watch?v=9hvXSUwWwiY">un certain niveau de Sonic</a><br><br>Vue en caméra à la troisième personne. Grâce au moteur de jeu, deux perspectives latérales fixant un même point permettent d'établir un effet de profondeur.<br><br><a target="_blank" href="https://arvr.google.com/intl/fr_fr/cardboard/">Un dispositif</a> est nécessaire pour une expérience optimale<br>`,
        casinopolisBuild: "Temps passé:<br>une semaine",
        casinopolisCredit: "Utilise 'Bumper Engine'.<br>Textures issues du jeu original et retravaillées grâce à un réseau de neuronne 'ESRGAN', entraîné par une source externe",
        casinopolisVideo: "Visionner",

        blacksmithDesc: `Jeu de rythme et de gestion<br><br>En tant que forgeron, forgez des armes à travers des séquences de <a target="_blank" href="https://fr.wikipedia.org/wiki/Dance_Dance_Revolution">DDR</a>, et vendez pour un bénéfice, ou bien offrez l'arme aux divinités.<br><br>Des envahisseurs vous pilleront, mais une protection divine issue de vos offrandes les ralentiront`,
        blacksmithBuild: "Temps passé:<br>une semaine",
        blacksmithCredit: "Images et audio issus de sources externes",
        blacksmithDownload: "Version Windows",

        seascapeDesc: `Jeu d'action pour un concours contraignant l'utilisation du moteur Babylon.js<br><br>Utilisez les touches ZQSD pour rentrer dans les objectifs dans le temps imparti.<br><br>Le chrono s'arrête de 1 à 3 secondes en rentrant dans une caisse mais diminue de 5 secondes sur impact avec un missile de tourelle`,
        seascapeBuild: "Temps passé:<br>un mois",
        seascapeCredit: "Réalisé avec deux autres développeurs. Textures, modèles 3D et audio issus de sources externes",
        seascapeCode: "Code source",
        seascapePlay: "Jouer",

        voxelTitle: "Moteur voxel simple",
        voxelDesc: `Une scène simple de taille 16x16x16<br><br>Il est possible de contrôler la caméra et d'ajouter/retirer des voxels</p>`,
        voxelBuild: "Temps passé:<br>quelque jours",
        voxelCredit: "opengl-tutorial.org pour les guides",
        voxelCode: "Code source",

        srb2Title: "Niveaux pour SRB2",
        srb2Desc: `Une demi-douzaine de niveaux pour un mode coopératif sur <a target="_blank" href="https://www.srb2.org/">Sonic Robo Blast 2</a><br><br>Certains ont participé a des compétitions communautaires`,
        srb2Build: 'Temps passé:<br>de quelques jours à semaines, par map',
        srb2Volcano: "Visionner 'Dangerous Volcano Zone'",
        srb2Island: "Visionner 'Lost Feelings Island'",
        srb2Palace: "Visionner 'Golden Palace Zone'",
    },
    contact: {
        howToContact: "Envoyer un message directement",
        fromSite: "Depuis le site",
        email: "Email",
        emailFormat: "Email invalide",
        emailUndefined: "Email est requis pour recevoir une réponse",
        messageLength: "max. 3000 caractères autorisés",
        messageUndefined: "Requis",
        message: "Message",
        uploadFile: "Envoyer un fichier (max. 10Mo)",
        uploadFileMax: "Fichier dépasse la limite de 10Mo",
        submit: "Envoyer",
    }
}

export default frDict;