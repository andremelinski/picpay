import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallets } from "./wallets.entity";
import { UserRole } from "../../../../domain/gateways/gateways";


@Entity({name: 'users'})
export class Users{
    @PrimaryGeneratedColumn()
    user_id: number;
    
    @Column()
    first_name: string;
    
    @Column()
    last_name: string;
    
    @Column()
    document: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column()
    user_type: string; // TODO vira enum
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Wallets, (w) => w.user)
    wallet: Wallets
}