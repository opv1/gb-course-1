export default class GoodsFetch {
  constructor(options) {
    this.apiUrl = options.apiUrl
  }

  getGoods() {
    return fetch(`${this.apiUrl}/catalogData.json`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`${res.status}`))
      )
      .then((res) => res)
      .catch(() => {
        throw new Error('Ошибка на этапе запроса')
      })
  }
}
