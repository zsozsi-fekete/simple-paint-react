import { createContext, FC } from 'react';

interface IContext {
  toggleEventListener: (callback: (event: MouseEvent) => void, toggle: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const EventListenerContext = createContext<IContext>(undefined!);

const EventListenerProvider: FC = ({ children }) => {
  const toggleEventListener = (callback: (event: MouseEvent) => void, toggle: boolean): void => {
    if (toggle) document.addEventListener('mousemove', callback);
    else document.removeEventListener('mousemove', callback);
  };

  return (
    <EventListenerContext.Provider value={{ toggleEventListener }}>
      {children}
    </EventListenerContext.Provider>
  );
};

export default EventListenerProvider;