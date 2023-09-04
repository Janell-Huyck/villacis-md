import React, { useState } from 'react';
import { InstructionsContainer, InstructionsButton, InstructionsSection } from './AdminInstructions.styles';

const AdminInstructions = () => {
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);

  return (
    <InstructionsContainer>
      <InstructionsButton onClick={() => setInstructionsExpanded(!instructionsExpanded)}>
        {instructionsExpanded ? 'Collapse Instructions' : 'Expand Instructions'}
      </InstructionsButton>
      {instructionsExpanded && (
        <InstructionsSection>
          <h2><b>Instructions</b></h2>
          <p>Here are some instructions for how to use this site.</p>
        </InstructionsSection>
      )}
    </InstructionsContainer>
  );
};

export default AdminInstructions;
