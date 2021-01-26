async function validateFields(schema, request) {
  try {
    const result = await schema.validateAsync(request);
    return { status: true };
  }
  catch (error) {
    let errorReason = error.details && error.details[0].message;
    return { status: false, error: errorReason };
  }
}

exports.validateFields = validateFields;
