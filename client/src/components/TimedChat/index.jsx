import React, {useState} from 'react'
import style from './style.module.scss'
import InstantBlock from '../instantChat'
import InstantProvider from '../../context/timed'
import Schedule from '../schedule'
import Sequence from '../Sequence'

const TimedBlocks = () => {
    const [timedType, setTimedType] = useState('instant')
    const TimedComponents = {
        instant:InstantBlock,
        schedule:Schedule,
        sequence:Sequence
    }
    const TimedComponent = TimedComponents[timedType]
    return (
        <div className={style.timed}>
            <div className={style.timed__nav}>
                <ul className={style.timed__list}>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('instant')}
                        style={{backgroundColor:timedType === 'instant' && 'blue'}}
                    >
                        Broadcast
                    </li>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('schedule')}
                        style={{backgroundColor:timedType === 'schedule' && 'blue'}}
                    >
                        Schedule
                    </li>
                    <li 
                        className={style.timed__item}
                        onClick={() => setTimedType('sequence')}
                        style={{backgroundColor:timedType === 'sequence' && 'blue'}}
                    >
                        Sequence
                    </li>
                </ul>
            </div>
           <InstantProvider>
                <TimedComponent/> 
            </InstantProvider>
        </div>
    )
}

export default TimedBlocks
