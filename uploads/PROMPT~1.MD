# Prompt pour Claude Design — GED nouvelle génération

> À copier-coller dans Claude Design. Tu peux l'envoyer en un bloc, ou démarrer par les sections « Contexte » + « Écran 1 » puis itérer écran par écran.

---

## Contexte & problème à résoudre

Conçois un prototype web interactif complet pour **une solution de gestion documentaire (GED) d'entreprise nouvelle génération**, destinée aux équipes internes (RH, finance, juridique, projets, direction).

Le produit attaque les deux frustrations universelles des GED classiques :
1. **« Où est-ce que je range ce document ? »** — la paralysie au moment de classer.
2. **« Où est passé le document que je cherche ? »** — l'impossibilité de retrouver un fichier rangé il y a six mois.

**Parti pris fondateur, à incarner dans toute l'interface : il n'y a PLUS d'arborescence de dossiers.** On ne « range » jamais un document dans un emplacement. À la place :
- chaque document est **automatiquement tagué et enrichi** (type, projet, date, personnes, statut) au moment du dépôt ;
- on retrouve un document via une **recherche sémantique en langage naturel** (« le contrat signé en mars avec Dupont », « la dernière version du budget 2026 ») et via des **vues dynamiques** construites à partir de tags/filtres ;
- l'utilisateur ne réfléchit jamais à un chemin de stockage : il dépose, et il retrouve.

L'interface doit rendre ce changement de paradigme **évident et rassurant** : un nouvel utilisateur habitué aux dossiers Windows doit comprendre en quelques secondes pourquoi « ne plus ranger » fonctionne mieux.

## Public cible & ton

- Utilisateurs : collaborateurs d'entreprise, pas forcément techniques. Vocabulaire métier clair, jamais de jargon informatique.
- Notions présentes : partage, droits d'accès, versions, collaboration, statut de validation.
- Le produit doit inspirer **confiance** (mes documents sensibles sont en sécurité et bien classés sans moi) et **rapidité** (je retrouve tout en une phrase).

## Direction visuelle

Style **SaaS moderne et épuré**, à la Linear / Notion : interface claire, beaucoup d'espace blanc, palette sobre (une couleur d'accent unique, des gris neutres, fonds clairs), typographie nette et hiérarchisée, coins arrondis doux, ombres légères, micro-interactions discrètes. Densité d'information maîtrisée — on respire. Iconographie fine et cohérente. Mode clair par défaut (prévois une élégance compatible avec un futur mode sombre).

Crée un système de design réutilisable : couleurs, typographie, composants (boutons, champs, tags/chips, cartes document, barre de recherche, panneaux latéraux, modales).

## Écrans à concevoir (prototype cliquable)

### 1. Accueil / Tableau de bord
- En tête de page : **une grande barre de recherche en langage naturel**, élément central et invitant, avec un placeholder du type « Décris le document que tu cherches… ».
- Sous la recherche : des **vues dynamiques** prêtes à l'emploi présentées comme des cartes ou des onglets — « Récents », « Partagés avec moi », « En attente de validation », « Mes projets », « Documents importants ». Ce sont des résultats de filtres, pas des dossiers.
- Une zone « Suggestions » où le système met en avant des documents pertinents (repris récemment, à valider, doublons détectés).
- Une **zone de dépôt (drag & drop)** visible, qui déclenche le classement automatique.

### 2. Dépôt d'un document (le moment « où ranger »… résolu)
- L'utilisateur glisse un fichier. **Pas de question « dans quel dossier ? ».**
- Claude analyse le document et propose instantanément : un **titre propre**, un **type** (contrat, facture, CR de réunion, note…), des **tags** (projet, client, date, personnes concernées), un **niveau de confidentialité** suggéré.
- Tout est **pré-rempli et éditable** : l'utilisateur valide ou corrige les tags d'un clic. Montre clairement que l'IA a fait le travail et que l'humain garde le contrôle.
- Bouton final : « Enregistrer » — sans jamais choisir d'emplacement.

### 3. Résultats de recherche sémantique (le moment « où trouver »… résolu)
- L'utilisateur a tapé une phrase en langage naturel. Affiche une liste de résultats classés par pertinence, avec pour chaque document : titre, type, tags, date, propriétaire, extrait de contenu surligné expliquant **pourquoi** ce résultat correspond.
- **Filtres latéraux dynamiques** (par tag, type, personne, période, statut) pour affiner — et montrer qu'un « dossier » n'est qu'une combinaison de filtres.
- Possibilité d'**enregistrer la recherche comme vue dynamique** réutilisable.

### 4. Vue détail d'un document
- Aperçu du document à gauche, panneau d'informations à droite : tags éditables, **résumé automatique** du contenu, historique des **versions**, personnes ayant accès, activité récente, documents liés/similaires.
- Actions : partager (avec gestion de droits simple), commenter, lancer une validation, télécharger.

### 5. Vue dynamique / collection
- Démonstration qu'une « vue » remplace un dossier : une page filtrée (ex. « Tous les contrats clients 2026 en attente de signature ») construite à partir de tags, modifiable en direct, partageable à une équipe.

## Interactions & détails à soigner

- La recherche en langage naturel doit paraître **intelligente** : suggestions au fil de la frappe, exemples de requêtes, compréhension d'intentions floues.
- Les **tags** sont des chips colorées cohérentes, cliquables (cliquer un tag = vue filtrée).
- Transitions fluides entre dépôt → confirmation des tags → apparition dans les vues.
- États vides pédagogiques (« Aucun document encore — glisse un fichier, on s'occupe du classement »).
- Rends le tout **cliquable et navigable** : on doit pouvoir passer de l'accueil à une recherche, ouvrir un document, naviguer dans une vue dynamique.

## Objectif

Un prototype qui démontre, écran après écran, qu'avec cette GED on ne se demande **jamais** où ranger un document ni où le retrouver. L'expérience doit donner envie de migrer depuis une GED traditionnelle à dossiers.
