# TODO.md — MarsAI

Idées non planifiées, sans urgence. Voir `TASKS.md` pour ce qui est réellement suivi.

- Commentaire obsolète dans `marsai_backend/src/controllers/submission.controller.ts` (~ligne 126) : dit "statut 'approved'... pas encore d'interface de modération" alors que le code fait déjà `status: 'pending'`. Cosmétique, à nettoyer un jour.
- Reconstruire l'image Docker `marsai_backend` (actuellement `Exited (1)`, `dist/server.js` manquant — image jamais reconstruite après les derniers changements de code). Contournée cette session via `npm run dev` local, hors scope du chantier dette technique.
- Chunk JS frontend > 500 kB après build (`vite build` avertit) — envisager du code-splitting (`build.rollupOptions.output.manualChunks`) si la taille devient un problème réel.
- Incohérence de préfixe API : `/api/submissions` a un préfixe `/api`, toutes les autres routes (`/movies`, `/festivals`, etc.) n'en ont pas. Ne pas "corriger" sans coordination — c'est un contrat déjà utilisé par le frontend.
