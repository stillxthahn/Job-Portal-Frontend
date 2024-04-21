export interface Company {
    companyName: string;
    email: string;
    password: string;
    id: number,
    token: string;
    companyType: string;
    companySize: string;
    country: string;
    workingDays: string;
    overTimePolicy: string;
    phone: string;
    quantityPeople: 8,
    description: Array<string>;
    reason: Array<string>;
    why: Array<string>;
    address: Array<string>;
    city: Array<string>;
    website: string;
    imageUrl: string;
    tags: Array<string>;
}

export interface City {
    key: number;
    value: string
}

export interface Job {
    city: string[];
    createAt: string;
    description: string;
    id: number;
    idCompany: number;
    name: string;
    salary: string;
    tags: string[]
    updateAt: string
    status: boolean
}