export type UserRole = "common" | "shopkeepers"

export type findUserType = {email: string, document: string}

export type CreateUserDomainType = {
	first_name: string,
	last_name: string,
	document: string,
	email: string,
	password: string,
	user_type: UserRole,
}

export type UserDomainResponseType = {
	user_id: number
	first_name: string,
	last_name: string,
	document: string,
	email: string,
	user_type: UserRole,
}

export type WalletDomainResponseType = {
	user_type?: UserRole,
	wallet_id: number
	balance: number,
	user_id: number
}

export type TransactionInputType = {
	from_user_wallet_id: number
	to_user_wallet_id: number,
	amount: number,
}


export type TransactionResponseType = {
	from_user_id: number
	to_user_id: number,
	amount: number,
	final_balance: number
}


export interface IUserDomain {
    createUser(createUserPayload: CreateUserDomainType): Promise<UserDomainResponseType>
	findUserByMailorDocument(obj: findUserType): Promise<UserDomainResponseType | null>
	findUserById(userId: number): Promise<UserDomainResponseType | null>
}

export interface ICreateWallet {
	createWallet(userId: number): Promise<WalletDomainResponseType>
	findByUserId(userId: number): Promise<WalletDomainResponseType | null>
}

export interface ITransactionDomain {
	createTransaction(transactionPayload: TransactionInputType): Promise<TransactionResponseType>
}