// In TypeScript, this is called a string union type.
// It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Customer = {
    id: string;
    name: string;
    email: string;
    image_url: string;
};

export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    status: 'pending' | 'paid';
};

export type Revenue = {
    month: string;
    revenue: number;
};

export type LatestInvoice = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
};

// The database returns a number for amount, but we want to display it as a string with the currency symbol.
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> &{
    amount: number;
};

export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    amount: number;
    status: 'pending' | 'paid';
};

export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
};

export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: string;
    total_pending: string;
    total_paid: string;
};

export type CustomerField = {
    id: string;
    name: string;
};

export type InvoiceForm ={
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
};

