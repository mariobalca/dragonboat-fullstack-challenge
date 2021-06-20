import moment from 'moment'
// This model mocks a real database model for the sake com simplicity
const data = [
  {
    id: 1,
    title: "Project 1",
    author: "James Doe",
    start_date: moment(),
    end_date: moment().add(4, 'days')
  },
  {
    id: 2,
    title: "Project 2",
    author: "John Doe",
    start_date: moment(),
    end_date: moment().add(5, 'days')
  },
  {
    id: 3,
    title: "Project 3",
    author: "Jason Doe",
    start_date: moment(),
    end_date: moment().add(6, 'days')
  },
  {
    id: 4,
    title: "Project 4",
    author: "Javier Doe",
    start_date: moment(),
    end_date: moment().add(7, 'days')
  },
  {
    id: 5,
    title: "Project 5",
    author: "Julian Doe",
    start_date: moment(),
    end_date: moment().add(8, 'days')
  },
];
export default class {
  // receives conditions like { title: 'Project 5' } and returns a list of matches
  static findAll = (conditions = {}) => {
    return data
      .filter((obj) =>
        Object.entries(conditions).reduce((curr, [key, condition]) => {
          if (!curr) return false;
          return obj[key] === condition;
        }, true)
      )
      .sort((a, b) => (a.id < b.id ? 1 : -1));
  };

  // receives conditions like { title: 'Project 5' } and returns the first match
  static findOne = _findOne;

  static create = (attrs = {}) => {
    const id = data[data.length - 1].id + 1;
    const project = {id, ...attrs};
    data.push(project);

    return project;
  }

  static update = (conditions = {}, attrs = {}) => {
    const project = _findOne(conditions);

    return Object.assign(project, attrs);
  }

  static delete = (conditions = {}) => {
    const project = _findOne(conditions);
    const index = data.findIndex((obj) =>
        Object.entries(conditions).reduce((curr, [key, condition]) => {
          if (!curr) return false;
          return obj[key] === condition;
        }, true)
    );
    data.splice(index, 1);

    return project;
  }

  // You can add more methods to this mock to extend its functionality or
  // rewrite it to use any kind of database system (eg. mongo, postgres, etc.)
  // it is not part of the evaluation process
}

function _findOne (conditions = {}) {
  return data.find((obj) =>
      Object.entries(conditions).reduce((curr, [key, condition]) => {
        if (!curr) return false;
        return obj[key] === condition;
      }, true)
  );
}