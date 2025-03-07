

export interface IBaseRepository<T> {


    create(data: Partial<T>): Promise<T>;
    find(): Promise<T[]>;
    findOne(filter: any): Promise<T| null>;
}