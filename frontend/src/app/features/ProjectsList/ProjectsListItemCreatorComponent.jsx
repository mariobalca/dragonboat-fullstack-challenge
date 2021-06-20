import React, { useState } from "react";
import { Button, Input, InputLabel } from "@material-ui/core";
import styled from "styled-components";
import { createProject } from "../../store/projects/actions";
import { useDispatch } from "react-redux";

const Component = ({ project }) => {
  const [title, setTitle] = useState(project ? project.title : '');
  const dispatch = useDispatch()

  const handleCreateClick = async () => {
    await dispatch(createProject({ title }));
    setTitle('');
  }

  return (
    <Wrapper>
      <InputLabel htmlFor="new-project-title">New project</InputLabel>
      <Flex>
        <FullInput id="new-project-title" value={title} onChange={(e) => setTitle(e.target.value) } />
        <SubmitButton variant="outlined" color="primary" onClick={handleCreateClick}>Create project</SubmitButton>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 40px 20px 20px 20px;
  padding-top: 40px;
  border-top: 1px solid #dedede; 
`;


const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const FullInput = styled(Input)`
  display: flex;
  flex: 1 1 0;
`;

const SubmitButton = styled(Button)`
  margin-left: 20px;
`;

export default Component;

