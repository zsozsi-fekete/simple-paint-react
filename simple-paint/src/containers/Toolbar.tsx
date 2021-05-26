import { faSlash, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { toolbarWidth } from '../constants/constants';
import { ShapeType } from '../models/shape';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShapeType } from '../redux/selectors';
import { selectShapeType } from '../redux/slice';

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
    </>
  );
};

export default Toolbar;