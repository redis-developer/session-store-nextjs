import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getRedisClient } from "../../../lib/redis-adapter";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const redis = await getRedisClient();

    // Fetch user data
    const userData = await redis.json.get(`user:${session.user.id}`);

    // Combine the data
    const combinedData = {
      user: {
        ...userData,
        loginCount: userData.loginCount || 0,
        lastLogin: userData.lastLogin || null,
        linkedAccounts: session.user.linkedAccounts || [],
      },
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Handle other POST operations if needed
    return NextResponse.json({ message: "Operation completed successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
