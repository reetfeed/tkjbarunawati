import { Router, type IRouter } from "express";
import healthRouter from "./health";
import classRouter from "./class";
import membersRouter from "./members";
import galleryRouter from "./gallery";
import timelineRouter from "./timeline";
import messagesRouter from "./messages";

const router: IRouter = Router();

router.use(healthRouter);
router.use(classRouter);
router.use(membersRouter);
router.use(galleryRouter);
router.use(timelineRouter);
router.use(messagesRouter);

export default router;
