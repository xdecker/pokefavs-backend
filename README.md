# PokéFavs Backend


This is the backend API for managing favorite Pokémon lists.  

Built with **NestJS, Prisma, and SQLite**, it lets you create lists, save Pokémon, and retrieve them using a unique code.


---

## Stack

* NestJS
* Prisma ORM
* SQLite
* Jest (tests)

---

## Project structure

```bash
src/
│
├── common/          # Utils, helpers, reusable stuff
├── features/
│   └── favorites/  # Favorites module
│       ├── controller
│       ├── service
│       ├── dto
│       └── tests
│
├── prisma/          # PrismaService for dependency injection
│
├── app.module.ts
└── main.ts

prisma/
├── migrations/
└── schema.prisma
```

---

## Database

SQLite is used for local development..

file `.env`:

```env
DATABASE_URL="file:./dev.db"
```

The database will be created automatically when you run migrations.

---

## main model 

```prisma
model FavoriteList {
  id        String   @id @default(uuid())
  code      String   @unique
  pokemons  Json
  createdAt DateTime @default(now())
}
```

### Fields

* **id** → UUID of the list
* **code** → Unique code to share the list
* **pokemons** → JSON array of pokemons
* **createdAt** → Timestamp of creation

Example stored data:

```json
[
  { "id": 25, "name": "pikachu" },
  { "id": 6, "name": "charizard" }
]
```

---

## How to run the project

### 1) Install dependencies

```bash
npm install
```

---

### 2) Generate Prisma client

```bash
npx prisma generate
```

---

### 3) Run migrations (creates the DB)

```bash
npx prisma migrate dev --name init
```

Esto:

* Create `dev.db`
* Apply migrations
* Make prisma client ready

---

### 4) start backend

Development Mode:

```bash
npm run start:dev
```

Normal mode:

```bash
npm run start
```

The server will run on:

```
http://localhost:3000
```

---

## Tests

Unit tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

E2E:

```bash
npm run test:e2e
```

---

## Using Prisma in Nest

Inject PrismaService in your service::

```ts
constructor(private prisma: PrismaService) {}
```

Example query:

```ts
return this.prisma.favoriteList.findMany();
```

---

## Useful Scripts

# Generate Prisma client
```npx prisma generate```

# Open DB GUI
```npx prisma studio```

# Reset the database
```npx prisma migrate reset```

---

## Notess

* SQLite is meant for local development/testing.
* `pokemons` is stored as JSON for flexibility.
* The `code` field is unique and is used to share lists.


---

## Future improvements

* Swagger API docs
* Authentication / API keys
* Pagination
* CI/CD

---
