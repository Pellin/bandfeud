const addProBand = (name, imgUrl, discogsId) => {
  console.log('Adding', name);
  if (name.match(/^the /)) {
    let str = name.slice(4, name.length);
    name = str + ', the';
  }

  const data = {
    name,
    imgUrl,
    discogsId
  };

  fetch(`/api/addproband`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export default addProBand;