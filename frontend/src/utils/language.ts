import {SearchParams} from 'next/dist/server/request/search-params';
import {xTrans} from '~/translations';

export async function getLang(searchParams?: SearchParams) {
  const sp = searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'he';
  const isHeb = lang === 'he';
  const translation = xTrans[lang];
  const langParam = lang === 'he' ? '' : '?lang=en';
  return {lang, translation, isHeb, langParam};
}