import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallets } from "./wallets.entity";

@Entity({name: 'transactions'})
export class Transactions{
    @PrimaryGeneratedColumn()
    transaction_id: number;
    
    @Column()
    value: number;
    
    @Column()
    from_wallet_id: number;
    
    @Column()
    to_wallet_id: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Wallets, (u) => u.from_transactions)
    @JoinColumn({name: 'from_wallet_id'})
    from_wallet: Wallets

    @ManyToOne(() => Wallets, (u) => u.to_transactions)
    @JoinColumn({name: 'to_wallet_id'})
    to_wallet: Wallets
}