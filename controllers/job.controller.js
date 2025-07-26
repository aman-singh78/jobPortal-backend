import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "something is missing", success: false });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position,
      company: companyId,
      created_by: userId,
    });
    await job.save();
    return res
      .status(201)
      .json({ message: "New job created successfully", job, success: true });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
