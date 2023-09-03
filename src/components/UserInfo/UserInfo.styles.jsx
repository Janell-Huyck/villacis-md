import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserText = styled.span`
  font-size: 14px;
  color: #333;
`;

export const LogoutButton = styled.button`
  font-size: 14px;
  color: #fff;
  background-color: #f44336;
  border: none;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;
