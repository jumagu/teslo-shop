# Teslo Shop

This project was developed in a course I took called "Next.js: the react framework for production" (original title: "Next.js: el framework de react para producción") on Udemy. However, I improved 99% of the visual interface and adapted it to the design of the official Tesla store, since the design of the course project was pretty bad. In addition, I added new features the course project does not have, such as responsive design, form feedback, not-found page, search page, search feature and many other improvements.

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
