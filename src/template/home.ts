const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const home = (models: string[], port: number) => {
  const link = (model: string) => `http://localhost:${port}/${model}`

  return models
    .map(model => {
      return `
<div>
  ${toCapitalize(model)}:
  <a href="${link(model)}">${link(model)}</a>
</div>
    `
    })
    .join('')
}

export default home
