import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'

import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import { updateProject, deleteProject } from "../../store/projects/actions";

const Component = ({ project }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const dispatch = useDispatch()

  const handleCancelClick = () => {
    setEditing(false);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleSaveClick = async (id) => {
    await dispatch(updateProject(id, { id, title })).then(() => setEditing(false));
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await dispatch(deleteProject(id));
    }
  }

  return (
    <ListItem key={project.id}>
      {editing &&
        <div>
          <Input value={title} onChange={e => setTitle(e.target.value)}/>
          <ActionButton variant="outlined" onClick={() => handleSaveClick(project.id)}>Save</ActionButton>
          <ActionButton variant="outlined" onClick={handleCancelClick}>Cancel</ActionButton>
        </div>
      }
      {!editing &&
        <div>
          {project.title}
          <ActionButton variant="outlined" onClick={handleEditClick}>Edit</ActionButton>
          <ActionButton variant="outlined" delete="true" onClick={() => handleDeleteClick(project.id)}>Delete</ActionButton>
        </div>
      }
    </ListItem>
  );
};

const ActionButton = styled(Button)`
  margin: 0 8px;

  ${props => props.delete && css`
    border: 1px solid red;
    color: red;
  `}
`;

export default Component;
