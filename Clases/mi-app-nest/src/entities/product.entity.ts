import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Category = 'vegetales' | 'frutas' | 'lacteos' | 'carnes' | 'bebidas' | 'otros';

export enum CategoryEnum {
    VEGETALES = 'vegetales',
    FRUTAS = 'frutas',
    LACTEOS = 'lacteos',
    CARNES = 'carnes',
    BEBIDAS = 'bebidas',
    OTROS = 'otros'
}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nameProduct: string;

    @Column()
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false, default: 'otros' })
    category: Category;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: true })
    isAvailable: boolean;
}