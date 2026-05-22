import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, AlertCircle, ScanFace } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  onScanComplete: () => void;
};

type Phase = 'idle' | 'requesting' | 'ready' | 'denied' | 'scanning' | 'analyzing';

const SCAN_MESSAGES = [
  'Menganalisis tekstur kulit...',
  'Mendeteksi pola jerawat & komedo...',
  'Mengukur tingkat hidrasi...',
  'Menghitung rekomendasi rutinitas...',
];

export function CameraScan({ onScanComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startCamera = async () => {
    setPhase('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPhase('ready');
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setPhase('denied');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const runScan = () => {
    if (phase !== 'ready') return;
    setPhase('scanning');
    setMsgIndex(0);

    const total = 3500;
    const tick = total / SCAN_MESSAGES.length;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i < SCAN_MESSAGES.length) {
        setMsgIndex(i);
      } else {
        clearInterval(interval);
      }
    }, tick);

    setTimeout(() => {
      clearInterval(interval);
      stopCamera();
      setPhase('analyzing');
      onScanComplete();
    }, total + 200);
  };

  if (phase === 'denied') {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 p-8 rounded-3xl bg-pink-soft/20 border border-pink-soft/40">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-pink-crimson/15 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-pink-crimson" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-teal-deep mb-2">Kamera tidak dapat diakses</h3>
          <p className="text-ink/70 text-sm leading-relaxed">
            Kamu menolak izin kamera, atau perangkatmu tidak punya webcam. Tidak masalah —
            kamu masih bisa diagnosa lewat form singkat.
          </p>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link to="/diagnosa/form">Pakai Form Diagnosa →</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="relative aspect-[4/5] md:aspect-[4/3] rounded-3xl overflow-hidden bg-teal-deep/5 border border-border">
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />

        <div className="pointer-events-none absolute inset-6 rounded-3xl border-2 border-cream/50 border-dashed" />

        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-teal-deep/5">
            <ScanFace className="h-12 w-12 text-teal-deep/40 mb-4" />
            <p className="text-ink/60 text-sm">Klik tombol di bawah untuk mengaktifkan kamera.</p>
          </div>
        )}

        {phase === 'requesting' && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/80 backdrop-blur-sm">
            <p className="font-medium text-teal-deep">Meminta akses kamera...</p>
          </div>
        )}

        {(phase === 'scanning' || phase === 'analyzing') && (
          <>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-crimson to-transparent shadow-[0_0_20px_rgba(209,64,99,0.8)] animate-scanline" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
              <p className="text-cream font-medium text-center transition-opacity">
                {SCAN_MESSAGES[msgIndex]}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        {phase === 'idle' && (
          <Button onClick={startCamera} size="lg">
            <Camera className="h-4 w-4" /> Aktifkan Kamera
          </Button>
        )}
        {phase === 'ready' && (
          <Button onClick={runScan} variant="crimson" size="lg">
            <ScanFace className="h-4 w-4" /> Scan Sekarang
          </Button>
        )}
        {(phase === 'scanning' || phase === 'analyzing') && (
          <Button disabled size="lg">
            <span className="inline-block h-2 w-2 rounded-full bg-cream animate-pulse" />
            Menganalisis...
          </Button>
        )}
      </div>

      <p className="text-xs text-ink/50 text-center max-w-md mx-auto">
        Demo mode: foto kamu tidak disimpan atau diunggah. Analisis dilakukan secara lokal di browser.
      </p>
    </div>
  );
}
