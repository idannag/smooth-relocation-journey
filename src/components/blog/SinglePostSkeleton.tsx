
import { Skeleton } from "@/components/ui/skeleton";

const SinglePostSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <Skeleton className="h-8 w-32 mb-8" />
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/3 mb-8" />
      <Skeleton className="h-64 w-full mb-8" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <Skeleton className="h-10 w-40" />
    </div>
  );
};

export default SinglePostSkeleton;
