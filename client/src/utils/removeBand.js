const removeBand = name => {
  if (name.match(/^the /)) {
    let str = name.slice(4, name.length);
    name = str + ', the';
  }

  const data = {
    name
  };

  fetch(`/api/removeband`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export default removeBand;
