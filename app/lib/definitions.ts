// In TypeScript, this is called a string union type.
// It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.

export type Invoice = {
    id: string;
    customerId: string;
    amount: number;
    date: string;
    status: "pending" | "paid";
};