import { redirect } from 'next/navigation';

export default function Home() {
  // By default, redirect to the dashboard which will handle authentication.
  redirect('/dashboard');
}
