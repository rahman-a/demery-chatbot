import React from 'react'
import Select from './select'
import Chatbot from './chatbot'
import VerticalDots from './v-dots'
import BackArrow from './backArrow'
import Trash from './trash'
import Edit from './edit'
import Setting from './setting'
import USB from './usb'
import PlusSquare from './plus-square'
import CloseSquare from './close-square'
import Refresh from './refresh'
import ChatTest from './chat-test'
import PaperPlane from './paper-plane'
import ChatBlock from './chat-block'
import HourGlass from './hour-glass'
import ChatStats from './chat-stats'
import Searching from './searching'
import EyeOpen from './eye-open'
import EyeClose from './eye-close'
import HamMenu from './hamMenu'

const Icons = props => {
    switch(props.name.toLowerCase()) {
        case 'select':
            return <Select {...props}/>
        case 'chatbot':
            return <Chatbot {...props}/>
        case 'v-dots':
            return <VerticalDots {...props}/>
        case 'back-arrow':
            return <BackArrow {...props}/>
        case 'trash':
            return <Trash {...props}/>
        case 'edit':
            return <Edit {...props}/>
        case 'setting':
            return <Setting {...props}/>
        case 'usb':
            return <USB {...props}/>
        case 'plus-square':
            return <PlusSquare {...props}/>
        case 'close-square':
            return <CloseSquare {...props}/>
        case 'refresh':
            return <Refresh {...props}/>
        case 'chat-test':
            return <ChatTest {...props}/>
        case 'paper-plane':
            return <PaperPlane {...props}/>
        case 'chat-block':
            return <ChatBlock {...props}/>
        case 'hour-glass':
            return <HourGlass {...props}/>
        case 'chat-stats':
            return <ChatStats {...props}/>
        case 'searching':
            return <Searching {...props}/>
        case 'eye-open':
            return <EyeOpen {...props}/>
        case 'eye-close':
            return <EyeClose {...props}/>
        case 'ham-menu':
            return <HamMenu {...props}/>
        default:
            return ''
    }
}

export default Icons
