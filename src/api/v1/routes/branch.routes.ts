import { Router } from 'express';
import * as branchController from '../controllers/branch.controller';

const router: Router = Router();

router.post('/', branchController.createBranch);
router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);
router.put('/:id', branchController.updateBranch);
router.delete('/:id', branchController.deleteBranch);

export default router;