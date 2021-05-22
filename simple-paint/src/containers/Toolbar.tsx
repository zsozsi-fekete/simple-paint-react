import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { ShapeType } from '../models/shape';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSelectedShape } from '../redux/selectors';
import { selectShape } from '../redux/slice';

const ToolbarItemContainer = styled.div<{ isSelected: boolean }>`
  height: 2rem;
  display: flex;
  justify-content: center;

  ${props => props.isSelected && `
  background-color: #10ac84;    
`};
  
`;

const Toolbar: FC = () => {
  const dispatch = useAppDispatch();
  const selectedShapeType = useAppSelector(selectSelectedShape);

  const click = useCallback(
    (shapeType: ShapeType) => {
      dispatch(selectShape(shapeType));
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
          {ShapeType[s as keyof typeof ShapeType]}
        </ToolbarItemContainer>
      )}
    </>
  );
};

export default Toolbar;