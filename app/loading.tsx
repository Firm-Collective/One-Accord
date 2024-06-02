import { Loading as Spinner } from '@/components/loading';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner width={48} height={48} />
    </div>
  );
}
