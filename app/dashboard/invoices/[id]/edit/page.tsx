import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { CreateInvoiceFormSkeleton } from '@/app/ui/skeleton';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Edit Invoice | Acme Dashboard',
};

type EditPageParams = Promise<{ id: string }>;

export default function Page(props: { params: EditPageParams }) {
  return (
    <main>
      <Suspense fallback={<CreateInvoiceFormSkeleton />}>
        <EditInvoicePageContent params={props.params} />
      </Suspense>
    </main>
  );
}

async function EditInvoicePageContent({ params }: { params: EditPageParams }) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </>
  );
}
