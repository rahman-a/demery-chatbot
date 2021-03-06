// Writer Reducer
import {
    loginReducer,
    writerCreateReducer,
    listChannelsReducer,
    logoutReducer,
    writerInfoReducer,
    writerInfoEditReducer,
    writerAccessReducer,
    listWritersReducer,
    writerInfoByIdReducer,
    writerDeleteReducer,
    writerSubscribeReducer,
    writerUnsubscribeReducer
} from './writerReducer'

// Channel Reducer
import {
    createChannelReducer,
    getChannelReducer,
    editChannelReducer,
    deleteChannelReducer
} from './channelReducer'

// Block Reducer 
import {
    createBlockReducer,
    ListBlocksReducer,
    editBlockReducer,
    deleteBlockReducer
} from './blockReducer'

// Dialogue Reducer
import {
    getDialoguesReducer,
    getDialogueBlock,
    deleteDialogueRecords
} from './dialogueReducer'

// Sequence Reducer
import {
    listSequenceReducer,
    createSequenceReducer,
    deleteSequenceReducer
} from './sequenceReducer'

// Timed Blocks Reducer 
import {
    addTimedBlockReducer,
    listTimedBlocksReducer,
    listTimedDialogueReducer,
    toggleTimedBlockReducer,
    removeTimedBlockReducer
} from './timedBlockReducer'

const globalReducer = {
    // Writer Reducer
    writer:loginReducer,
    writers:listWritersReducer,
    channels:listChannelsReducer,
    register:writerCreateReducer,
    info:writerInfoReducer,
    edit:writerInfoEditReducer,
    logout:logoutReducer,
    access:writerAccessReducer,
    infoById:writerInfoByIdReducer,
    delete:writerDeleteReducer,
    subscribe:writerSubscribeReducer,
    unsubscribe:writerUnsubscribeReducer,

    // Channel Reducer
    channel:createChannelReducer,
    oneChannel: getChannelReducer,
    channelEdit:editChannelReducer,
    channelDelete:deleteChannelReducer,

    // Block Reducer 
    newBlock:createBlockReducer,
    editBlock:editBlockReducer,
    blocks:ListBlocksReducer,
    blockDelete:deleteBlockReducer,

    
    // Dialogue Reducer
    getDialogues:getDialoguesReducer,
    dialogueBlock:getDialogueBlock,
    deleteRecords:deleteDialogueRecords,

    // Sequence Reducer
    sequenceGroups: listSequenceReducer,
    sequenceGroup: createSequenceReducer,
    sequenceGroupRemoved:deleteSequenceReducer,

    // Timed Block Reducer
    timedBlockAdded: addTimedBlockReducer,
    timedDialogueBlocks:listTimedDialogueReducer,
    timedBlocks: listTimedBlocksReducer,
    toggleBlock:toggleTimedBlockReducer,
    timedBlockRemoved:removeTimedBlockReducer,
}

export default globalReducer