import { DataSource } from "typeorm";
import { ISave } from "../../gateways/db-generic.interface";
import { Wallets } from "../entities/wallets.entity";
import { ILoadByUserId, UserAndWalletInfoResponseType } from "../../gateways/db-wallet.interface";
import { Users } from "../entities/users.entity";

export type ISaveUserBalance = {user_id: number, balance?: number}

export default class DbWalletRepository implements ISave<Wallets, ISaveUserBalance>, ILoadByUserId {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async loadByUserId(user_id: number): Promise<UserAndWalletInfoResponseType | undefined> {

        const walletInfo = await this.dataSource.createQueryBuilder(Wallets, 'w').leftJoin(Users,'u', 'u.user_id = w.user_id')
        .where('w.user_id = :user_id', {user_id})
        .select(['w.balance as balance','w.wallet_id as wallet_id', 'u.user_id as user_id', 'u.user_type as user_type']).getRawOne<UserAndWalletInfoResponseType>()
        console.log({walletInfo})
        return walletInfo
    }

    async save({user_id, balance}: ISaveUserBalance): Promise<Wallets> {
        const wallet = this.dataSource.getRepository(Wallets);

        const newWallet = await wallet.save(wallet.create({
            user_id,
            balance: balance || 100
        }))
        return newWallet
    }

}