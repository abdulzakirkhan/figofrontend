export const hasPermission = (permissions, moduleKey, action) => {
  if (!permissions || !Array.isArray(permissions)) return false;

  const module = permissions.find(
    (perm) => perm.moduleKey === moduleKey
  );

  if (!module) return false;

  return module.actions.includes(action);
};