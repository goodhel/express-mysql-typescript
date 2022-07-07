class _Serialize {
  bigint = async (input: number) => {
    try {
      let data: string | number = input

      if (typeof input === 'bigint') {
        // assign new variable as number
        const dat = input as number

        data = dat.toString()
      }

      return data
    } catch (error) {
      console.error('bigint serialize helper Error: ', error)

      return error
    }
  }
}

export default new _Serialize()
