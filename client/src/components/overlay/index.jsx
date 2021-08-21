import React from 'react'
import style from './overlay.module.scss'

export const Overlay = ({toggle}) => <div style={{display:toggle ? 'block':'none'}} className={style.overlay}></div>