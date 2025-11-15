import User from '../models/userModel.js'

export const addUser= async(req, res)=> {
    try {
        const {name, balance}= req.body;
        if(!name || !balance) {
            return res.json({
                success: false,
                message: 'missiong data from body'
            })
        }
        const user= await User.create({name, balance})
        return res.json({
            success:true,
            data: {
                name:user.name,
                balance: user.balance
            }
        })
    } catch (error) {
        
    }
};



export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('name balance'); 
        return res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        });
    }
};



export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      return res.json({
        success: false,
        message: "User ID is required"
      });
    }
    const deletedUser = await User.findByIdAndDelete(userID);
    if (!deletedUser) {
      return res.json({
        success: false,
        message: "User not found!"
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully!",
      data: deletedUser
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.json({
      success: false,
      message: "Something went wrong!"
    });
  }
};



export const depositUser= async(req, res)=> {
        try {
        const { userId, amount } = req.body;
        if (!userId || !amount) {
            return res.status(400).json({ success: false, message: 'Invalid userId or amount' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.balance += amount;
        await user.save();

        res.json({ success: true, message: 'Deposit successful', balance: user.balance });
    } catch (error) {
    console.error("Deposit Error:", error);
    res.json({
      success: false,
      message: "Something went wrong!"
    });
  }
};



export const withdrawUser= async(req, res)=> {
        try {
        const { userId, amount } = req.body;
        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid userId or amount' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' });
        }
        user.balance -= amount;
        await user.save();

        res.json({ success: true, message: 'Withdraw successful', balance: user.balance });
    } catch (error) {
    console.error("Deposit Error:", error);
    res.json({
      success: false,
      message: "Something went wrong!"
    });
  }
};