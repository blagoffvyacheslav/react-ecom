import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';
import { useClickOutside } from './hooks';
import { Option } from './types';
import { ColorEnum } from '../../types/colorEnum';

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  generateValueElement: (value: Option[]) => string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
};

export const MultiDropdown = ({
  options,
  value,
  onChange,
  generateValueElement,
  disabled = false,
  ...props
}: MultiDropdownProps) => {
  const [text, setText] = useState('');
  const visibleOptions = options.filter((v) => v.value.includes(text));
  const [isOpen, setIsOpen] = useState(false);

  function includes(opts: Option[], opt: Option) {
    return opts.some((o) => opt.key === o.key);
  }

  const ref = useRef<HTMLDivElement>(null);
  // @ts-ignore
  useClickOutside(ref, () => setIsOpen(false));
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    disabled && setIsOpen(false);
  }, [disabled]);
  return (
    <div
      ref={ref}
      {...props}
      className={cn('multiDropdown', styles.multiDropdown, props.className, {
        [styles._isOpen]: isOpen,
      })}
      onClick={() => !disabled && setIsOpen(true)}
    >
      <Input
        placeholder={generateValueElement(value)}
        value={
          isOpen && text !== ''
            ? text
            : value.length === 0
              ? ''
              : generateValueElement(value)
        }
        onChange={setText}
        afterSlot={<ArrowDownIcon color={ColorEnum.Secondary} />}
      />
      {isOpen ? (
        <div className={cn(styles.optionsParent)}>
          {visibleOptions.map((option) => (
            <div
              key={option.key}
              className={cn(styles.option, {
                [styles.selected]: includes(value, option),
              })}
              onClick={() =>
                !includes(value, option)
                  ? onChange([...value, option])
                  : onChange(value.filter((o) => o.key !== option.key))
              }
            >
              {option.value}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default MultiDropdown;
