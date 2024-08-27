import { groq } from 'next-sanity';

export const POIS_QUERY = groq`*[_type == "poi"][0...12]{
  _id, address ,description ,type ,position
}`;

export const POIS_AREA_QUERY = groq`*[_type == "poi"&& geo::contains($currentLocation, position)]{
  _id, address ,description ,type ,position
}`;
