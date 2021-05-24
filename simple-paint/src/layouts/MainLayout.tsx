import { FC } from 'react';
import styled from 'styled-components';
import { toolbarWidth } from '../constants/constants';

interface IProps {
  children: {
    toolbar: JSX.Element,
    playground: JSX.Element,
  }
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const ToolbarContainer = styled.div`
  background-color: #576574;
  width: ${toolbarWidth};
`;
const PlaygroundContainer = styled.div`
  background-color: #222f3e;
  flex: 1;
  position: relative;
`;

const MainLayout: FC<IProps> = ({ children }) => {
  const { toolbar, playground } = children;
  return (
    <MainContainer>
      <ToolbarContainer>
        {toolbar}
      </ToolbarContainer>
      <PlaygroundContainer>
        {playground}
      </PlaygroundContainer>
    </MainContainer>
  );
};

export default MainLayout;