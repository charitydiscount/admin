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