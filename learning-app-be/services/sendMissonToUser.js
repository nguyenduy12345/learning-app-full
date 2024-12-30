import { findAllMisson } from "../repositories/misson.respository.js";
import { findAllUserId } from "../repositories/user.repository.js";
import {
  creatNewMissonOfUser,
  findMissonsByUserId,
} from "../repositories/userMisson.repository.js";
const sendMissonToUser = async () => {
  try {
    const userIds = await findAllUserId();
    const missons = await findAllMisson();
    const indexRandom = Math.floor(Math.random() * missons.length);
    const sendMisson = userIds.map(async (userId) => {
      const userMissons = await findMissonsByUserId({
        userId: userId._id.toString(),
      });
      const isHasMissonTypeAndCompleted = userMissons.some((misson) => {
        return (
          misson.missonId.type === missons[indexRandom].type &&
          misson.completed === false
        );
      });
      if (!isHasMissonTypeAndCompleted) {
        await creatNewMissonOfUser({
          userId: userId._id.toString(),
          missonId: missons[indexRandom]._id.toString(),
        });
        return;
      }
    });

    await Promise.all(sendMisson);
  } catch (error) {
    console.log(error);
  }
};
export default sendMissonToUser;
