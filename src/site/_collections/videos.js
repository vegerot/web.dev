/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const CacheAsset = require('@11ty/eleventy-cache-assets');
/** @type VideosData */
const videosData = require('../_data/videosData.json');

/**
 * Returns all authors with their posts.
 *
 * @return {Promise<Videos>}
 */
module.exports = async () => {
  /** @type Videos */
  const videos = {};
  const keys = Object.keys(videosData);

  for (const key of keys) {
    const videoData = videosData[key];
    const href = `/videos/${key}/`;
    const url = `https://storage.googleapis.com/web-dev-uploads/youtube/${videoData.playlistId}.json`;
    const elements = (
      await CacheAsset(url, {
        duration: '6h',
        type: 'json',
      }).catch((e) => {
        console.warn(e);
        return [];
      })
    ).map((v) => {
      v.date = new Date(v.date);
      v.data.date = new Date(v.data.date);
      v.url = `${href}${v.data.videoId}/`;
      return v;
    });
    if (elements.length === 0) {
      continue;
    }

    /** @type VideosItem */
    const video = {
      ...videoData,
      data: {
        alt: videoData.title,
        date: elements[elements.length - 1].date,
        hero: elements[0].data.thumbnail,
        subhead: videoData.description,
        title: videoData.title,
      },
      elements,
      href,
      key,
      url: href,
    };

    // Limit posts for percy
    if (process.env.PERCY) {
      video.elements = video.elements.slice(-6);
    }

    // Set created on date and updated date
    if (video.elements.length > 0) {
      video.data.date = video.elements.slice(-1).pop().data.date;
      const updated = video.elements.slice(0, 1).pop().data.date;
      if (video.data.date !== updated) {
        video.data.updated = updated;
      }
    }

    if (video.elements.length > 0) {
      videos[key] = video;
    }
  }

  return videos;
};
