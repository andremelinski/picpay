import { DataSource, EntityManager } from "typeorm";
import { ILoad, ILoadById, ISave } from "../../gateways/db-generic.interface";
import { CreateUserDomainType, findUserType } from "../../../../domain/gateways/gateways";
import { Users } from "../entities/users.entity";

export default class DbUserRepository implements ILoadById<Users>, ILoad<Users, findUserType>,ISave<Users, CreateUserDomainType> {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async loadById(user_id: number): Promise<Users | null> {
        const userRepo = this.dataSource.getRepository(Users);

        const userFound = await userRepo.findOneBy({user_id})
        return userFound
    }


    async load(parameters: findUserType): Promise<Users | null> {
        const userRepo = this.dataSource.getRepository(Users);

        const userFound = await userRepo.findOne({
            where: [
                { email: parameters.email },
                { document: parameters.document }
            ]
        })
        return userFound
    }

    async save(payload: CreateUserDomainType): Promise<Users> {
        // excepction de validao de usuario
        const userRepo = this.dataSource.getRepository(Users);

        const newUser = await userRepo.save(userRepo.create(payload))
        return newUser
    }

}