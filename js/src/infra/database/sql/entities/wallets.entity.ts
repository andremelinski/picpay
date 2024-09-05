import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Users } from "./users.entity";
import { Transactions } from "./transactions.entity";

@Entity({name: 'wallets'})
export class Wallets{
    @PrimaryGeneratedColumn()
    wallet_id: number;
    
    @Column()
    user_id: number;
    
    @Column()
    balance: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Users, (u) => u.wallet)
    user: Users

    @OneToMany(() => Transactions, (t) => t.to_wallet)
    to_transactions: Transactions[]

    @OneToMany(() => Transactions, (t) => t.from_wallet)
    from_transactions: Transactions[]
}