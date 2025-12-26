import Enrollment from "../models/enrollment.model.js";

export const createEnrollment = async (req, res, next) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        res.status(201).json({
            success: true,
            data: newEnrollment,
        });
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
