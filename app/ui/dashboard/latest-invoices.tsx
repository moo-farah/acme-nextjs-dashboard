import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { inter } from '@/app/ui/font';

const latestInvoices = [
  { id: '1', name: 'Lee Robinson', email: 'lee@example.com', amount: '$125.00', initial: 'L' },
  { id: '2', name: 'Delba de Oliveira', email: 'delba@example.com', amount: '$250.00', initial: 'D' },
  { id: '3', name: 'Amy Burns', email: 'amy@example.com', amount: '$80.00', initial: 'A' },
  { id: '4', name: 'Balazs Orban', email: 'balazs@example.com', amount: '$450.00', initial: 'B' },
  { id: '5', name: 'Michael Novotny', email: 'michael@example.com', amount: '$500.00', initial: 'M' },
];

export default function LatestInvoices() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx('flex flex-row items-center justify-between py-4', {
                'border-t': i !== 0,
              })}
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                  {invoice.initial}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p className={`${inter.className} truncate text-sm font-medium md:text-base`}>
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
