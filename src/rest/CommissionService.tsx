import { auth } from "../index";
import { EXPRESS_URL, ExpressLink, ProxyDate } from "../Helper";
import axios from "axios";
import { ProgramDto } from "./ProgramService";

export interface CommissionDto {
    userId: string,
    commissionId: string,
    details: CommissionResponseDto
}

type CommissionWrapperDto = CommissionDocDto & {
    userId: string;
};

export interface CommissionDocDto {
    [id: string]: CommissionResponseDto;
}

export interface CommissionResponseDto {
    shopId: string,
    status: string,
    reason: string,
    amount: number,
    currency: string,
    originalCurrency: string,
    program: ProgramDto,
    createdAt: ProxyDate,
    updatedAt: ProxyDate
}

export interface CommissionCreateDto {
    shopId: string,
    status: string,
    reason: string,
    originalAmount: number,
    originId: string,
    originalCurrency: string,
    program: CommissionProgramDto,
}

export interface CommissionProgramDto {
    slug: string,
    status: string,
    name: string,
    paymentType: string,
    userLogin: string,
    logo: string
}

export const DEFAULT_COMMISSION_PROGRAM: CommissionProgramDto = {
    slug: '',
    status: '',
    name: '',
    paymentType: '',
    userLogin: '',
    logo: '',
};

export const DEFAULT_COMMISSION: CommissionCreateDto = {
    shopId: '',
    status: '',
    reason: '',
    originalAmount: 0,
    originId: '',
    originalCurrency: 'RON',
    program: DEFAULT_COMMISSION_PROGRAM
};

export async function getCommissions() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.COMMISSIONS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    let commissions = [] as CommissionDto[];
    Object.entries((response.data || {}))
        .filter(value => {
            let response = value[1] as CommissionWrapperDto;
            return response && response.userId;
        })
        .forEach(value => {
            let response = value[1] as CommissionWrapperDto;
            let userId = response.userId;
            Object.entries(response)
                .filter(([id]) => {
                    return id !== 'userId';
                })
                .forEach(
                    ([id, commission]) => {
                        commissions.push({
                            "userId": userId,
                            "commissionId": id,
                            "details": commission
                        })
                    }
                )
        });

    return commissions
        .sort((p1, p2) => {
            if (p1.details.createdAt._seconds > p2.details.createdAt._seconds) {
                return -1;
            } else {
                return 1;
            }
        });
}

export async function updateCommission(userId: string, commissionId: string, commission: CommissionDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + '/user' + userId + '/' + ExpressLink.COMMISSIONS + '/' + commissionId;

    let requestUpdate = {
        status: commission.details.status,
        reason: commission.details.reason,
        amount: commission.details.amount
    };

    let response = await axios.put(url, requestUpdate, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}

export async function createCommission(userId: string, commission: CommissionCreateDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }
    if (!userId || (userId.length < 1)) {
        throw Error('Enter an user id');
    }
    if (!commission.shopId || (commission.shopId.length < 1)) {
        throw Error('Select a shop');
    }
    if (!commission.status || (commission.status.length < 1)) {
        throw Error('Select a status');
    }
    if (!commission.originalAmount || (commission.originalAmount < 1)) {
        throw Error('Enter an amount');
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + 'user/' + userId + '/' + ExpressLink.COMMISSIONS;

    let response = await axios.post(url, commission, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}