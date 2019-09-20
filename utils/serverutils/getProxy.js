const getProxy = band => {
  let proxy = [];

  for (let i = 0; i < band.length; i++) {
    if (
      band[i] === 'å' ||
      band[i] === 'ä' ||
      band[i] === 'á' ||
      band[i] === 'à' ||
      band[i] === 'â' ||
      band[i] === 'ã' ||
      band[i] === 'æ'
    ) {
      proxy.push('a');
    } else if (
      band[i] === 'ö' ||
      band[i] === 'ô' ||
      band[i] === 'ó' ||
      band[i] === 'ò' ||
      band[i] === 'õ' ||
      band[i] === 'ø'
    ) {
      proxy.push('o');
    } else if (
      band[i] === 'ì' ||
      band[i] === 'í' ||
      band[i] === 'î' ||
      band[i] === 'ï'
    ) {
      proxy.push('i');
    } else if (
      band[i] === 'ù' ||
      band[i] === 'ú' ||
      band[i] === 'û' ||
      band[i] === 'ü'
    ) {
      proxy.push('u');
    } else if (band[i] === 'ç') {
      proxy.push('c');
    } else if (band[i] === 'ß') {
      proxy.push('s');
    } else if (band[i] === 'ÿ') {
      proxy.push('y');
    } else {
      proxy.push(band[i]);
    }
  }
  return proxy.join('');
};

module.exports = getProxy;
