"use client";

import { signIn, useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useNextAuthConfig } from "@/hooks/useNextAuthConfig";
import { useAuthProviders } from "@/hooks/useAuthProviders";

export default function Home() {
  useAuthRedirect("/dashboard", true);
  const { status } = useSession();
  const { nextAuthSecret, isLoading: isLoadingSecret } = useNextAuthConfig();
  const { providers, isLoading: isLoadingProviders } = useAuthProviders();

  const providerIcons = {
    github: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" clipRule="evenodd" />
      </svg>
    ),
    discord: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  };

  // Render provider login buttons
  const renderProviderButton = (provider) => {
    return (
      <Button
        key={provider.id}
        onClick={() => signIn(provider.id)}
        variant="outline"
        className="w-full mb-2"
      >
        {providerIcons[provider.id.toLowerCase()] || null}
        Login with {provider.name}
      </Button>
    );
  };

  // Show loading indicator while checking authentication status or loading config
  if (status === "loading" || isLoadingSecret || isLoadingProviders) {
    return <LoadingSpinner />;
  }

  // Avoid rendering login buttons if authenticated
  if (status === "authenticated") {
    return null;
  }

  // Render configuration warnings or login buttons
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {!nextAuthSecret ? "NEXTAUTH_SECRET not configured" : 
             providers.length === 0 ? "No providers configured" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {!nextAuthSecret ? (
              <div className="mb-4 text-left">
                <p className="mt-2">
                  Set <code className="bg-gray-200 p-1 rounded">NEXTAUTH_SECRET</code> in your <code className="bg-gray-200 p-1 rounded">.env</code> file.
                </p>
                <p className="mt-4 text-sm">For example:</p>
                <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="block">
                    NEXTAUTH_SECRET=your_generated_secret
                  </code>
                </pre>
                <p className="mt-4 text-sm">
                  Generate a secure secret using:
                  <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-x-auto">
                    <code>openssl rand -base64 32</code>
                  </pre>
                </p>
                <p className="mt-4 text-sm text-yellow-600">
                  Note: You may need to redeploy your app after setting environment variables.
                </p>
              </div>
            ) : providers.length === 0 ? (
              <div className="mb-4 text-left">
                <p className="mt-2">
                  Configure authentication providers by setting <code className="bg-gray-200 p-1 rounded">CLIENT_SECRET</code> and <code className="bg-gray-200 p-1 rounded">CLIENT_ID</code> in your <code className="bg-gray-200 p-1 rounded">.env</code> file. 
                </p>
                <p className="mt-4 text-sm">For example:</p>
                <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="block">
                    GITHUB_CLIENT_ID=your_github_client_id
                    GITHUB_CLIENT_SECRET=your_github_client_secret
                  </code>
                </pre>
                <p className="mt-4 text-sm">
                  <a 
                    href="https://github.com/redis-developer/session-store-nextjs?tab=readme-ov-file#provider-specific-configuration" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    See docs for details on setting up providers
                  </a>
                </p>
                <p className="mt-4 text-sm text-yellow-600">
                  Note: You may need to redeploy your app after setting environment variables.
                </p>
              </div>
            ) : (
              providers.map(renderProviderButton)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
