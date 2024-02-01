import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status";
import { Schema } from "yup";

export const validate = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      return res.status(BAD_REQUEST).json({ error: err.message})
    }
  };
  