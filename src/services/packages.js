function newPackagesService() {
  const API_URL = 'https://registry.npmjs.org/-/v1/search'

  return {
    async fetch(params) {
      const searchParams = new URLSearchParams(params)

      const url = `${API_URL}?${searchParams.toString()}`

      return (await fetch(url)).json()
    }
  }
}

export default newPackagesService()
