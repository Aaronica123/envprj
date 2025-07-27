const Prof = require("../model/register");

const profile1 = async (req, res) => {
  const { username } = req.query;
  try {
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await Prof.findOne({
      username: { $regex: `^${username}$`, $options: 'i' }
    });
    if (user) {
      const { firstname, lastname, username: foundUsername } = user;
      return res.status(200).json({
        message: "Found",
        data: { firstname: firstname || '', lastname: lastname || '', username: foundUsername }
      });
    } else {
      return res.status(404).json({ message: "NotFound" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { profile1 };