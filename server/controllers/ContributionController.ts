import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ContributionModel from "../models/contributionModel";

const getAllContributions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const contributions = await ContributionModel.find();
    res.status(200).send({
      contributions,
      message: "Get Contributions successfully",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error fetching all contributions",
      error: error.message,
    });
  }
});
export const getContribution = asyncHandler(async (req: Request, res: Response) => {
  const {id}:{id?:string}=req.params;
  if(!id){
    res.status(500).send({
      message: "Error fetching contribution",
      error: "",
    });
  }
  try {
    const contributions = await ContributionModel.find({id});
    res.status(200).send({
      contributions,
      message: "Get Contribution successfully",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error fetching contribution",
      error: error.message,
    });
  }
});


const updateContributions = asyncHandler(async (req: Request, res: Response) => {
  try {
    await ContributionModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send({
      message: "Update contribution success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error updating contribution",
      error: error.message,
    });
  }
});

const createContributions = asyncHandler(async (req: Request, res: Response) => {
  try {
    await ContributionModel.create({
      ...req.body,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
    });
    res.status(201).send({
      message: "Create contribution success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error creating contribution",
      error: error.message,
    });
  }
});

const deleteContributions = asyncHandler(async (req: Request, res: Response) => {
  try {
    await ContributionModel.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Delete contribution success",
    });
  } catch(error:any) {
    res.status(500).send({
      message: "Error deleting contribution",
      error: error.message,
    });
  }
});

export {
  getAllContributions,
  updateContributions,
  createContributions,
  deleteContributions,
};
