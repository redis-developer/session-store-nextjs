import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { RedisJSONAdapter } from "@/lib/redis-adapter"; // Import the custom RedisJSON adapter
import DiscordProvider from "next-auth/providers/discord";
import { getRedisClient } from "@/lib/redis-adapter";

// Helper function to check environment variables
const checkEnv = (name) => {
  return process.env[name] || null;
};

// Ensure all required environment variables are set
const githubClientId = checkEnv("GITHUB_CLIENT_ID");
const githubClientSecret = checkEnv("GITHUB_CLIENT_SECRET");
const discordClientId = checkEnv("DISCORD_CLIENT_ID");
const discordClientSecret = checkEnv("DISCORD_CLIENT_SECRET");
const nextAuthSecret = checkEnv("NEXTAUTH_SECRET");

const providers = [];

// Add GitHub provider if credentials are available
if (githubClientId && githubClientSecret) {
  providers.push(
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    })
  );
}

// Add Discord provider if credentials are available
if (discordClientId && discordClientSecret) {
  providers.push(
    DiscordProvider({
      clientId: discordClientId,
      clientSecret: discordClientSecret,
    })
  );
}

// NextAuth configuration
export const authOptions = {
  providers,
  adapter: RedisJSONAdapter(), // Use the custom RedisJSON adapter
  secret: nextAuthSecret,
  session: {
    strategy: "database",
    maxAge: 30 * 60, // 30 minutes
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const redis = await getRedisClient();
      const adapter = RedisJSONAdapter();

      // Extract name and image from profile
      let name = profile.name || user.name;
      let image = profile.picture || user.image;

      // Provider-specific adjustments
      if (account.provider === 'github') {
        name = profile.name || profile.login || user.name;
        image = profile.avatar_url || user.image;
      } else if (account.provider === 'discord') {
        name = profile.username || user.name;
        image = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` || user.image;
      }

      // Check if a user with this email already exists
      const existingUserId = await redis.get(`user:email:${user.email}`);

      if (existingUserId) {
        // User exists, update their information
        const existingUser = await redis.json.get(`user:${existingUserId}`);

        // Update linked accounts
        await adapter.linkAccount({
          userId: existingUserId,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        const linkedAccounts = await adapter.getLinkedAccounts(existingUserId);

        const updatedUser = {
          ...existingUser,
          name: name || existingUser.name,
          image: image || existingUser.image,
          loginCount: (existingUser.loginCount || 0) + 1,
          lastLogin: new Date().toISOString(),
          linkedAccounts,
        };

        await redis.json.set(`user:${existingUserId}`, "$", updatedUser);

        return true;
      }

      // If user doesn't exist, create a new one
      const newUser = {
        id: user.id,
        email: user.email,
        name: name,
        image: image,
        loginCount: 1,
        lastLogin: new Date().toISOString(),
        linkedAccounts: [account.provider],
      };

      await redis.json.set(`user:${newUser.id}`, "$", newUser);
      await redis.set(`user:email:${newUser.email}`, newUser.id);

      // Link the account
      await adapter.linkAccount({
        userId: newUser.id,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      return true;
    },

    async session({ session, user }) {
      const redis = await getRedisClient();

      // Fetch the latest user data from Redis
      const updatedUser = await redis.json.get(`user:${user.id}`);

      if (updatedUser) {
        session.user = {
          ...session.user,
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
          loginCount: updatedUser.loginCount,
          lastLogin: updatedUser.lastLogin,
          linkedAccounts: updatedUser.linkedAccounts || [],
        };
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
