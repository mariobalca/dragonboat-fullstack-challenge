import Projects from "db/projects";
import Service from "../utils/Service";

import ObjectDoesNotExistError from "../utils/exceptions/ObjectDoesNotExistError";

export default class extends Service {
  getOne = (id) => {
    const project = Projects.findOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  };

  getAll = () => {
    return Projects.findAll();
  };

  create = (attrs) => {
    return Projects.create(attrs)
  }

  update = (id, attrs) => {
    const project = Projects.findOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return Projects.update({ id }, attrs)
  }

  delete = (id) => {
    const project = Projects.findOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return Projects.delete({ id })
  }
}
