import fs from 'fs/promises';
import path from 'path';

import {CourseScraper} from './services/scraper';

async function main() {
  const scraper = new CourseScraper();

  // Example 1: Scrape a single course
  console.log('Scraping single course...');
  const singleResult = await scraper.scrapeSingleCourse('20476');

  if (singleResult.success) {
    // Save single course result
    await fs.writeFile(
        path.join(__dirname, '../data/single-course.json'),
        JSON.stringify(singleResult.data, null, 2), 'utf-8');
    console.log('Successfully scraped and saved single course');
  } else {
    console.error('Failed to scrape course:', singleResult.error);
  }

  //   // Example 2: Scrape multiple courses
  //   const courseIds = [
  //     '20476', '20109', '20229', '20474', '20475', '20425', '20441', '20407',
  //     '20417'
  //   ];

  //   console.log('\nScraping multiple courses...');
  //   const multipleResult = await scraper.scrapeMultipleCourses(courseIds);

  //   if (multipleResult.success) {
  //     // Create data directory if it doesn't exist
  //     await fs.mkdir(path.join(__dirname, '../data'), {recursive: true});

  //     // Save multiple courses result
  //     await fs.writeFile(
  //         path.join(__dirname, '../data/all-courses.json'),
  //         JSON.stringify(multipleResult.data, null, 2), 'utf-8');
  //     console.log('Successfully scraped and saved all courses');
  //   } else {
  //     console.error('Failed to scrape courses:', multipleResult.error);
  //   }
}

main().catch(console.error);