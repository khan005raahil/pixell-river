import { Request, Response } from 'express';
import * as branchService from '../services/branch.service';

export const createBranch = (req: Request, res: Response): void => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    res.status(400).json({ error: 'Missing required parameters' });
    return;
  }
  const newBranch = branchService.createBranch({ name, address, phone });
  res.status(201).json(newBranch);
};
