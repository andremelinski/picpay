import DbTransactionRepository from "../../infra/database/sql/repository/db-transaction.repository";
import { ITransactionDomain, TransactionInputType, TransactionResponseType } from "../gateways/gateways";

export default class TransactionRepository implements ITransactionDomain{
    constructor(
        private readonly dbTransactionRepository: DbTransactionRepository,
    ) {}
    
    async createTransaction(transactionPayload: TransactionInputType): Promise<TransactionResponseType> {
       const final = await this.dbTransactionRepository.saveTransaction(transactionPayload)
       console.log(final)
       return {
        from_user_id: final.fromFinalWallet.user_id,
        to_user_id: final.toFinalWallet.user_id,
        amount: transactionPayload.amount,
        final_balance: final.fromFinalWallet.balance
       }
    }



}
