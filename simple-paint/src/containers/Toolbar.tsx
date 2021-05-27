import { faInfoCircle, faSlash, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { toolbarWidth } from '../constants/constants';
import { ShapeType } from '../models/shape';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShapeType } from '../redux/selectors';
import { selectShapeType } from '../redux/slice';

const InfoContainer = styled.div`
  position: relative;
  margin-top: auto;
  background-color: #0d3f33;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
`;

const InfoContentContainer = styled.div`
  visibility: hidden;
  ${InfoContainer}:hover & {
    visibility: visible;
  }
  background-color: #1dd1a1;
  position: absolute;
  bottom: 0px;
  left: 80px;
  width: max-content;
  padding: 10px 15px 10px 25px;
  z-index: 1;
  border: 3px solid white;
`;

const UList = styled.ul`
  margin: 0px 0px 0px 10px;
  padding-left: 4px;
`;

const ListItem = styled.li`
  font-size: x-large;
`;

const ToolbarItemContainer = styled.div<{ isSelected: boolean }>`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${toolbarWidth}px;
  border-bottom: 1px solid #222f3e;
  ${props => props.isSelected && 'background-color: #1dd1a1;'};
`;

const iconStyle = {
  color: '#0d3f33',
};

const infoStyle = {
  color: 'white',
};

const Toolbar: FC = () => {
  const dispatch = useAppDispatch();
  const selectedShapeType = useAppSelector(selectSelectedShapeType);

  const click = useCallback(
    (shapeType: ShapeType) => {
      dispatch(selectShapeType(shapeType));
    },
    [dispatch]
  );

  return (
    <>
      {Object.keys(ShapeType).map(s =>
        <ToolbarItemContainer
          key={s}
          isSelected={selectedShapeType === ShapeType[s as keyof typeof ShapeType]}
          onClick={() => click(ShapeType[s as keyof typeof ShapeType])}
        >
          {
            {
              [ShapeType.LINE]: <FontAwesomeIcon icon={faSlash} style={iconStyle} />,
              [ShapeType.RECTANGLE]: <FontAwesomeIcon icon={faSquare} style={iconStyle} />,
            }[ShapeType[s as keyof typeof ShapeType]]
          }
        </ToolbarItemContainer>
      )}
      <InfoContainer>
        <FontAwesomeIcon icon={faInfoCircle} style={infoStyle} />
        <InfoContentContainer>
          <UList>
            <ListItem>Click and Drag to create</ListItem>
            <ListItem>Click to select</ListItem>
            <ListItem>On selected:</ListItem>
            <UList>
              <ListItem>Middle Point to drag</ListItem>
              <ListItem>Corner Points to resize</ListItem>
              <ListItem>Delete key to delete</ListItem>
            </UList>
            <ListItem>To deselect: </ListItem>
            <UList>
              <ListItem>Click on it</ListItem>
              <ListItem>Right Click</ListItem>
              <ListItem>Escape key</ListItem>
            </UList>
          </UList>
        </InfoContentContainer>
      </InfoContainer>
    </>
  );
};

export default Toolbar;