import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
}