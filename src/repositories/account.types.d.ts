
// Event type
export type EventType = 'deposit' | 'withdraw' | 'transfer';

// Event data
export interface EventData {
    type: EventType;
    amount: number;
    destination?: string;
    origin?: string;
}

// Account data
export interface AccountData {
    id: string;
    balance: number;
}

// Response data
export interface ResponseData {
    destination?: AccountData;
    origin?: AccountData;
}