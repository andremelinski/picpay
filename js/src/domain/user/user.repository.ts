import DbUserRepository from "../../infra/database/sql/repository/db-user.repository";
import { encrypt } from "../../utils/encryption/bcrypt";
import { CreateUserDomainType, findUserType, IUserDomain, UserDomainResponseType, UserRole } from "../gateways/gateways";


export default class UserRepository implements IUserDomain {
    constructor(
        private readonly dbUserRepository: DbUserRepository,
    ) {}
    
    async findUserById(userId: number): Promise<UserDomainResponseType | null> {
        const userFound = await this.dbUserRepository.loadById(userId)
        if(userFound){
            return {
                user_id: userFound.user_id,
                first_name: userFound.first_name,
                last_name: userFound.last_name,
                document: userFound.document,
                email: userFound.email,
                user_type: userFound.user_type as UserRole
            }
        }
        return null
    }

    async findUserByMailorDocument(obj: findUserType): Promise<UserDomainResponseType | null> {
        const userFound = await this.dbUserRepository.load(obj)
        if(userFound){
            return {
                user_id: userFound.user_id,
                first_name: userFound.first_name,
                last_name: userFound.last_name,
                document: userFound.document,
                email: userFound.email,
                user_type: userFound.user_type as UserRole
            }
        }
        return null

    }
    async createUser(createUserPayload: CreateUserDomainType): Promise<UserDomainResponseType> {
        const encryptedPassword = await encrypt(createUserPayload.password);
        const user = {
            ...createUserPayload,
            password: encryptedPassword
        }
        console.log(user)
        const createdUser = await this.dbUserRepository.save(user);

        return {
            user_id: createdUser.user_id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            document: createdUser.document,
            email: createdUser.email,
            user_type: createdUser.user_type as UserRole
        }
    }

}