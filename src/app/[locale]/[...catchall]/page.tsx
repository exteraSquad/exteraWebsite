import {notFound} from 'next/navigation';

export default function CatchAll() {
    // `not-found` page currently only works if it's a top-level file (which is not possible with i18n)
    // or if it's called from a server component (which is what we're doing here)
    notFound();
    return null;
}