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
    idCompany: number;
    id: number;
    name: string;
    tags: Array<string>;
    location: string,
    salary: "2500",
    overview: Array<string>;
    responsibilities: Array<string>;
    experience: Array<string>;
    city: Array<string>;
    status: boolean;
    createAt: string;
}

export interface CompanyWithJobsCount extends Company {
    jobsCount: number;
}