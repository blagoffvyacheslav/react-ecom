import cn from 'classnames';
import * as React from 'react';
import styles from './Icon.module.scss';
import { ColorEnum } from '../../../types/colorEnum';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: ColorEnum;
  height?: number;
  width?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  width = 24,
  height = 24,
  children,
  ...props
}) => (
  <svg
    {...props}
    className={cn(props.className, styles.icon)}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export default Icon;
