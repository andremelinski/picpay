import DbWalletRepository from "../../infra/database/sql/repository/db-wallet.repository";
import { ICreateWallet, UserDomainResponseType, UserRole, WalletDomainResponseType } from "../gateways/gateways";

export default class WalletRepository implements ICreateWallet {
    constructor(
        private readonly dbWalletRepository: DbWalletRepository,
    ) {}


    async findByUserId(userId: number): Promise<WalletDomainResponseType | null> {
        const createdWallet = await this.dbWalletRepository.loadByUserId(userId);
        if(createdWallet){
            return {
                wallet_id: createdWallet.wallet_id,
                balance: createdWallet.balance,
                user_id: createdWallet.user_id,
                user_type: createdWallet.user_type
            }
        }
        throw new Error("user does not exist")
    }


    async createWallet(userId: number): Promise<WalletDomainResponseType> {
        const createdWallet = await this.dbWalletRepository.save({user_id: userId});

        return {
            wallet_id: createdWallet.wallet_id,
            balance: createdWallet.balance,
            user_id: createdWallet.user_id,
        }
    }
}
