import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransaction = await transactionsRepository.findOne(id);

    if (!checkTransaction) {
      throw new AppError('Transaction not exist', 401);
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
