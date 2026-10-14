import { CreateInvoice } from '@/app/ui/invoices/button';
import Table from '@/app/ui/invoices/table';
import { inter } from '@/app/ui/font';
import {
  InvoicesListSkeleton,
  InvoicesSearchSkeleton,
} from '@/app/ui/skeleton';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

type InvoicesSearchParams = Promise<{
  query?: string;
  page?: string;
}>;

export default function Page(props: { searchParams?: InvoicesSearchParams }) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<InvoicesSearchSkeleton />}>
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesListSkeleton />}>
        <InvoicesList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function InvoicesList({
  searchParams,
}: {
  searchParams?: InvoicesSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return (
    <>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination query={query} currentPage={currentPage} />
      </div>
    </>
  );
}
