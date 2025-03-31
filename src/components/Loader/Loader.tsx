import cn from 'classnames'
import * as React from 'react'
import style from './Loader.module.scss'

export type LoaderProps = {
    /** Дополнительный класс */
    className?: string;
    /** Размер */
    size?: 's' | 'm' | 'l';
};

const Loader: React.FC<LoaderProps> = ({size,className}) => {
  let inner,s
  switch (size) {
  case 's':
    inner = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.34967 13.8462C6.12089 14.5916 2.89917 12.5785 2.15374 9.3497C1.40832 6.12092 3.42148 2.89919 6.65026 2.15377C9.87904 1.40835 13.1008 3.42151 13.8462 6.65028L15.7949 6.20038C14.801 1.89534 10.5054 -0.788866 6.20036 0.20503C1.89532 1.19893 -0.788892 5.49456 0.205004 9.7996C1.1989 14.1046 5.49454 16.7888 9.79957 15.795L9.34967 13.8462Z"
      />
    </svg>
    s=24
    break
  case 'm':
    inner = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.6993 27.6924C12.2418 29.1833 5.79833 25.157 4.30749 18.6994C2.81664 12.2418 6.84296 5.79839 13.3005 4.30754C19.7581 2.8167 26.2015 6.84301 27.6924 13.3006L31.5898 12.4008C29.6021 3.79069 21.0108 -1.57773 12.4007 0.41006C3.79064 2.39785 -1.57778 10.9891 0.410008 19.5992C2.3978 28.2093 10.9891 33.5777 19.5991 31.5899L18.6993 27.6924Z"
      />
    </svg>
    s=48
    break
  default:
    inner = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.3741 34.6155C15.3022 36.4791 7.24785 31.4462 5.3843 23.3742C3.52074 15.3023 8.55364 7.24798 16.6256 5.38443C24.6975 3.52087 32.7518 8.55376 34.6154 16.6257L39.4873 15.501C37.0025 4.73836 26.2634 -1.97217 15.5008 0.512576C4.73824 2.99732 -1.97229 13.7364 0.512449 24.499C2.99719 35.2616 13.7363 41.9721 24.4989 39.4874L23.3741 34.6155Z"
      />
    </svg>
    s=60
  }
  return <div className={cn(style.loader,className)} style={
    {height:s,width:s}
  }>
    {inner}
  </div>
}

export default Loader
