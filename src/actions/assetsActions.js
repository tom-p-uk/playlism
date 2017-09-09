import { Asset } from 'expo';

import {
  DOWNLOAD_ASSETS_START,
  DOWNLOAD_ASSETS_SUCCESS,
  DOWNLOAD_ASSETS_FAILURE,
} from './types';

export const downloadAssets = async () => {
  const img = [
    { 'playlism-logo.png': { url: 'http://i.imgur.com/uhA492C.png' } },
    { 'record-shop-hand.jpg': { url: 'http://i.imgur.com/6VKBGhs.jpg'} },
    { 'stack-vinyl.jpg': { url: 'http://i.imgur.com/9KLqD2A.jpg'} },
  ];


};
