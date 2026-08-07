import { useMemo, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, CheckCircle2, Loader2, Send } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore, GUESTBOOK_COLLECTION } from '@/lib/firebase';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = 'wedding-guestbook';
const seedWish: Wish = { id: 'welcome', name: 'A loved one', message: 'Wishing you both a lifetime of happiness.', createdAt: '2026-07-31T23:02:21.000Z' };

function readWishes(): Wish[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Wish[] : [seedWish];
  } catch {
    return [seedWish];
  }
}

export default function Guestbook() {
  const reduced = useReducedMotion();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>(readWishes);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const ordered = useMemo(() => [...wishes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [wishes]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const wish: Wish = { id: crypto.randomUUID(), name: name.trim().slice(0, 80), message: message.trim().slice(0, 500), createdAt: new Date().toISOString() };
    try {
      if (firestore) await addDoc(collection(firestore, GUESTBOOK_COLLECTION), { name: wish.name, message: wish.message, createdAt: serverTimestamp() });
      const next = [wish, ...wishes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setWishes(next);
      setName('');
      setMessage('');
      setStatus('success');
    } catch {
      const next = [wish, ...wishes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setWishes(next);
      setName('');
      setMessage('');
      setStatus('success');
    }
  };

  return (
    <section id="guestbook" className="bg-[#faf7f0] px-6 py-14" data-testid="section-guestbook">
      <div className="invite-shell">
        <div className="text-center">
          <BookOpen className="mx-auto h-7 w-7 text-[#c9a84c]" strokeWidth={1.2} />
          <h2 className="section-title mt-3">GUESTBOOK</h2>
          <p className="mt-2 font-display text-lg italic text-[#1a3460]/65">Leave a little love for the newlyweds</p>
        </div>
        <form onSubmit={submit} className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#c9a84c]/35 bg-white/60 p-6 shadow-sm sm:p-8">
          <label className="field-label" htmlFor="guestbook-name">Name</label>
          <input id="guestbook-name" value={name} onChange={(event) => setName(event.target.value)} className="field-input" placeholder="Your name" data-testid="input-guestbook-name" />
          <label className="field-label mt-5" htmlFor="guestbook-message">Your wishes</label>
          <textarea id="guestbook-message" value={message} onChange={(event) => setMessage(event.target.value)} className="field-input min-h-28 resize-none" placeholder="Write a message for Shady & Maryam..." data-testid="input-guestbook-message" />
          <button type="submit" disabled={status === 'loading'} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a3460] py-3.5 text-sm tracking-wide text-[#f5efe0] transition-transform hover:scale-[1.01] disabled:opacity-70" data-testid="button-send-wishes">
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {status === 'loading' ? 'Sending...' : 'Send Wishes'}
          </button>
          {status === 'error' && <p className="mt-3 text-center text-sm text-[#a3392b]" data-testid="text-guestbook-error">Please add your name and wishes.</p>}
          {status === 'success' && <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-[#1a3460]" data-testid="text-guestbook-success"><CheckCircle2 className="h-4 w-4" /> Your wishes have been added.</p>}
        </form>
        <div className="mx-auto mt-8 max-w-lg space-y-3">
          {ordered.map((wish, index) => (
            <motion.article key={wish.id} className="rounded-2xl border border-[#1a3460]/10 bg-white/45 p-5" initial={{ opacity: 0, y: reduced ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.04 }} data-testid={`card-wish-${wish.id}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-[#1a3460]">{wish.name}</h3>
                <time className="text-[10px] text-[#1a3460]/45">{new Date(wish.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
              </div>
              <p className="mt-2 font-display text-lg leading-relaxed text-[#1a3460]/75">{wish.message}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}