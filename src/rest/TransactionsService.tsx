import { ExpressLink, ProxyDate, roundAmount, TxType } from "../Helper";
import { auth } from "../index";
import axios from "axios";
import { expressUrl } from "../index";

export interface TransactionDocDto {
    [id: number]: TransactionDto;
}

export interface TransactionDto {
    id: string,
    status: string,
    userId: string,
    target: TargetDto,
    amount: number,
    currency: string,
    createdAt: ProxyDate,
    updatedAt: ProxyDate
}

export interface TargetDto {
    id: string,
    name: string
}

export async function getTransactions(type: TxType) {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl;
    if (type === TxType.CASHOUT) {
        url += ExpressLink.CASHOUT;
    } else if (type === TxType.DONATION) {
        url += ExpressLink.DONATION;
    } else {
        return;
    }

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as TransactionDocDto)
        .map(([id, transaction]) => {
            return transaction
        })
        .sort((p1, p2) => {
            return p2.createdAt._seconds - p1.createdAt._seconds;
        });
}

export async function getNewTransactions(type: TxType) {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl;
    if (type === TxType.CASHOUT) {
        url += ExpressLink.CASHOUT;
    } else if (type === TxType.DONATION) {
        url += ExpressLink.DONATION;
    } else {
        return;
    }

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });


    let entries = Object.entries(response.data as TransactionDocDto)
        .map(([id, transaction]) => {
            return transaction
        })
        .filter(
            value => value.status !== "PAID" && value.status !== "REJECTED"
        );
    return entries.length;
}

export async function getTotalAmount(type: TxType, userId: string) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl;
    if (type === TxType.CASHOUT) {
        url += ExpressLink.CASHOUT;
    } else if (type === TxType.DONATION) {
        url += ExpressLink.DONATION;
    } else {
        return;
    }
    url += "/user/" + userId;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    let totalAmount = 0;
    Object.entries(response.data as TransactionDocDto)
        .map(([id, transaction]) => {
            return transaction;
        }).forEach(element => {
        totalAmount += (element as TransactionDto).amount;
    });

    return roundAmount(totalAmount);
}

export async function updateTransaction(type: TxType, transaction: TransactionDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl;
    if (type === TxType.CASHOUT) {
        url += ExpressLink.CASHOUT;
    } else if (type === TxType.DONATION) {
        url += ExpressLink.DONATION;
    } else {
        return;
    }
    url += "/" + transaction.id;

    let requestUpdate = {
        status: transaction.status,
        target: {
            id: transaction.target.id,
            name: transaction.target.name
        }
    };
    let response = await axios.put(url, requestUpdate, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}
