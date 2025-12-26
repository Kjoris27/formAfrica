import Formation from "../models/formation.model.js";

export const createFormation = async (req, res, next) => {
    try {
      const formation = await Formation.create({
        ...req.body,
        createdBy: req.user._id
      });
  
      res.status(201).json({
        success: true,
        data: formation
      });
  
    } catch (error) {
      next(error);
    }
  };


  
export const getAllFormations = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const totalFormations = await Formation.countDocuments();
        const formations = await Formation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            success: true,
            count: formations.length,
            page,
            pageSize,
            totalFormations,
            data: formations,
        });
    } catch (error) {
        next(error);
    }
};

export const getFormation = async (req, res, next) => {
    try {
        const formation = await Formation.findById(req.params.id);

        if (!formation) {
            const error = new Error("Formation not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: formation,
        });
    } catch (error) {
        next(error);
    }
};

export const updateFormation = async (req, res, next) => {
    try {
        const formation = await Formation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!formation) {
            const error = new Error("Formation not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: formation,
        });
    } catch (error) {
        next(error);
    }
};

export const disableFormation = async (req, res, next) => {
  try {
    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!formation) {
      const error = new Error("Formation not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Formation disabled successfully",
      data: formation
    });

  } catch (error) {
    next(error);
  }
};

