import express, { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/account.service';
import {AccountData, EventData} from "../repositories/account.types";
import AccountRoutes from "../routes/account.routes";
import accountRoutes from "../routes/account.routes";

const getAllAccounts = async (req: Request, res: Response) => {
    res.send(AccountService.getAllAccounts());
}

const getAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send({ id });
}

const event: any = async (req: Request, res: Response) => {


    const event = req.body as EventData;

    let eventResponse = null

    let accountData = {id: event?.origin ?? event?.destination, balance: event?.amount} as AccountData;

    if(event.type === "deposit") {
        eventResponse = AccountService.deposit(accountData);
    }

    if (event.type === "withdraw") {
        eventResponse = AccountService.withdraw(accountData);
    }

    if(event.type === "transfer") {
        eventResponse = AccountService.transfer(event.origin, event.destination, event.amount);
    }


    if(!eventResponse) {
        res.status(404).send('0');

    } else{
        res.status(201).send(eventResponse);
    }


}

export const balance = async (req: Request, res: Response) => {
    const { account_id } : any = req.query;

    const getBalance = AccountService.getBalance(account_id)

    if(!getBalance) {
        res.status(404).send('0');

    } else{
        res.send(`${getBalance}`).sendStatus(201);
    }


    res.send({ok:1, ...req.query});
}

export const deleteAllAccounts = async (req: Request, res: Response) => {
    AccountService.deleteAllAccounts();
    res.status(200).send("OK");
}

export default {
    getAccount,
    getAllAccounts,
    event,
    balance,
    deleteAllAccounts
}