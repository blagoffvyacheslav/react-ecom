import cn from 'classnames';
import * as React from 'react';
import { ElementType, HTMLAttributes } from 'react';
import styles from './Text.module.scss';
import { ColorEnum } from '../../types/colorEnum';

export type TextProps = {
  /** Контент */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Цвет */
  color?: ColorEnum;
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** Html-тег */
  tag?: ElementType;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
} & HTMLAttributes<HTMLElement>; // Extend HTMLAttributes

const Text: React.FC<TextProps> = ({
  children,
  className,
  color,
  maxLines,
  tag = 'p',
  view,
  weight,
  ...rest
}) => {
  const Element = tag as ElementType;
  const inlineStyles = maxLines ? { WebkitLineClamp: maxLines } : {};
  return (
    <Element
      className={cn(
        className,
        styles.text,
        `v${view}`,
        `w${weight}`,
        `c${color}`
      )}
      style={{ ...inlineStyles }}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Text;
