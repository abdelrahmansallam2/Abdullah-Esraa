import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { firestore, RSVP_COLLECTION } from '@/lib/firebase';

const LOCAL_STORAGE_KEY = 'wedding-rsvps';
const SUBMITTED_KEY = 'wedding-rsvp-submitted';

interface RsvpEntry {
  id: string;
  fullName: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no';
  message: string;
  createdAt: string;
}

function saveToLocalStorage(entry: RsvpEntry) {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  const list: RsvpEntry[] = raw ? JSON.parse(raw) : [];
  list.push(entry);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
}

export default function RSVPForm() {
  const shouldReduceMotion = useReducedMotion();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    localStorage.getItem(SUBMITTED_KEY) === 'true' ? 'success' : 'idle',
  );
  const [errorText, setErrorText] = useState('');

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setStatus('error');
      setErrorText('Please fill in your name and phone number.');
      return;
    }

    setStatus('submitting');
    setErrorText('');

    const entry: RsvpEntry = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      guests,
      attending,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      if (firestore) {
        await addDoc(collection(firestore, RSVP_COLLECTION), {
          fullName: entry.fullName,
          phone: entry.phone,
          guests: entry.guests,
          attending: entry.attending,
          message: entry.message,
          createdAt: serverTimestamp(),
        });
      } else {
        saveToLocalStorage(entry);
      }

      localStorage.setItem(SUBMITTED_KEY, 'true');
      setStatus('success');
    } catch (error) {
      console.error('RSVP submission failed, falling back to localStorage.', error);
      try {
        saveToLocalStorage(entry);
        localStorage.setItem(SUBMITTED_KEY, 'true');
        setStatus('success');
      } catch {
        setStatus('error');
        setErrorText('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section
      id="rsvp"
      className="bg-[#faf7f0] px-6 py-12"
      data-testid="section-rsvp"
    >
      <div className="invite-shell flex flex-col items-center">
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          CONFIRM ATTENDANCE
        </motion.h2>

        <div className="w-full max-w-md mt-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl border border-[#c9a84c]/40 bg-white/70 p-8 text-center flex flex-col items-center gap-3"
                data-testid="card-rsvp-success"
              >
                <CheckCircle2 className="h-10 w-10 text-[#1a3460]" strokeWidth={1.2} />
                <p className="font-display italic text-xl text-[#1a3460]">
                  Thank you for confirming!
                </p>
                <p className="text-sm font-sans text-[#1a3460]/70">
                  We can&apos;t wait to celebrate with you.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 rounded-2xl border border-[#c9a84c]/30 bg-white/60 p-6 sm:p-8"
              >
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="rsvp-name" className="text-xs tracking-wide uppercase text-[#1a3460]/70 font-sans">
                    Full Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    data-testid="input-rsvp-name"
                    className="rounded-lg border border-[#1a3460]/20 bg-[#faf7f0] px-4 py-3 text-sm font-sans text-[#1a3460] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60"
                    placeholder="Your full name"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="rsvp-phone" className="text-xs tracking-wide uppercase text-[#1a3460]/70 font-sans">
                    Phone Number
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-testid="input-rsvp-phone"
                    className="rounded-lg border border-[#1a3460]/20 bg-[#faf7f0] px-4 py-3 text-sm font-sans text-[#1a3460] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60"
                    placeholder="+20 1XX XXX XXXX"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="rsvp-guests" className="text-xs tracking-wide uppercase text-[#1a3460]/70 font-sans">
                    Number of Guests
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    data-testid="input-rsvp-guests"
                    className="rounded-lg border border-[#1a3460]/20 bg-[#faf7f0] px-4 py-3 text-sm font-sans text-[#1a3460] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60"
                  />
                </div>

                <fieldset className="flex flex-col gap-2 text-left">
                  <legend className="text-xs tracking-wide uppercase text-[#1a3460]/70 font-sans mb-1">
                    Will you attend?
                  </legend>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm font-sans text-[#1a3460]">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={attending === 'yes'}
                        onChange={() => setAttending('yes')}
                        data-testid="radio-attending-yes"
                        className="accent-[#1a3460]"
                      />
                      Attending
                    </label>
                    <label className="flex items-center gap-2 text-sm font-sans text-[#1a3460]">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === 'no'}
                        onChange={() => setAttending('no')}
                        data-testid="radio-attending-no"
                        className="accent-[#1a3460]"
                      />
                      Not Attending
                    </label>
                  </div>
                </fieldset>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="rsvp-message" className="text-xs tracking-wide uppercase text-[#1a3460]/70 font-sans">
                    Message (optional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    data-testid="input-rsvp-message"
                    className="rounded-lg border border-[#1a3460]/20 bg-[#faf7f0] px-4 py-3 text-sm font-sans text-[#1a3460] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/60 resize-none"
                    placeholder="Leave a note for the couple..."
                  />
                </div>

                {status === 'error' && (
                  <div
                    className="flex items-center gap-2 text-sm text-[#a3392b] font-sans"
                    data-testid="text-rsvp-error"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorText}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  data-testid="button-submit-rsvp"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a3460] text-[#f5efe0] font-sans text-sm tracking-wide py-4 shadow-md shadow-[#1a3460]/20 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Confirm Attendance'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
