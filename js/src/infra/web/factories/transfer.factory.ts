import TransactionRepository from "../../../domain/user/transaction.repository";
import WalletRepository from "../../../domain/user/wallet.repository";
import CreateTransactionUseCase from "../../../usecases/transfer/crate-tranfer.usercase";
import PostgreSQL from "../../database/sql/connection";
import DbTransactionRepository from "../../database/sql/repository/db-transaction.repository";
import DbWalletRepository from "../../database/sql/repository/db-wallet.repository";
import TransferHandler from "../handlers/transfer.handler";
import { IController } from "../presentation/interfaces";

export const makeCreateTransferHandler = async (): Promise<IController> => {
	const db = await PostgreSQL.getDatabaseConnection()

	const dbWalletRepo = new DbWalletRepository(db)
	const dbTransferRepo = new DbTransactionRepository(db)

	
	const transferRepo = new TransactionRepository(dbTransferRepo)
	const walletRepo = new WalletRepository(dbWalletRepo)

    const usecase = new CreateTransactionUseCase(walletRepo, transferRepo)
	const addSurveyController = new TransferHandler(usecase);

	return addSurveyController;
};
