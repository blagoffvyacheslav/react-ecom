import cn from 'classnames'
import {HTMLAttributes} from 'react'
import styles from './BlockContainer.module.scss'
const BlockContainer = (props:HTMLAttributes<HTMLDivElement>)=>{
  return (<div {...props} className={cn(styles.blockContainer,props.className)}>
    {props.children}
  </div>)
}
export default BlockContainer