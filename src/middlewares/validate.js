function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(422).json({
        message: 'Erro de validação',
        details: error.details.map(d => ({ message: d.message, path: d.path }))
      });
    }
    req[property] = value;
    return next();
  };
}

module.exports = { validate };
