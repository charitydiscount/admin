export interface CaseImage {
    url: string;
}

export interface CharityCase {
    title: string;
    description: string;
    site: string;
    images: CaseImage[];
    funds?: number;
}
