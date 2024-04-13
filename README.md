# Getting Started

## Development

1. Clone the repository `git clone https://...`
2. Create a copy of the `.env.template` file and rename it to `.env`
3. Install node dependencies `npm install`
4. Run the database `docker compose up -d`
5. Run the database `npx prisma migrate dev --name "dev"`
6. Run the seed command `npm run seed`
7. Run the project `npm run dev`

### Testing PayPal

- Email: sb-zgidc30172835@personal.example.com
- Password: 0dEl?1/X

## Production

```
npx prisma migrate deploy
npm run seed
npm run build
```
