export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class CreateTopPageDto {
    readonly firstCategory: TopLevelCategory;
    readonly secondCategory: string;
    readonly title: string;
    readonly category: string;
    readonly hh?: {
        count: number;
        juniorSalary: number;
        middleSalary: number;
        seniorSalary: number;
    };
    readonly adventages: {
        title: string;
        description: string
    }[];
    readonly seoText: string;
    readonly tags: string[];
    readonly tagsTitle: string;
}