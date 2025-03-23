
import { Skeleton } from "@/components/ui/skeleton";

const DestinationSkeleton = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-center">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default DestinationSkeleton;
