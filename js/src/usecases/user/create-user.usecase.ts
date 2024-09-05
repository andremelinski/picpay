import { IUserDomain, ICreateWallet, UserRole } from "../../domain/gateways/gateways"

export interface ICreateUseCase {
	create(name: IAddUserDtoInput): Promise<IAddUserDtoOutput>
}

export type IAddUserDtoInput = {
	first_name: string,
	last_name: string,
	document: string,
	email: string,
	password: string,
	user_type: UserRole,
}

export type IAddUserDtoOutput = {
    id: number,
	full_name: string,
	email: string,
	user_type: UserRole,
    wallet_id: number,
    balance: number,
}


export default class CreateUserUseCase implements ICreateUseCase {
    constructor(private readonly createUserDomain: IUserDomain, private readonly createWalletDomain: ICreateWallet){}

    async create(userInfo: IAddUserDtoInput): Promise<IAddUserDtoOutput> {
        // validar se usuario ja existe -> CPF/CNPJ e e-mails devem ser únicos no sistema
        const userFound = await this.createUserDomain.findUserByMailorDocument({email: userInfo.email, document: userInfo.document})

        // If user exists, throw an error
        if (userFound) {
            throw new Error("User with this email or document already exists.");
        }

        const createdUser = await this.createUserDomain.createUser(userInfo);
        const newWallet = await this.createWalletDomain.createWallet(createdUser.user_id);

        return {
            id: createdUser.user_id,
            full_name: `${createdUser.first_name} ${createdUser.last_name}`,
            email: createdUser.email,
            user_type: createdUser.user_type,
            wallet_id: newWallet.wallet_id,
            balance: newWallet.balance,
        };
        
    }
}
