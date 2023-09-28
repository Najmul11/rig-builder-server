'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const review_validation_1 = require('./review.validation');
const review_controller_1 = require('./review.controller');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
  '/post-review/:id',
  auth_1.default,
  (0, validateRequest_1.default)(
    review_validation_1.ReviewValivation.postReviewZodSchema,
  ),
  review_controller_1.ReviewController.postReview,
);
router.get('/:id', review_controller_1.ReviewController.getReviews);
exports.ReviewRoutes = router;
