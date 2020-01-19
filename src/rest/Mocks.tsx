export interface CommissionDto {
    amount: number;
    createdAt: Date,
    currency: string,
    shopId: string;
    program: ProgramDto
    status: string;
}

export interface ProgramDto {
    name: string
}

export const CommissionJson = {
    "userId1": {
        "commissionId1": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "paid",
            updatedAt: "01/01/2020"
        },
        "commissionId2": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        },
        "commissionId3": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        }
    },
    "userId2": {
        "commissionId4": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "paid",
            updatedAt: "01/01/2020"
        },
        "commissionId5": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        },
        "commissionId6": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        }
    },
    "userId3": {
        "commissionId7": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "paid",
            updatedAt: "01/01/2020"
        },
        "commissionId8": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        },
        "commissionId9": {
            amount: 0.6,
            createdAt: "9/22/2019",
            currency: "EUR",
            shopId: "shopId1",
            program: {
                name: "shopId1Name"
            },
            status: "pending",
            updatedAt: "01/01/2020"
        }
    }
};