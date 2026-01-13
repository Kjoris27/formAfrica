import User from "../models/user.model.js";

import { getUserWithFormations, getFormationManagement } from '../services/formation.service.js';

export const getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getUserWithFormations(id);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};


export const getUsers = async (req, res, next) => {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 10, 1),100);
    
        let users = await User.aggregate([
          {$sort: {createdAt: -1}},
          {$limit: pageSize},
          {
            $lookup :{
              from:'formations',
              localField: 'createdFormations',
              foreignField:'_id',
              as: 'createdFormations'
            }
          }

        ]);

 
      let users = users.map(user => {
        if (!user.roles.includes('trainer') && !user.roles.includes('admin')) {
          user.createdFormations = [];
        }
        if (!user.roles.includes('trainee')) {
          user.enrolledFormations = [];
        }
        return user;
      });
      
  
      res.status(200).json({
        success: true,
        count: users.length,
        page,
        pageSize,
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
  
      const existingUser = await User.findById(id);
  
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
  
      if (
        action === 'remove' &&
        existingUser.roles.length === 1 &&
        existingUser.roles.includes(role)
      ) {
        const error = new Error('User must have at least one role');
        error.statusCode = 400;
        throw error;
      }
  
      const update =
        action === 'add'
          ? { $addToSet: { roles: role } }
          : { $pull: { roles: role } };
  
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
  

  export const getFormationInfos = async (req, res, next) => {
    try {
      const data = await getFormationManagement({
        formationId: req.params.id,
        requester: req.user
      });
  
      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  };
  