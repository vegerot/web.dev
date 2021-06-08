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

const {feed, index, individual} = require('./utils');

/**
 * @param {VideosItem[]} videos
 * @return {VideosItem[]}
 */
const videosFeed = (videos) => feed(videos);

/**
 * @param {VideosItem[]} videos
 * @return {Paginated[]}
 */
const videosIndex = (videos) => {
  const href = '/videos/';
  const testTags = ['http-203'];

  return index(videos, href, testTags);
};

/**
 * @param {VideosItem[]} videos
 * @param {string} [lang]
 * @return {Paginated[]}
 */
const videosIndividual = (videos, lang) => individual(videos, lang);

module.exports = {
  feed: videosFeed,
  index: videosIndex,
  individual: videosIndividual,
};
