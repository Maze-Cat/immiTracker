import type { BilingualVisaInfo } from '@/types/visa-info';
import opt from './opt';
import stemOpt from './stem-opt';
import h1b from './h1b';
import h4 from './h4';
import perm from './perm';
import l1 from './l1';
import b1b2 from './b1b2';
import niw from './niw';
import greenCard from './green-card';

const visaDataMap: Record<string, BilingualVisaInfo> = {
  opt,
  'stem-opt': stemOpt,
  h1b,
  h4,
  perm,
  l1,
  b1b2,
  niw,
  'green-card': greenCard,
};

export default visaDataMap;
