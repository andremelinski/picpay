import UserRepository from "../../../domain/user/user.repository";
import WalletRepository from "../../../domain/user/wallet.repository";
import CreateUserUseCase from "../../../usecases/user/create-user.usecase";
import { IValidation, ValidationComposite } from "../../../utils/validator/validator.composite";
import DbWalletRepository from "../../database/sql/repository/db-wallet.repository";
import CreateUserHandler from "../handlers/create.handler";
import { IController } from "../presentation/interfaces";
import DbUserRepository from "../../database/sql/repository/db-user.repository";
import PostgreSQL from "../../database/sql/connection";

export const makeCreateUserHandler = async (): Promise<IController> => {
	const db = await PostgreSQL.getDatabaseConnection()

	const dbWalletRepo = new DbWalletRepository(db)
	const dbUserRepo = new DbUserRepository(db)

	
	const userRepo = new UserRepository(dbUserRepo)
	const walletRepo = new WalletRepository(dbWalletRepo)

    const usecase = new CreateUserUseCase(userRepo, walletRepo)
	const addSurveyController = new CreateUserHandler(usecase, helloValidation());

	return addSurveyController;
};


const helloValidation = (): ValidationComposite => {
	const requiredField = 'name';
	const validationArr: IValidation[] = [];

	// validationArr.push(new RequiredFieldValidation(requiredField));
    // validationArr.push(new CompareFieldLengthValidator(requiredField, 2));
	return new ValidationComposite(validationArr);
};