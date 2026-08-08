import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/services/supabase';
import SectionDivider from './SectionDivider';
import { weddingConfig } from '@/data/weddingConfig';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface WishRow {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 500;

function toWish(row: WishRow): Wish {
  return {
    id: String(row.id),
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

function formatCreatedAt(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })} · ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

export default function Guestbook() {
  const reduced = useReducedMotion();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [listLoading, setListLoading] = useState(isSupabaseConfigured);
  const [listError, setListError] = useState(false);

  const ordered = useMemo(
    () => [...wishes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [wishes],
  );

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Guestbook] Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the wishes backend.',
        );
      }
      setListLoading(false);
      return;
    }

    const client = supabase;
    let active = true;

    client
      .from('wishes')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (!active) return;
        setListLoading(false);
        if (error) {
          setListError(true);
          return;
        }
        setWishes((data ?? []).map(toWish));
      });

    const channel = client
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          const row = payload.new as WishRow;
          setWishes((prev) => {
            const wish = toWish(row);
            if (prev.some((existing) => existing.id === wish.id)) return prev;
            return [wish, ...prev];
          });
        },
      )
      .subscribe();

    return () => {
      active = false;
      client.removeChannel(channel);
    };
  }, []);

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    if (status !== 'idle') {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'loading' || !isSupabaseConfigured || !supabase) return;

    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (
      !cleanName ||
      cleanName.length > MAX_NAME_LENGTH ||
      !cleanMessage ||
      cleanMessage.length > MAX_MESSAGE_LENGTH
    ) {
      setErrorMsg(
        `Please add your name (up to ${MAX_NAME_LENGTH} characters) and your wishes (up to ${MAX_MESSAGE_LENGTH} characters).`,
      );
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert({ name: cleanName, message: cleanMessage })
        .select('id, name, message, created_at')
        .single();

      if (error) throw error;

      if (data) {
        setWishes((prev) => {
          const wish = toWish(data);
          if (prev.some((existing) => existing.id === wish.id)) return prev;
          return [wish, ...prev];
        });
      }
      setName('');
      setMessage('');
      setStatus('success');
    } catch {
      setErrorMsg('Could not save your wishes. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="guestbook" className="px-6 py-14" data-testid="section-guestbook">
      <div className="invite-shell">
        <SectionDivider />

        <div className="text-center">
          <BookOpen className="mx-auto h-7 w-7 text-[#c9a84c]" strokeWidth={1.2} />
          <h2 className="section-title mt-3">GUESTBOOK</h2>
          <p className="mt-2 font-display text-lg italic text-[#1a3460]/65">
            Leave a heartfelt message for {weddingConfig.groomName} &amp; {weddingConfig.brideName}.
          </p>
        </div>

        {isSupabaseConfigured ? (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#c9a84c]/35 bg-white/60 p-6 shadow-sm sm:p-8"
          >
            <label className="field-label" htmlFor="guestbook-name">Full Name</label>
            <input
              id="guestbook-name"
              value={name}
              onChange={(event) => handleChange(setName)(event.target.value)}
              className="field-input"
              placeholder="Your name"
              maxLength={MAX_NAME_LENGTH}
              data-testid="input-guestbook-name"
            />

            <label className="field-label mt-5" htmlFor="guestbook-message">Your Wishes</label>
            <textarea
              id="guestbook-message"
              value={message}
              onChange={(event) => handleChange(setMessage)(event.target.value)}
              className="field-input min-h-28 resize-none"
              placeholder={`Write a message for ${weddingConfig.groomName} & ${weddingConfig.brideName}...`}
              maxLength={MAX_MESSAGE_LENGTH}
              data-testid="input-guestbook-message"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a3460] py-3.5 text-sm tracking-wide text-[#f5efe0] transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
              data-testid="button-send-wishes"
            >
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {status === 'loading' ? 'Sending...' : 'Send Wishes'}
            </button>

            {status === 'error' && (
              <p className="mt-3 text-center text-sm text-[#a3392b]" data-testid="text-guestbook-error">
                {errorMsg}
              </p>
            )}
            {status === 'success' && (
              <p
                className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-[#1a3460]"
                data-testid="text-guestbook-success"
              >
                <CheckCircle2 className="h-4 w-4" /> Your wishes have been added.
              </p>
            )}
          </form>
        ) : (
          <div
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#c9a84c]/35 bg-white/60 p-6 text-center shadow-sm"
            data-testid="guestbook-config-notice"
          >
            <Info className="mx-auto h-6 w-6 text-[#c9a84c]" strokeWidth={1.2} />
            <p className="mt-3 font-display text-lg text-[#1a3460]">Guestbook is not connected to a database.</p>
            <p className="mt-1 text-sm font-sans text-[#1a3460]/60">
              Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable sharing wishes.
            </p>
          </div>
        )}

        {isSupabaseConfigured && (
          <div className="mx-auto mt-8 max-w-lg space-y-3">
            {listLoading && (
              <p className="text-center text-sm text-[#1a3460]/50">Loading wishes...</p>
            )}
            {!listLoading && listError && (
              <p className="text-center text-sm text-[#a3392b]" data-testid="text-guestbook-list-error">
                Could not load wishes. Check the Supabase configuration.
              </p>
            )}
            {!listLoading && !listError && ordered.length === 0 && (
              <p className="text-center text-sm text-[#1a3460]/50">
                Be the first to leave a wish.
              </p>
            )}
            {ordered.map((wish, index) => (
              <motion.article
                key={wish.id}
                className="rounded-2xl border border-[#1a3460]/10 bg-white/45 p-5 shadow-sm"
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                data-testid={`card-wish-${wish.id}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-[#1a3460]">{wish.name}</h3>
                  <time className="text-[10px] text-[#1a3460]/45">{formatCreatedAt(wish.createdAt)}</time>
                </div>
                <p className="mt-2 font-display text-lg leading-relaxed text-[#1a3460]/75">{wish.message}</p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
