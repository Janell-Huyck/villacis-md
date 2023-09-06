import React from 'react';
import { saveJSON } from '../../utils/fileUtils';
import { StyledButton } from './UpdatePageButton.styles';

const UpdatePageButton = ({ data }) => {

  const handleSaveAsJSON = () => {
    saveJSON(data, "mostRecentDoc.json");
  };

  return <StyledButton onClick={handleSaveAsJSON}>Save as JSON</StyledButton>;
};

export default UpdatePageButton;
