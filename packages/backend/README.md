# Portfolio API

## 📦 Installation

`NOTE:` The default e-mail and password is `admin@admin.com|admin@123`

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
$ yarn prisma db seed

# Run development environment
$ yarn start:dev
```

## 🚀 Used technologies
- Nest.js
- Node.js
- Prisma
- MongoDB
- Jest

## ✅ TODO
- [X] Unit testing
- [ ] E2E testing
- [X] Authentication
- [X] Redis cache implementation
- [X] Swagger implementation
- [ ] (Maybe) React frontend