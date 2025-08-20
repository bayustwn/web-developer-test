import type { News } from "../model/News";
import './FormatDate';

export const mappers = {
  news1: (item: any) : News => ({
    id: item.uuid,
    title: item.title,
    published_at: item.published_at.toString().toIDDate(),
    url: item.url,
    image: item.image_url,
    description: item.description,
    author: item.source
  }),
  news2: (item: any) : News => ({
    id: item.wgt,
    title: item.title,
    description: item.body.toString().split(0,100),
    published_at: item.dateTime.toString().toIDDate(),
    url: item.url,
    image: item.image,
    author : item.source.title
  }),
  news3: (item: any): News => ({
    id: item.id,
    image: item.image.img,
    description: item.description.toString().split(0,100),
    title: item.title,
    published_at: item.publishedAt.toString().toIDDate(),
    url: item.source,
    author: item.author,
  }),
};