import { Router } from 'express';
import * as branchController from '../controllers/branch.controller';

const router: Router = Router();

router.post('/', branchController.createBranch);
router.get('/', branchController.getAllBranches);
