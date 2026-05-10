const admin = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }

  next();
};

// const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin only" });
//   }
// };

module.exports = admin;

