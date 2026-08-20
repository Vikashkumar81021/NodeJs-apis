import express from "express";
import organizationController from "../controller/organization.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import orderController from "../controller/order.controller.js";
const router = express.Router();

router.post(
  "/organization",
  authMiddleware,
  authorizeRoles("admin"),
  organizationController.createOrganization,
);
router.post(
  "/createUser",
  authMiddleware,
  authorizeRoles("admin"),
  organizationController.createUser,
);

router.post("/order", orderController.createOrder);
export default router;
