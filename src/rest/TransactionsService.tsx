import { EXPRESS_URL, ExpressLink, ProxyDate, TxType } from "../Helper";
import { auth } from "../index";
import axios from "axios";

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
    let url = EXPRESS_URL;
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

export async function updateTransaction(type: TxType, transaction: TransactionDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL;
    if (type === TxType.CASHOUT) {
        url += ExpressLink.CASHOUT;
    } else if (type === TxType.DONATION) {
        url += ExpressLink.DONATION;
    } else {
        return;
    }
    url += "/" + transaction.id;

    let requestUpdate = {
        status: transaction.status
    };
    let response = await axios.put(url, requestUpdate, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}
