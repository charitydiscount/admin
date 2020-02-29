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

    return commissions.sort((a, b) => {
        if (a.userId > b.userId) {
            return -1;
        } else {
            return 1;
        }
    });
}