import Enrollment from "../models/enrollment.model.js";
import { enrollUserToFormation } from '../services/enrollment.service.js';
import Ticket from "../models/ticket.model.js";


export const createEnrollment = async (req, res, next) => {
  try {
    const enrollment = await enrollUserToFormation({
      userId: req.user._id,
      formationId: req.body.formation
    });

    const newTicket = await Ticket.create({
        enrollment: enrollment._id,
        user: req.user._id,
        formation: req.body.formation,
        qrCodeData: `${enrollment._id}-${enrollment.user}-${enrollment.formation}-${new Date().getTime()}`
    })

    res.status(201).json({
      success: true,
      message: "Enrollment created successfully",
      data: {
        enrollment,
        ticket: newTicket
      }
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
