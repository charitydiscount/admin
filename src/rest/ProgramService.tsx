import { auth } from "../index";
import axios from 'axios';
import { EXPRESS_URL, ExpressLink } from "../Helper";

export interface ProgramDocDto {
    [uniqueCode: string]: ProgramDto;
}

export interface ProgramDto {
    currency: string,
    category: string,
    defaultLeadCommissionAmount: string,
    defaultLeadCommissionType: string,
    defaultSaleCommissionRate: string,
    defaultSaleCommissionType: string,
    logoPath: string,
    mainUrl: string,
    id: number,
    name: string,
    status: string,
    uniqueCode: string,
    source: string,
    averagePaymentTime?: number,
    order: number,
    mainOrder?: number,
    commissionInterval?: string,
    workingCurrencyCode: string,
    sellingCountries?: Country[],
    productsCount?: number
}

export const DEFAULT_COUNTRY = {
    code: "RO",
    id: 690,
    currency: "RON",
    name: "Romania"
};


export const DEFAULT_PROGRAM: ProgramDto = {
    currency: 'RON',
    category: '',
    defaultLeadCommissionAmount: '',
    defaultLeadCommissionType: '',
    defaultSaleCommissionRate: '',
    defaultSaleCommissionType: '',
    logoPath: '',
    mainUrl: '',
    id: 0,
    name: '',
    status: '',
    uniqueCode: '',
    source: '',
    order: 55000,
    workingCurrencyCode: 'RON',
    sellingCountries: [DEFAULT_COUNTRY]
};

export interface Country {
    code: string,
    id: number,
    currency: string,
    name: string
}


export async function getPrograms() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.PROGRAMS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
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

export async function createProgram(program: ProgramDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }
    if (!program.category || (program.category.length < 1)) {
        throw Error('Enter a category');
    }
    if (!program.mainUrl || (program.mainUrl.length < 1)) {
        throw Error('Enter a main url');
    }
    if (!program.logoPath || (program.logoPath.length < 1)) {
        throw Error('Enter a logo path');
    }
    if (!program.status || (program.status.length < 1)) {
        throw Error('Enter a status');
    }
    if (!program.source || (program.source.length < 1)) {
        throw Error('Enter a source');
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.PROGRAMS;

    let response = await axios.post(url, program, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}