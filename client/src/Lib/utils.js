exports.convertDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + '/' + month + '/' + day;
};

exports.dateFormating = (date) => {
  const update = new Date(date);
  return `${update.getFullYear()}.${
    update.getMonth('mm') < 10 ? '0' + update.getMonth('mm') : update.getMonth('mm')
  }.${update.getDate('dd') < 10 ? '0' + update.getDate('dd') : update.getDate('dd')}`;
};

exports.textLimiting = (description, count) => {
  if (description.length > count) {
    return description.substr(0, count);
  } else {
    return description;
  }
};

exports.priceFormating = (price) =>
  new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(price);

exports.createFormData = (photo, body) => {
  const data = new FormData();

  data.append('image', {
    name: body.name,
    type: photo.type,
    uri: photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

exports.objectNullChecking = (object) => {
  return object && Object.keys(object).length !== 0;
};

exports.listNullChecking = (list) => {
  return list && list.length > 0;
};

exports.createImageArrayForm = (imgArray, body) => {
  const data = new FormData();

  const imgData = imgArray.map((img) => ({
    name: body.name,
    type: img.type,
    uri: img.uri.replace('file://', ''),
  }));

  data.append('images', imgData);
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};
