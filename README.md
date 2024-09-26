# 🚀 Next.js Redis Session Store Example

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

This [Next.js](https://nextjs.org/) project demonstrates how to use **Redis as a session store** for authentication. The application supports multiple authentication providers, offering a scalable and performant solution for your web applications.

## 📋 Table of Contents

- [🚀 Deploy with Redis Cloud on Vercel](#-deploy-with-redis-cloud-on-vercel)
- [✨ Features](#-features)
- [🌱 Getting Started](#-getting-started)
- [🛠️ Configuration](#️-configuration)
- [💾 Session Management with Redis](#-session-management-with-redis)
- [🗂️ Project Structure](#️-project-structure)
- [📜 Available Scripts](#-available-scripts)
- [📚 Learn More](#-learn-more)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Deploy with Redis Cloud on Vercel

Follow these steps to deploy your application with Redis Cloud on Vercel:

1. Click the "Deploy" button below to start the deployment process:

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fsession-store-nextjs&project-name=redis-session-store-nextjs&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22redis%22%2C%22productSlug%22%3A%22redis%22%7D%5D&env=NEXTAUTH_SECRET,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET&envDescription=Required%20environment%20variables%20for%20authentication&envLink=https://github.com/redis-developer/session-store-nextjs/blob/main/.env.local.example">
   <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

2. In the Vercel UI, create a new repository for your project.

![Create a new repository](./images/vercel-step-1.png?raw=true)

3. Add Redis as a store in the Vercel UI. This will automatically set your `REDIS_URL` environment variable.

![Add Redis Cloud store](./images/vercel-step-2.png?raw=true)

4. Wait for the deployment to complete.

![Add Redis Cloud store](./images/vercel-step-3.png?raw=true)

5. Once deployed, use the URL of your deployed app to set up the authentication providers. See the [Configuration](#️-configuration) section below for detailed instructions for setting these up. By default, the template is configured to use GitHub and Discord. Only one provider is required.

## ✨ Features

- 🗄️ **Redis Session Store**: Utilizes Redis for storing session data
- 🔐 **NextAuth.js Integration**: Implements authentication using NextAuth.js with a custom Redis adapter
- 🌐 **Multiple Authentication Providers**: Supports GitHub and Discord authentication
- ⚙️ **Dynamic Configuration**: Easily enable or disable authentication providers via environment variables

## 🌱 Getting Started

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