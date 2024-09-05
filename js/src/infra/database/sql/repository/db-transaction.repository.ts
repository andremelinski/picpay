import { DataSource, EntityManager } from "typeorm";
import { Transactions } from "../entities/transactions.entity";
import { Wallets } from "../entities/wallets.entity";
import { TransactionInputType } from "../../../../domain/gateways/gateways";

export type FinalWallets = {fromFinalWallet: Wallets, toFinalWallet: Wallets} 

export default class DbTransactionRepository {
    constructor(
        private readonly dataSource: DataSource,
    ) {}


    async saveTransaction(transactionPayload: TransactionInputType): Promise<FinalWallets> {
        return this.dataSource.transaction(async (entityManager: EntityManager) => {
            const walletRepo = entityManager.getRepository(Wallets);
            const transactionRepo = entityManager.getRepository(Transactions);

            await transactionRepo.save(transactionRepo.create({
                from_wallet_id: transactionPayload.from_user_wallet_id,
                to_wallet_id: transactionPayload.to_user_wallet_id,
                value: transactionPayload.amount
            }));

            const [fromWallet, toWallet] = await Promise.all([walletRepo.findOneBy({ wallet_id: transactionPayload.from_user_wallet_id }),
            walletRepo.findOneBy({ wallet_id: transactionPayload.to_user_wallet_id })]);

            const fromFinalBalance = fromWallet.balance - transactionPayload.amount;
            await walletRepo.update({ wallet_id: fromWallet.wallet_id }, { balance: fromFinalBalance });

            const toFinalBalance = toWallet.balance + transactionPayload.amount;
            await walletRepo.update({ wallet_id: toWallet.wallet_id }, { balance: toFinalBalance });

            const [fromFinalWallet, toFinalWallet] = await Promise.all([walletRepo.findOneBy({ wallet_id: transactionPayload.from_user_wallet_id }),
            walletRepo.findOneBy({ wallet_id: transactionPayload.to_user_wallet_id })]);

            return {
                fromFinalWallet, toFinalWallet
            };
        });

    }

}