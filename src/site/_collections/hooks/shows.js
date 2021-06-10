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
const {defaultLocale} = require('../../_data/site');
const {i18n} = require('../../_filters/i18n');

/**
 * @param {ShowsItem[]} shows
 * @param {string} [lang]
 * @return {ShowsItem[]}
 */
const getFields = (shows, lang = defaultLocale) => {
  return shows.map((s) => {
    s.description = i18n(`i18n.paths.shows.${s.key}.description`, lang);
    s.title = i18n(`i18n.paths.shows.${s.key}.title`, lang);
    s.data.alt = i18n(`i18n.paths.shows.${s.key}.title`, lang);
    s.data.subhead = i18n(`i18n.paths.shows.${s.key}.description`, lang);
    s.data.title = i18n(`i18n.paths.shows.${s.key}.title`, lang);
    return s;
  });
};

/**
 * @param {ShowsItem[]} shows
 * @param {string} [lang]
 * @return {ShowsItem[]}
 */
const showsFeed = (shows, lang = defaultLocale) => {
  shows = getFields(shows, lang);
  return feed(shows);
};

/**
 * @param {ShowsItem[]} shows
 * @param {string} [lang]
 * @return {Paginated[]}
 */
const showsIndex = (shows, lang = defaultLocale) => {
  shows = getFields(shows, lang);
  const href = '/shows/';
  const testTags = ['http-203'];

  return index(shows, href, testTags);
};

/**
 * @param {ShowsItem[]} shows
 * @param {string} [lang]
 * @return {Paginated[]}
 */
const showsIndividual = (shows, lang) => {
  shows = getFields(shows, lang);
  return individual(shows);
};

module.exports = {
  feed: showsFeed,
  index: showsIndex,
  individual: showsIndividual,
};
