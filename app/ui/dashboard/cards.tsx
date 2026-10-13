import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/font';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper() {
  return (
    <>
      <Card title="Collected" value="$2,000.00" type="collected" />
      <Card title="Pending" value="$1,000.00" type="pending" />
      <Card title="Total Invoices" value={12} type="invoices" />
      <Card title="Total Customers" value={8} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${inter.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
