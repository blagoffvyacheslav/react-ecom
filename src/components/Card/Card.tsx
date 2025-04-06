import cn from 'classnames';
import Text from '../Text';
import styles from './Card.module.scss';
import { ColorEnum } from '../../types/colorEnum';

export type CardProps = {
  /*+*/
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /*+*/
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Дополнительный classname */
  className?: string;
  /*+*/
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /*+*/
  /** Описание карточки */
  description: React.ReactNode;
  /*+*/
  /** URL изображения */
  image: string;
  /*+*/
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /*+*/
  /** Заголовок карточки */
  title: React.ReactNode /*+*/;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={cn(props.className, styles.card)} onClick={props.onClick}>
      <img src={props.image} alt="" />
      <div className={styles.card__text}>
        <div className={styles.card__caption}>{props.captionSlot}</div>
        <Text maxLines={2} weight={'medium'} view={'p-20'} tag={'h3'}>
          {props.title}
        </Text>
        <Text maxLines={3} color={ColorEnum.Secondary}>
          {props.description}
        </Text>
      </div>
      <div className={styles.card__bottom}>
        <Text weight={'bold'} className={styles.card__contentSlot}>
          ${props.contentSlot}
        </Text>
        {props.actionSlot}
      </div>
    </div>
  );
};

export default Card;
