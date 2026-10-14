import CustomersTable from '@/app/ui/customers/table';
import { inter } from '@/app/ui/font';
import {
  CustomersTableSkeleton,
  InvoicesSearchSkeleton,
} from '@/app/ui/skeleton';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers | Acme Dashboard',
};

type CustomersSearchParams = Promise<{
  query?: string;
}>;

export default function Page(props: { searchParams?: CustomersSearchParams }) {
  return (
    <div className="w-full">
      <h1 className={`${inter.className} text-2xl`}>Customers</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<InvoicesSearchSkeleton />}>
          <Search placeholder="Search customers..." />
        </Suspense>
      </div>
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersSection searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function CustomersSection({
  searchParams,
}: {
  searchParams?: CustomersSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  return <CustomersTable query={query} />;
}
