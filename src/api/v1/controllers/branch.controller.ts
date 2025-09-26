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

export const getAllBranches = (_req: Request, res: Response): void => {
  const branches = branchService.getAllBranches();
  res.status(200).json(branches);
};

export const getBranchById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const branch = branchService.getBranchById(id);
  if (!branch) {
    res.status(404).json({ error: 'Branch not found' });
    return;
  }
  res.status(200).json(branch);
};

export const updateBranch = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).json({ error: 'No update data provided' });
    return;
  }
  const updatedBranch = branchService.updateBranch(id, data);
  if (!updatedBranch) {
    res.status(404).json({ error: 'Branch not found' });
    return;
  }
  res.status(200).json(updatedBranch);
};

export const deleteBranch = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Missing or invalid ID' });
    return;
  }
  const deleted = branchService.deleteBranch(id);
  if (!deleted) {
    res.status(404).json({ error: 'Branch not found' });
    return;
  }
  res.status(204).send();
};