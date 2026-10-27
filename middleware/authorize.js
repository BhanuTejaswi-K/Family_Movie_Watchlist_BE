export function authorizeModification(req, res, next) {
  const isParent = req.user?.role === "parent";
  const isChildModifyingOwnList =
    req.user?.role === "child" &&
    req.params?.userId !== undefined &&
    req.user.id !== undefined &&
    String(req.params.userId) === String(req.user.id);

  if (!isParent && !isChildModifyingOwnList) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}