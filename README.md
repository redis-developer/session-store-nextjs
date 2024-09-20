# 🚀 Next.js Redis Session Store Example

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

This [Next.js](https://nextjs.org/) project demonstrates how to use **Redis as a session store** for authentication. The application supports multiple authentication providers, offering a scalable and performant solution for your web applications.

## Deploy with Redis Cloud on Vercel

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fsession-store-nextjs&project-name=redis-session-store-nextjs&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22redis%22%2C%22productSlug%22%3A%22redis%22%7D%5D">
  <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

## ✨ Features

- 🗄️ **Redis Session Store**: Utilizes Redis for storing session data
- 🔐 **NextAuth.js Integration**: Implements authentication using NextAuth.js with a custom Redis adapter
- 🌐 **Multiple Authentication Providers**: Supports GitHub and Discord authentication
- ⚙️ **Dynamic Configuration**: Easily enable or disable authentication providers via environment variables

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Configuration

### Setting Up Redis

Ensure you have a Redis server running and configure the connection in your `.env` file:

```env
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password
```

### Enabling/Disabling Authentication Providers

Configure authentication providers by setting or omitting their respective environment variables in your `.env` file:

```env
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub Authentication
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Discord Authentication
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

- To enable a provider: Set both the `CLIENT_ID` and `CLIENT_SECRET`
- To disable a provider: Remove or comment out the `CLIENT_ID` and `CLIENT_SECRET`

### Obtaining Provider Credentials

- **GitHub**: Create a new OAuth app in your [GitHub settings](https://github.com/settings/developers)
- **Discord**: Create a new application in the [Discord Developer Portal](https://discord.com/developers/applications)

### NextAuth.js Secret

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 💾 Session Management with Redis

This application leverages Redis for efficient session data storage, offering:

- ⚡ **High Performance**: Fast read/write operations with in-memory data store
- 📈 **Scalability**: Share session data across multiple application instances
- 💽 **Optional Persistence**: Configure Redis to persist data to disk for recovery

## 🗂️ Project Structure

```
/
├── app/            # Next.js pages and API routes
├── components/     # Reusable React components
├── lib/            # Utility functions and custom adapters
├── hooks/          # Custom React hooks
└── styles/         # Global and brand-specific styles
```

## 📜 Available Scripts

- `npm run dev`: Run the app in development mode
- `npm run build`: Build the app for production
- `npm run start`: Start the production build
- `npm run lint`: Run linting on the codebase

## 📚 Learn More

Explore these resources to deepen your understanding:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Redis Documentation](https://redis.io/docs/)
- [Redis Clients for Node.js](https://redis.io/docs/clients/nodejs/)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)

## 🤝 Contributing

We welcome contributions! If you have ideas, suggestions, or encounter issues, please open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
