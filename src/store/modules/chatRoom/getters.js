export const threads = state => state.threads
export const currentMessage = state => state.messages

export const currentThread = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID]
    : {}
}

export const chosenThread = state => threadId => {
  return state.threads[threadId]
}

export const currentMessages = state => {
  const thread = currentThread(state)
  return thread.messages
    ? thread.messages.map(id => state.messages[id])
    : []
}

export const currentMembers = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID].members
    : []
}

export const ifExistThread = state => person_id => {
  for(let group_id in state.threads) {
    if(state.threads[group_id].person_id == person_id) {
      return group_id
    }
  }
  return null
}