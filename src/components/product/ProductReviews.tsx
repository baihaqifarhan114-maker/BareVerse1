import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReviewStore, reviewsForProduct } from '@/store/reviewStore';
import { useUserStore } from '@/store/userStore';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

type Props = { product: Product };

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={cn('transition-colors', onChange ? 'cursor-pointer' : 'cursor-default')}
        >
          <Star
            className={cn('h-5 w-5', n <= value ? 'fill-amber-400 text-amber-400' : 'text-ink/20')}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ product }: Props) {
  const user = useUserStore((s) => s.user);
  const onboarding = useUserStore((s) => s.onboarding);
  const allReviews = useReviewStore((s) => s.reviews);
  const addReview = useReviewStore((s) => s.addReview);
  const productReviews = reviewsForProduct(allReviews, product.id);

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [authorName, setAuthorName] = useState(onboarding?.name ?? user?.name ?? '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !authorName.trim()) return;
    addReview({
      productId: product.id,
      productName: product.name,
      authorName: authorName.trim(),
      rating,
      text: text.trim(),
    });
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h2 className="font-display text-2xl text-teal-deep mb-2">Ulasan Pelanggan</h2>
        <p className="text-sm text-ink/60">
          {productReviews.length} ulasan tersimpan di demo ini (localStorage browser kamu).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white border border-border space-y-4">
        <h3 className="font-display text-lg text-teal-deep">Tulis ulasan</h3>
        <div>
          <label className="text-xs font-medium text-ink/60 uppercase tracking-wider">Nama</label>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="mt-1 w-full px-4 py-2.5 rounded-xl border border-border bg-cream/50 text-sm"
            placeholder="Namamu"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60 uppercase tracking-wider">Rating</label>
          <div className="mt-1">
            <Stars value={rating} onChange={setRating} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60 uppercase tracking-wider">Ulasan</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="mt-1 w-full px-4 py-2.5 rounded-xl border border-border bg-cream/50 text-sm resize-none"
            placeholder="Ceritakan pengalamanmu dengan produk ini..."
            required
          />
        </div>
        <Button type="submit" disabled={submitted}>
          {submitted ? 'Terima kasih! Ulasan tersimpan.' : 'Kirim Ulasan'}
        </Button>
      </form>

      {productReviews.length === 0 ? (
        <p className="text-sm text-ink/50 text-center py-8">Belum ada ulasan untuk produk ini. Jadilah yang pertama!</p>
      ) : (
        <ul className="space-y-4">
          {productReviews.map((r) => (
            <li key={r.id} className="p-5 rounded-2xl bg-white border border-border">
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className="font-medium text-teal-deep">{r.authorName}</p>
                <time className="text-xs text-ink/40">
                  {new Date(r.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <Stars value={r.rating} />
              <p className="mt-3 text-sm text-ink/80 leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
