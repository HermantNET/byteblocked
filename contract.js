class Byte {
  constructor() {
    LocalContractStorage.defineMapProperty(this, 'contracts')
    LocalContractStorage.defineProperty(this, 'contractCount', null)
  }

  init() {
    this.contractCount = 0
  }

  verify(data) {
    if (data.name.length < 1 || data.name.length > 50)
      throw new Error('Invalid name')
    if (data.author.length != 0 && data.author.length !== 35)
      throw new Error('Invalid author')
    if (data.description.length < 20) throw new Error('Description too short')
    if (data.contract.length < 20) throw new Error('Invalid contract')

    return true
  }

  postContract(name, author, description, contract, contractAddress, example) {
    var contractCount = new BigNumber(this.contractCount).plus(1)
    var data = {
      name,
      author,
      description,
      contract,
      contractAddress,
      example,
    }

    this.verify(data)
    this.contracts.set(contractCount, data)
    this.contractCount = contractCount

    return true
  }

  getCount() {
    return this.contractCount
  }

  getContract(id) {
    return this.contracts.get(id)
  }

  getContracts(from, to) {
    var payload = []
    for (var i = +from; i > 0 && i >= +to && i <= +this.contractCount; i--) {
      payload.push(this.contracts.get(i))
    }

    return payload
  }
}

module.exports = Byte
