import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | Acme Dashboard',
};

export default function Page() {
  redirect('/dashboard/overview');
}
