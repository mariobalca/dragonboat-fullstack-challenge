import ProjectsService from "./projects.service";

export default class {
  constructor() {
    this.service = new ProjectsService();
  }
  getOne = (id) => {
    return this.service.getOne(id);
  };

  get = () => {
    return this.service.getAll();
  };

  create = (attrs) => {
    return this.service.create(attrs);
  };

  update = (id, attrs) => {
    return this.service.update(id, attrs);
  };

  delete = (id) => {
    return this.service.delete(id);
  };
}
