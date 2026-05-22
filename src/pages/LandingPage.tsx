export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cream">
      <h1 className="font-display text-5xl text-teal-deep">Bareverse</h1>
      <p className="text-ink/70 font-sans">Theme check: cream bg, teal heading, ink body.</p>
      <div className="flex gap-2">
        <span className="px-4 py-2 rounded-lg bg-teal-bright text-cream">teal-bright</span>
        <span className="px-4 py-2 rounded-lg bg-pink-crimson text-cream">pink-crimson</span>
        <span className="px-4 py-2 rounded-lg bg-sage text-forest">sage</span>
        <span className="px-4 py-2 rounded-lg bg-pink-soft text-pink-crimson">pink-soft</span>
      </div>
    </main>
  );
}
