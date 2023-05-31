import { readFileSync, writeFileSync } from 'node:fs';

import { getFilteredImageDataURL, ImageDetails } from './inject/dynamic-theme/image';
import { clamp } from './utils/math';
import { DEFAULT_THEME } from './defaults';
import { imageSize } from 'image-size';
import { lookup } from 'mime-types';

const fileName = process.argv[2];
const buffer = readFileSync(fileName);
const size = imageSize(buffer);

const imageDetails = {
  dataURL: `data:${lookup(fileName)};base64,${buffer.toString('base64')}`,
  width: size.width,
  height: size.height,
} as ImageDetails;

const filteredUrl = getFilteredImageDataURL(imageDetails, {
  ...DEFAULT_THEME,
  brightness: clamp(DEFAULT_THEME.brightness - 10, 5, 200),
  sepia: clamp(DEFAULT_THEME.sepia + 10, 0, 100),
});

const template = readFileSync('src/template.html', { encoding: 'utf-8' });

const html = template.replace('%HEIGHT%', size.height!.toString()).replace('%WIDTH%', size.width!.toString()).replace('%DATAURL%', filteredUrl);

writeFileSync(fileName + '.html', html);
