const express = require("express");
const bodyParser = require("body-parser");
const { celebrate, Joi } = require("celebrate");
const {
  createTemplate,
  deleteTemplate,
  updateTemplate,
  getAllTemplates,
} = require("../controller/template");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/templates", getAllTemplates);
router.post(
  "/templates",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      content: Joi.string().required(),
    }),
  }),
  createTemplate
);
router.put(
  "/templates/:id",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      content: Joi.string(),
    }),
  }),
  updateTemplate
);
router.delete("/templates/:id", deleteTemplate);

module.exports = router;
