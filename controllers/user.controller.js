import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const pageSize = Math.min(
        Math.max(parseInt(req.query.pageSize) || 10, 1),
        100
      );
  
      const skip = (page - 1) * pageSize;
  
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / pageSize);
  
      const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);
  
      res.status(200).json({
        success: true,
        count: users.length,
        page,
        pageSize,
        // totalPages,
        // totalUsers,
        data: users
      });
  
    } catch (error) {
      next(error);
    }
  };
  

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;

        }


        res.status(200).json({
            success: true,
            data: user
        });

    } catch(error){
        next(error);
    }

}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.user._id.toString() !== id && req.user.role !== 'admin') {
            const error = new Error('You are not authorized to update this user');
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.user._id.toString() !== id && req.user.role !== 'admin') {
            const error = new Error('You are not authorized to delete this user');
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};


export const updateUserRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role, action } = req.body;
  
      const validRoles = ['admin', 'trainer', 'trainee', 'center'];
  
      if (!validRoles.includes(role)) {
        const error = new Error('Invalid role specified');
        error.statusCode = 400;
        throw error;
      }
  
      if (!['add', 'remove'].includes(action)) {
        const error = new Error('Invalid action. Use add or remove.');
        error.statusCode = 400;
        throw error;
      }
  
      // 1️⃣ Lire l'utilisateur AVANT modification
      const existingUser = await User.findById(id);
  
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
  
      // 2️⃣ Règle métier : au moins un rôle
      if (
        action === 'remove' &&
        existingUser.roles.length === 1 &&
        existingUser.roles.includes(role)
      ) {
        const error = new Error('User must have at least one role');
        error.statusCode = 400;
        throw error;
      }
  
      // 3️⃣ Construction de l’update
      const update =
        action === 'add'
          ? { $addToSet: { roles: role } }
          : { $pull: { roles: role } };
  
      // 4️⃣ Mise à jour
      const user = await User.findByIdAndUpdate(
        id,
        update,
        { new: true }
      ).select('-password');
  
      res.status(200).json({
        success: true,
        message: `Role ${action === 'add' ? 'added' : 'removed'} successfully`,
        data: user
      });
  
    } catch (error) {
      next(error);
    }
  };
  