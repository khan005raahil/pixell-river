import { Branch, branches } from '../../../data/branches';

export const getAllBranches = (): Branch[] => {
  return branches;
};

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(br => br.id === id);
};

export const createBranch = (data: Omit<Branch, 'id'>): Branch => {
  const newId = Math.max(...branches.map(br => br.id), 0) + 1;
  const newBranch: Branch = { id: newId, ...data };
  branches.push(newBranch);
  return newBranch;
};

export const updateBranch = (id: number, data: Partial<Omit<Branch, 'id'>>): Branch | undefined => {
  const index = branches.findIndex(br => br.id === id);
  if (index === -1) return undefined;
  branches[index] = { ...branches[index], ...data };
  return branches[index];
};

export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex(br => br.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};