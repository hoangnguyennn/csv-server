const toCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const home = (models, port) => {
  const link = (model) => `http://localhost:${port}/${model}`;
  return models
    .map((model) => {
      return `
<div>
  ${toCapitalize(model)}:
  <a href="${link(model)}">${link(model)}</a>
</div>
      `;
    })
    .join('');
};

module.exports = home;
