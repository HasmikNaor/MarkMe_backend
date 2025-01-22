const Template = require("../models/template");
const NotFoundErr = require("../errors/notFoundErr");
const AlreadyExistsErr = require("../errors/alreadyExistsErr");
const CantDeleteErr = require("../errors/cantDeleteErr");

module.exports.getAllTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (err) {
    next(err);
  }
};

module.exports.createTemplate = async (req, res, next) => {
  try {
    let template;

    if (req.body.name.trim() && req.body.content.trim()) {
      template = await Template.create(req.body);
    }
    if (template) {
      res.status(201).json({ template, message: `${template.name} created` });
    } else {
      throw new AlreadyExistsErr("the name already exists or invalid");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updateTemplate = async (req, res, next) => {
  const { id } = req.params;
  const { name, content } = req.body;
  try {
    let template;
    if (name.trim() && content.trim()) {
      const existingTemplate = await Template.findOne({
        name: name.trim(),
        _id: { $ne: id }, // Exclude the template being updated by its ID
      });

      if (existingTemplate) {
        throw new AlreadyExistsErr("Template with this name already exists.");
      }

      template = await Template.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    }

    if (template) {
      res.status(200).json({
        template,
        message: `${template.name} updated`,
      });
    } else {
      throw new NotFoundErr(`couldn't update`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTemplate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const template = await Template.findByIdAndDelete(id);
    if (template) {
      res.status(200).json({ template, message: `${template.name} deleted` });
    } else {
      throw new CantDeleteErr("couldn't delete template");
    }
  } catch (err) {
    next(err);
  }
};
