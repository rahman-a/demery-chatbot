import React from 'react'
import style from './overlayBG.module.scss'

export const OverlayBg = ({toggle}) => <div style={{display:toggle ? 'block':'none'}} className={style.overlay}></div>