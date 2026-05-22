import { cn } from '@/lib/utils';

type Props = { current: number; total: number; className?: string };

export function StepProgress({ current, total, className }: Props) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium tracking-wider uppercase text-teal-deep">
          Langkah {current} dari {total}
        </span>
      </div>
      <div className="h-1.5 bg-teal-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-bright transition-all duration-500 ease-out rounded-full"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
