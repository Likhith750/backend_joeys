"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/video.routes.ts
const express_1 = require("express");
const video_controller_1 = require("../controllers/video.controller");
const router = (0, express_1.Router)();
// Route to create video URL
router.post('/_video', video_controller_1.createVideo);
// Route to get the latest video URL
router.get('/_video', video_controller_1.getLatestVideo);
exports.default = router;
