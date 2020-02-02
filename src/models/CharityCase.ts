export interface CaseImage {
    url: string;
}

export interface CharityCase {
    id?: string;
    title: string;
    description: string;
    site: string;
    images: CaseImage[];
    funds?: number;
}
