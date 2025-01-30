import { AccountData } from "./account.types";

const accounts: AccountData[] = [];

export const getAccountByIndex: AccountData|any = (index: number) => accounts[index];

export const getAllAccounts = () => accounts;

export const createAccount = (account: AccountData) => accounts.push(account);

export const getAccount = (id: string) => accounts.find(account => account.id === id);

export const updateAccount = (id: string, account: AccountData) => {
    const index = accounts.findIndex(account => account.id === id);
    accounts[index] = account;
}

export const deleteAccount = (id: string) => {
    const index = accounts.findIndex(account => account.id === id);
    accounts.splice(index, 1);
}

export const deleteAllAccounts = () => accounts.splice(0, accounts.length);