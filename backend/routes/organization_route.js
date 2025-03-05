import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getOrganizationById, getOrganizations, registerOrganization, updateOrganization } from '../controllers/organization_controller.js';

const router = express.Router();

router.route("/register").post(isAuthenticated,registerOrganization);
router.route("/get").get(isAuthenticated,getOrganizations);
router.route("/get/:id").get(isAuthenticated,getOrganizationById);
router.route("/update/:id").put(isAuthenticated,updateOrganization);

export default router;