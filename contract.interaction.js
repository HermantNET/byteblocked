class Interact {
  constructor() {
    LocalContractStorage.defineMapProperty(this, 'interactions')
    LocalContractStorage.defineProperty(this, 'interactionCount', null)
  }

  init() {
    this.interactionCount = 0
  }

  like(id) {
    var i = this.getInteraction(id)
    i.likes++

    this.interactions.set(id, i)
    return true
  }

  flag(id) {
    var i = this.getInteraction(id)
    i.flagged++

    this.interactions.set(id, i)
    return true
  }

  getInteraction(id) {
    var i = this.interactions.get(id)
    if (!i) {
      i = { likes: 0, flagged: 0 }
    }

    return i
  }

  getInteractions(arr) {
    var payload = []
    for (var i = 0; i < arr.length; i++) {
      payload.push(this.getInteraction(arr[i]))
    }

    return payload
  }
}

module.exports = Interact
