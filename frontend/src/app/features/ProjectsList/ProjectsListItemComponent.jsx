import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import moment from 'moment'

import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { updateProject, deleteProject } from "../../store/projects/actions";

const Component = ({ project }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [author, setAuthor] = useState(project.author);
  const [start_date, setStartDate] = useState(project.start_date ? moment(project.start_date).format('YYYY-MM-DD') : '');
  const [end_date, setEndDate] = useState(project.end_date ? moment(project.end_date).format('YYYY-MM-DD') : '');
  const dispatch = useDispatch()

  const handleCancelClick = () => {
    setEditing(false);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleSaveClick = async (id) => {
    await dispatch(updateProject(id, { id, title, author, start_date, end_date })).then(() => setEditing(false));
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await dispatch(deleteProject(id));
    }
  }

  const editingView = (
    <FullWidth>
      <Flex>
        <Col6>
          <InputLabel htmlFor={`title-${project.id}`}>Title</InputLabel>
          <StyledInput value={title} onChange={e => setTitle(e.target.value)} id={`title-${project.id}`} />
          <InputLabel htmlFor={`author-${project.id}`}>Author</InputLabel>
          <StyledInput value={author} onChange={e => setAuthor(e.target.value)} id={`author-${project.id}`}/>
        </Col6>
        <Col6>
          <InputLabel htmlFor={`start_date-${project.id}`}>Start date</InputLabel>
          <StyledInput type="date" value={start_date} format="YYYY-MM-DD" onChange={e => setStartDate(e.target.value)} id={`start_date-${project.id}`}/>
          <InputLabel htmlFor={`end_date-${project.id}`}>End date</InputLabel>
          <StyledInput type="date" value={end_date} format="YYYY-MM-DD" onChange={e => setEndDate(e.target.value)} id={`end_date-${project.id}`}/>
        </Col6>
      </Flex>
      <ActionButton variant="outlined" onClick={() => handleSaveClick(project.id)}>Save</ActionButton>
      <ActionButton variant="outlined" onClick={handleCancelClick}>Cancel</ActionButton>
    </FullWidth>
  );

  const readingView = (
    <FullWidth>
      <h4>{project.title}</h4>
      { project.author && (
        <p>
          Author: {project.author}
        </p>
      )}
      <Flex>
        { project.start_date && (
          <Mr6>
            Start date: { moment(project.start_date).format('YYYY-MM-DD') }
          </Mr6>
        )}
        { project.end_date && (
          <Mr6>
            End date: { moment(project.end_date).format('YYYY-MM-DD') }
          </Mr6>
        )}
      </Flex>


      <ActionButton variant="outlined" onClick={handleEditClick}>Edit</ActionButton>
      <ActionButton variant="outlined" delete="true" onClick={() => handleDeleteClick(project.id)}>Delete</ActionButton>
    </FullWidth>
  );

  return (
    <StyledListItem key={project.id}>
      {editing && editingView}
      {!editing && readingView}
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)`
  margin-bottom: 24px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  &:first-of-type { margin-bottom: 24px; )
`;

const ActionButton = styled(Button)`
  margin-right: 16px;
  margin-top: 16px;

  ${props => props.delete && css`
    border: 1px solid red;
    color: red;
  `}
`;

const Flex = styled.div`
  display: flex;
  flex: 1 0 0%;
  margin: 0 -8px;
`;

const Mr6 = styled.div`
  display: flex;
  margin-right: 24px;
  margin-left: 8px;
`;

const Col6 = styled.div`
  display: block;
  width: 50%;
  margin: 0 8px;
`;

const FullWidth = styled.div`
  width: 100%;
`;

export default Component;
