declare module 'react-native-emoji-selector' {
  import React from 'react';
  export enum Categories {
    All = '.all',
    History = '.history',
    People = '.people',
    Nature = '.nature',
    Food = '.food',
    Activities = '.activities',
    Places = '.places',
    Objects = '.objects',
    Symbols = '.symbols',
    Flags = '.flags',
  }
  export interface IProps {
    onEmojiSelected(emoji: string): void;
    theme?: string;
    showTabs?: boolean;
    showSearchBar?: boolean;
    showHistory?: boolean;
    category?: Categories;
    columns?: number;
  }
  const EmojiSelector: React.FC<IProps>;

  // eslint-disable-next-line import/no-default-export
  export default EmojiSelector;
}
