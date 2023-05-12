const isImgUrl = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
}

module.exports = isImgUrl;


  // https://www.zhenghao.io/posts/verify-image-url