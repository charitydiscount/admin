import { auth } from "../index";
import axios from 'axios';
import { EXPRESS_URL, ExpressLink } from "../Helper";


export interface ProgramDocDto {
    [uniqueCode: string]: ProgramDto;
}

export interface ProgramDto {
    currency: string;
    category: string;
    defaultLeadCommissionAmount: string;
    defaultLeadCommissionType: string;
    defaultSaleCommissionRate: string;
    defaultSaleCommissionType: string;
    logoPath: string;
    mainUrl: string;
    id: number;
    name: string;
    status: string;
    uniqueCode: string;
    averagePaymentTime: number;
    order: number;
}


export async function getPrograms() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.PROGRAMS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return Object.entries(response.data as ProgramDocDto)
        .map(([uniqueCode, program]) => {
            return program;
        })
        .sort((p1, p2) => p1.order - p2.order);
}