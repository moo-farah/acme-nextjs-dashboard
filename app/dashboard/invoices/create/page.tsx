import { fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateInvoiceForm from '@/app/ui/invoices/create-form';
import { CreateInvoiceFormSkeleton } from '@/app/ui/skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create Invoice | Acme Dashboard',
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Suspense fallback={<CreateInvoiceFormSkeleton />}>
        <CreateInvoiceFormLoader />
      </Suspense>
    </main>
  );
}

async function CreateInvoiceFormLoader() {
  const customers = await fetchCustomers();
  return <CreateInvoiceForm customers={customers} />;
}
