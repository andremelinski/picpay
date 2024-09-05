import { ICreateWallet, ITransactionDomain, IUserDomain } from "../../domain/gateways/gateways";
import CallExternalApi from "../../utils/external/call-external-api";

export interface ICreateTransactionUseCase {
    transaction(userInfo: ITransferDtoInput): Promise<ITransferDtoOutput>
}

export type ITransferDtoInput = {
	from_user_id: number,
	to_user_id: number,
	amount: number,
}

export type ITransferDtoOutput = {
	from_user_id: number,
	to_user_id: number,
	amount: number,
    balance: number,
}

export default class CreateTransactionUseCase implements ICreateTransactionUseCase {
    constructor(
        private readonly createWalletDomain: ICreateWallet,
        private readonly transactionDomain: ITransactionDomain,
    ){}

    async transaction(tranferInfo: ITransferDtoInput): Promise<ITransferDtoOutput> {
        // validar se usuarios existem
        const [fromUser, toUser] = await Promise.all([
            this.createWalletDomain.findByUserId(tranferInfo.from_user_id), 
            this.createWalletDomain.findByUserId(tranferInfo.to_user_id)
        ])

        // If user do not exists, throw an error
        if (!fromUser || !toUser) {
            throw new Error("User does not exists");
        }

        // valida role -> Lojistas (shopkeepers) só recebem transferências, não enviam dinheiro para ninguém;
        if (fromUser.user_type === 'shopkeepers') {
            throw new Error("shopkeepers can not make transactions only receive");
        }

        // valida se usuario pode fazer essa transaction -> balance > amount
        if(fromUser.balance < tranferInfo.amount){
            throw new Error("can not transfer an amount that you do not have");
        }

        const isAuth = await CallExternalApi.getAuthMs()
        if(isAuth.status === 'fail'){
            throw new Error("auth ms fail");
        }

        // faz a transaction ocorrer
        const transactionInfo = await this.transactionDomain.createTransaction({
            from_user_wallet_id: fromUser.wallet_id,
            to_user_wallet_id: toUser.wallet_id,
            amount: tranferInfo.amount,
        })

        // const notify = await CallExternalApi.notifyMs()

        // if(notify.status === 'fail'){
        //     console.error(isAuth)
        //     throw new Error("notify ms fail");
        // }


        return {
            amount: transactionInfo.amount,
            balance: transactionInfo.final_balance,
            from_user_id: transactionInfo.from_user_id,
            to_user_id: transactionInfo.to_user_id,
        };
        
    }
}
