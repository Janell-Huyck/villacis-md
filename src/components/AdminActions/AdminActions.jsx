import React, { useState } from 'react';
import { AdminContainer, AdminButton, AdminSection } from './AdminActions.styles';

const AdminActions = () => {
  const [adminExpanded, setAdminExpanded] = useState(false);

  return (
    <AdminContainer>
      <AdminButton onClick={() => setAdminExpanded(!adminExpanded)}>
        {adminExpanded ? 'Collapse Admin Section' : 'Expand Admin Section'}
      </AdminButton>
      {adminExpanded && (
        <AdminSection>
          <p><b>This is the admin section</b></p>
          <p>You are currently logged in with an admin account. It is my intent that you should be able to create employee-level accounts from here, but I haven't gotten it worked out yet how to do that.</p>
          <p>For now, you can use the Firebase console to create new accounts. You can also use the Firebase console to edit the database directly, but I don't recommend it. Instead, use the "Edit Page" button on the page you want to edit.</p>          
        </AdminSection>
      )}
    </AdminContainer>
  );
};

export default AdminActions;
