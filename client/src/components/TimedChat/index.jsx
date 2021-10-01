import React, {useState} from 'react'
import style from './style.module.scss'
import InstantBlock from '../instantChat'
import InstantProvider from '../../context/broadcast'
// import Schedule from '../schedule'

const TimedBlocks = () => {
    const [timedType, setTimedType] = useState('instant')
    return (
        <div className={style.timed}>
            <div className={style.timed__nav}>
                <ul className={style.timed__list}>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('instant')}
                    >
                        Broadcast
                    </li>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('schedule')}
                    >
                        Schedule
                    </li>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('sequence')}
                    >
                        Sequence
                    </li>
                </ul>
            </div>
           <InstantProvider>
                <InstantBlock/>
            </InstantProvider>
        </div>
    )
}

export default TimedBlocks
