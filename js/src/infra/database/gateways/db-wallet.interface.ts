import { UserRole } from "../../../domain/gateways/gateways"

export type UserAndWalletInfoResponseType = {
    user_id: number,
    user_type: UserRole,
    wallet_id: number,
    balance: number,
}

export interface ILoadByUserId {
    loadByUserId(user_id: number): Promise<UserAndWalletInfoResponseType>
}