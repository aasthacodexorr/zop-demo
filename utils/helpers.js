export const getImageUrls = (
  image_cdn,
  placeholder,
  image_urls,
  image_with_overlay_urls
) => {
  if (typeof image_urls !== "string") {
    image_urls = "";
  }

  if (typeof image_with_overlay_urls !== "string") {
    image_with_overlay_urls = "";
  }

  let gallery_images = placeholder;
  gallery_images = image_urls ? image_urls : gallery_images;
  gallery_images = gallery_images.split(";");
  image_with_overlay_urls = image_with_overlay_urls.split(";");

  gallery_images = gallery_images.map((image_url, index) => {
    let current_image_url = image_url;
    if (typeof image_with_overlay_urls[index] !== "undefined") {
      if (image_with_overlay_urls[index].length > 1) {
        current_image_url = image_with_overlay_urls[index];
      }
    }

    current_image_url = parseAbsoluteOrRelativeUrl(
      image_cdn,
      current_image_url.trim()
    );
    return current_image_url;
  });
  return gallery_images;
};

export const parseAbsoluteOrRelativeUrl = (base_url, url) => {
  let isAbsoluteUrl = url.match(
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})|^([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,7})$/gim
  );

  if (isAbsoluteUrl) {
    if (url.match(/^https?:\/\//i)) {
      return url;
    } else {
      return "https://" + url;
    }
  } else {
    return base_url + url;
  }
};

export const formatNumber = (number, options = {}) => {
  {
    var formatter = new Intl.NumberFormat("en-US", options);
    try {
      return formatter.format(number);
    } catch (error) {
      return formatter.format(0);
    }
  }
};

export const truncateText = function (text, length, clamp) {
  clamp = clamp || "...";
  let content = text;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

export const getUrl = (inventory_id, year, make, model) =>
  `/inventory/${inventory_id}-${year}-${make}-${model}`
    .replace(/\s+/g, "-")
    .toLowerCase();

export const isValidJsonString = (jsonString) => {
  if (!(jsonString && typeof jsonString === "string")) {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};
