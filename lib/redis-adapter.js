import { createClient } from "redis";
import crypto from "crypto";

let redisClient;

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
  }

  return redisClient;
}

export const RedisJSONAdapter = () => {
  return {
    async createUser(user) {
      const redis = await getRedisClient();
      const id = crypto.randomUUID();
      await redis.json.set(`user:${id}`, "$", {
        ...user,
        id,
        loginCount: 0,
        lastLogin: null,
      });
      await redis.set(`user:email:${user.email}`, id);
      console.log("Created user:", id, "with initial login count: 0");
      return { id, ...user, loginCount: 0, lastLogin: null };
    },

    async getUser(id) {
      const redis = await getRedisClient();
      const user = await redis.json.get(`user:${id}`);
      console.log("Retrieved user:", id, "Data:", user);
      return user || null;
    },

    async getUserByEmail(email) {
      const redis = await getRedisClient();
      const userId = await redis.get(`user:email:${email}`);
      if (!userId) return null;
      const user = await redis.json.get(`user:${userId}`);
      console.log("Retrieved user by email:", email, "Data:", user);
      return user;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const redis = await getRedisClient();
      const accountKey = `account:${provider}:${providerAccountId}`;
      const userId = await redis.get(accountKey);
      if (!userId) return null;
      const user = await redis.json.get(`user:${userId}`);
      console.log("Retrieved user by account:", provider, providerAccountId, "Data:", user);
      return user;
    },

    async updateUser(user) {
      const redis = await getRedisClient();
      const id = user.id;
      await redis.json.set(`user:${id}`, "$", user);
      console.log("Updated user:", id, "New data:", user);
      return user;
    },

    async linkAccount(account) {
      const redis = await getRedisClient();
      const key = `account:${account.provider}:${account.providerAccountId}`;
      await redis.set(key, account.userId);
      console.log("Linked account:", key, "to user ID:", account.userId);
      return account;
    },

    async getLinkedAccounts(userId) {
      const redis = await getRedisClient();
      const pattern = `account:*:*`;
      const keys = await redis.keys(pattern);

      const linkedAccounts = [];
      for (const key of keys) {
        const linkedUserId = await redis.get(key);
        if (linkedUserId === userId) {
          const [_, provider] = key.split(":");
          linkedAccounts.push(provider);
        }
      }
      return linkedAccounts;
    },

    async createSession(session) {
      const redis = await getRedisClient();
      if (!(session.expires instanceof Date)) {
        session.expires = new Date(session.expires);
      }

      const expiresTimestamp = Math.floor(session.expires.getTime() / 1000);

      const sessionToStore = {
        ...session,
        expires: expiresTimestamp,
      };

      await redis.json.set(`session:${session.sessionToken}`, "$", sessionToStore);
      await redis.set(`session:user:${session.userId}`, session.sessionToken);

      console.log("Created session for user:", session.userId);

      return session;
    },

    async getSessionAndUser(sessionToken) {
      const redis = await getRedisClient();
      const session = await redis.json.get(`session:${sessionToken}`);
      if (!session) {
        console.log(`Session with token ${sessionToken} not found.`);
        return null;
      }

      session.expires = new Date(session.expires * 1000);

      const user = await redis.json.get(`user:${session.userId}`);
      if (!user) {
        console.log(`User with ID ${session.userId} not found.`);
        return null;
      }

      console.log("Retrieved session:", sessionToken);
      console.log("Retrieved user:", user);

      return {
        session,
        user: {
          ...user,
          loginCount: user.loginCount || 0,
          lastLogin: user.lastLogin || null,
        },
      };
    },

    async updateSession(session) {
      const redis = await getRedisClient();
      if (!(session.expires instanceof Date)) {
        session.expires = new Date(session.expires);
      }

      const expiresTimestamp = Math.floor(session.expires.getTime() / 1000);

      const sessionToStore = {
        ...session,
        expires: expiresTimestamp,
      };

      await redis.json.set(`session:${session.sessionToken}`, "$", sessionToStore);
      console.log("Updated session:", session.sessionToken);
      return session;
    },

    async deleteSession(sessionToken) {
      const redis = await getRedisClient();
      console.log(`Deleting session with token: ${sessionToken}`);
      await redis.del(`session:${sessionToken}`);
    },

    async createVerificationToken(verificationToken) {
      const redis = await getRedisClient();
      const tokenKey = `verification:${verificationToken.identifier}:${verificationToken.token}`;
      await redis.json.set(tokenKey, "$", verificationToken);
      console.log("Created verification token:", tokenKey);
      return verificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const redis = await getRedisClient();
      const tokenKey = `verification:${identifier}:${token}`;
      const verificationToken = await redis.json.get(tokenKey);
      if (!verificationToken) return null;
      await redis.del(tokenKey);
      console.log("Used and deleted verification token:", tokenKey);
      return verificationToken;
    },
  };
};
