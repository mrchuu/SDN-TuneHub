import {UserRepository} from '../repository/index.js';
import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    try {
        const {id, currentPassword, newPassword } = req.body;
        console.log(req.body);
        const user = await UserRepository.findById(id); 

        // Kiểm tra mật khẩu hiện tại
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }
        
        // Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Lưu mật khẩu mới vào cơ sở dữ liệu
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const editProfile = async (req, res) => {
    try {
      const { id, firstName, lastName, introduction, profilePicture } = req.body;
      console.log(req.body);
      const updatedUser = await UserRepository.updateProfile(id, { firstName, lastName, introduction, profilePicture });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'Edit profile successfully' });
    } catch (error) {
      console.error('Edit profile error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

export default {changePassword,editProfile};
