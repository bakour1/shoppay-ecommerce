import nc from 'next-connect';
import User from '@/models/User';
import db from '@/utils/db';

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address, userId } = req.body;
    const user = User.findById(userId);
    await user.updateOne({
      $push: {
        address: address,
      },
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
