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
    source: string;
    averagePaymentTime: number;
    order: number;
    mainOrder: number;
    commissionInterval: string
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
        .filter(value => value && value.name)
        .sort((p1, p2) => {
            if (p1.mainOrder && p2.mainOrder) {
                return p1.mainOrder - p2.mainOrder;
            } else if (p1.mainOrder) {
                return p1.mainOrder - p2.order;
            } else if (p2.mainOrder) {
                return p1.order - p2.mainOrder;
            } else {
                return p1.order - p2.order
            }
        });
}

export async function updateProgram(program: ProgramDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.PROGRAMS + "/" + program.uniqueCode;

    let response = await axios.put(url, program, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}