import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { ISignIn, ISignUp } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignUp;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      const pair = req.res.locals.jwtTokens as string;
      const result = await authService.refresh(payload, pair);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logout(payload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutCompletely(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logoutCompletely(payload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
