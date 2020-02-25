import { auth } from "../index";
import { EXPRESS_URL, ExpressLink } from "../Helper";
import axios from "axios";
import { firestore } from 'firebase/app';


export interface CashoutDocDto {
    [id: number]: CashoutDto;
}

export interface CashoutDto {
    status: string,
    userId: string,
    target: string,
    amount: number,
    currency: string,
    createdAt: ProxyDate,
    updatedAt: ProxyDate
}

export interface ProxyDate {
    _seconds: string
    _nanoseconds: string
}


export async function getCashouts() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.CASHOUT;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as CashoutDocDto)
        .map(([index, cashout]) => {
            return cashout;
        })
        .sort((p1, p2) => {
            return p2.createdAt._seconds - p1.createdAt._seconds;
        });
}