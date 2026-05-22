import { cn } from '@/lib/utils';

export type QuestionOption<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

type Props<T extends string> = {
  title: string;
  subtitle?: string;
  options: QuestionOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
};

export function QuestionCard<T extends string>({ title, subtitle, options, selected, onSelect }: Props<T>) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-3xl md:text-4xl text-teal-deep leading-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-ink/70">{subtitle}</p>}
      </div>
      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              'text-left p-5 rounded-2xl border-2 transition-all',
              selected === opt.value
                ? 'border-teal-bright bg-teal-50/60'
                : 'border-border bg-white hover:border-teal-bright/40'
            )}
          >
            <div className="font-medium text-teal-deep">{opt.label}</div>
            {opt.hint && <div className="text-sm text-ink/60 mt-1">{opt.hint}</div>}
          </button>
        ))}
      </div>
    </section>
  );
}
