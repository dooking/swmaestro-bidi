const convertDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + '/' + month + '/' + day;
};

const dateFormating = (date) => {
  const update = new Date(date);
  return `${update.getFullYear()}.${
    update.getMonth('mm') < 10 ? '0' + update.getMonth('mm') : update.getMonth('mm')
  }.${update.getDate('dd') < 10 ? '0' + update.getDate('dd') : update.getDate('dd')}`;
};

const textLimiting = (description, count) => {
  if (description.length > count) {
    return description.substr(0, count);
  } else {
    return description;
  }
};

const priceFormating = (price) => new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(price);

const createFormData = (photo, body) => {
  const data = new FormData();

  photo.forEach((item) => {
    data.append('userImage', {
      name: body.name,
      type: item.type,
      uri: item.uri.replace('file://', ''),
    });
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

const createImageArrayForm = (imgArray, body) => {
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

export {
  convertDate,
  textLimiting,
  dateFormating,
  priceFormating,
  createImageArrayForm,
  createFormData,
};
