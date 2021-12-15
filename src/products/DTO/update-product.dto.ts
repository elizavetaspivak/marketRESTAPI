export class UpdateProductDto {
    readonly title: string;
    readonly price: number;
    readonly image: string;
    readonly oldPrice: number;
    readonly credit: number;
    readonly calculatedRating: number;
    readonly description: string;
    readonly advantages: string;
    readonly disAdvantages: string;
    readonly categories: string[];
    readonly tags: string;
    readonly characteristics: {
        [key: string]: string;
    };
}