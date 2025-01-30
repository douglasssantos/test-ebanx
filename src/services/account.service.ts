
import * as accountRepo from '../repositories/account.repo';
import {AccountData, ResponseData} from "../repositories/account.types";

export const getAllAccounts = () => {
    return accountRepo.getAllAccounts();
}

export const getAccount = (id: string) => {
    return accountRepo.getAccount(id);
}

export const getBalance = (id: string) => {
    const account = accountRepo.getAccount(id);

    if(!account)
        return null;

    return account?.balance
}

const newDeposit = (account: AccountData) => {

    let destinationAccount = accountRepo.getAccount(account.id);

    if(!destinationAccount) {
        destinationAccount = accountRepo.getAccountByIndex(accountRepo.createAccount(account)-1);
    }else {
        destinationAccount.balance += account.balance;
        accountRepo.updateAccount(account.id, destinationAccount);
    }

    return destinationAccount;

}

export const deposit = (account: AccountData) => {

    return {destination: newDeposit(account)};

}

export const withdraw = (account: AccountData) => {
    const destinationAccount = accountRepo.getAccount(account.id);

    if(!destinationAccount)
        return null;

    destinationAccount.balance -= account.balance;
    accountRepo.updateAccount(account.id, destinationAccount);

    return {origin: destinationAccount};
}

export const transfer: ResponseData|any = (origin: string, destination: string, amount: number)  => {
    const originAccount: AccountData|any = accountRepo.getAccount(origin);
    let destinationAccount : AccountData|any = accountRepo.getAccount(destination);

    if (originAccount) {

        originAccount.balance -= amount;
        accountRepo.updateAccount(origin, originAccount);

        if(!destinationAccount) {
            destinationAccount = newDeposit({id: destination, balance: amount});
        }else {
            destinationAccount.balance += amount;
            accountRepo.updateAccount(destination, destinationAccount);
        }

        return { origin: originAccount, destination: destinationAccount };

    }

    return null;
}

export const deleteAllAccounts = () => accountRepo.deleteAllAccounts();