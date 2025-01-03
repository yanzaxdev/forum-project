import {SearchParams} from 'next/dist/server/request/search-params';
import {Dir} from '~/app/providers';
import {xTrans} from '~/translations';

export async function getLang(searchParams?: SearchParams) {
  const sp = await searchParams;
  const dir = sp?.lang === Lang.HE ? Dir.RTL : Dir.LTR;
  const lang = sp?.lang === Lang.EN ? Lang.EN : Lang.HE;
  const isRTL = lang === Lang.HE;
  const translation = xTrans[lang];
  const langParam = lang === Lang.HE ? '' : '?lang=en';
  return {lang, translation, isRTL, langParam, dir};
}

export enum Lang {
  EN = 'en',
  HE = 'he'
}