/* eslint-disable camelcase */
export interface User {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
}

export interface GIFObject {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user?: User;
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: ImageObject;
  title: string;
}

export interface ImageObject {
  fixed_height: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_height_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width: {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_downsampled: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_height_small_still: {
    url: string;
    width: string;
    height: string;
  };
  fixed_width_small: {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
  };
  fixed_width_small_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  downsized_still: {
    url: string;
    width: string;
    height: string;
  };
  downsized_large: {
    url: string;
    width: string;
    height: string;
    size: string;
  };
  original: {
    url: string;
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  original_still: {
    url: string;
    width: string;
    height: string;
  };
}

export interface MetaObject {
  msg: string;
  status: number;
  response_id: string;
}

export interface GiphyResponse {
  data: GIFObject | GIFObject[];
  meta: MetaObject;
}
