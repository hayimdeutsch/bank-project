import PendingUser from "../models/pendingUserModel.js";

const removeInactiveUsers = async () => {
  try {
    await PendingUser.deleteMany({expiration: {$lt: Date.now()}});
  }  catch (err) {
    console.log(err);
  }
}

export default removeInactiveUsers;