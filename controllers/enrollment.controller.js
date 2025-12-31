import Enrollment from "../models/enrollment.model.js";
import Formation from "../models/formation.model.js";
import mongoose from "mongoose";



export const createEnrollment = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const { formation } = req.body;
       const user = req.user._id;

       const existingFormation = await Formation.findById(formation).session(session);

       if (!existingFormation) {
        const error = new Error("Formation not found");
        error.statusCode = 404;
        throw error;
       };

        const existingEnrollment = await Enrollment.findOne({
            user, formation
        }).session(session);

       if(existingEnrollment) {
        const error = new Error("User is  already enrolled in this formation");
        error.statusCode = 409;
        throw Error;
       }

       





    } catch (error) {
        next(error);
    }
};

export const getEnrollments = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const totalEnrollments = await Enrollment.countDocuments();
        const enrollments = await Enrollment.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            success: true,
            count: enrollments.length,
            page,
            pageSize,
            totalEnrollments,
            data: enrollments,
        });
    } catch (error) {
        next(error);
    }
};

export const getEnrollment = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            const error = new Error("Enrollment not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

export const updateEnrollment = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!enrollment) {
            const error = new Error("Enrollment not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEnrollment = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

        if (!enrollment) {
            const error = new Error("Enrollment not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
