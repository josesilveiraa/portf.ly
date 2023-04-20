# :rocket: @portf.ly/backend

## 📦 Installation

```bash
# Clone the repository
$ git clone https://github.com/josesilveiraa/portf.ly/

# CD into it
$ cd portf.ly/

# Install dependencies
$ yarn install

# CD into backend package
$ cd packages/backend

# Get your containers running
$ docker-compose up -d

# Seed the database after putting the given values inside .env file
$ yarn prisma migrate dev && yarn prisma db seed

# Run development environment
$ yarn start:dev
```

## :closed_book: Notes

- The default user is `admin@admin.com` and its password is `admin@123`
- The database user is located in the `docker-compose.yml` file
- Once you have all containers running, you can access the database administration page on `http://localhost:8080`
- Once the server is running, you can access `http://localhost:3000/docs` to view the entire API description

## 🚀 Used technologies

- Nest.js
- Node.js
- Prisma
- PostgreSQL
- Jest

## ✅ TODO (in order of priority)

- [x] Unit testing
- [ ] E2E testing
- [x] Authentication
- [x] Redis cache implementation
- [x] Swagger implementation
- [ ] Next.js frontend
