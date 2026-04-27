import Role from '../models/users/role.js'; // adjust path if needed
import AppError from '../utils/appError.js';

const roleInstance = new Role();

/**
 * Usage:
 * authorize("create_product")
 * authorize("delete_userprofile")
 */
export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    try {
      // 1. Ensure user exists (after authenticateUser)
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      // 2. Get user's role
      const userRoleName = req.user.role;

      // 3. Get role config
      const role = roleInstance.getRoleByName(userRoleName);
      if (!role) {
        throw new AppError("Role not found", 403);
      }

      // 4. Check permission
      const hasPermission = role.permissions.includes(requiredPermission);

      if (!hasPermission) {
        throw new AppError("Forbidden: insufficient permissions", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};