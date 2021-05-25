import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultShape } from '../constants/constants';
import { useShapeCreating } from '../hooks/useShapeCreating';
import { IShape } from '../models/shape';
import { useAppSelector } from '../redux/hooks';
import { selectSelectedShape, selectShapes } from '../redux/selectors';
import ShapeContainer from './ShapeContainer';

const PlaygroundContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  cursor: crosshair;
`;

const Playground: FC = () => {
  const shapes = useAppSelector(selectShapes);
  const [shape, setShape] = useState<IShape>(defaultShape);
  const [creating, createDown, createUp] = useShapeCreating(shape, setShape);
  const selectedShape = useAppSelector(selectSelectedShape);
  useEffect(
    () => {
      if (selectedShape) {
        setShape(selectedShape);
      } else {
        setShape(defaultShape);
      }
    },
    [selectedShape]
  );

  const outline = useCallback(
    (): JSX.Element =>
      <ShapeContainer
        id={shape.id}
        shapeType={shape.shapeType}
        start={shape.dimensions.start}
        current={shape.dimensions.current}
        selected={!!shape.id}
        creating={creating}
        shape={shape}
        setShape={setShape}
      />,
    [shape]
  );

  return (
    <PlaygroundContainer onMouseDown={createDown} onMouseUp={createUp}>
      {shapes.map(s =>
        <ShapeContainer
          key={s.id}
          id={s.id}
          shapeType={s.shapeType}
          start={s.dimensions.start}
          current={s.dimensions.current}
          shape={shape}
          setShape={setShape}
        />
      )}
      {!!shape.id && outline()}
    </PlaygroundContainer>
  );
};

export default Playground;