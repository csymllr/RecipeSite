# RecipeSite 🍳 (Firebase Full)

A Vue + Firebase project for parsing and saving recipes. Includes:
- Firebase Auth
- Firestore for storage
- Firebase Hosting
- Firebase Functions for AI recipe parsing

## Setup

1. `firebase login`
2. `firebase init` (Hosting, Firestore, Functions)
3. `pnpm install` in both `client/` and `functions/`
4. `firebase functions:config:set openai.key="sk-..."` to add OpenAI key
5. `firebase deploy`
