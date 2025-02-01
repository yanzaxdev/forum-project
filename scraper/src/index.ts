import fs from 'fs/promises';
import path from 'path';

import {CATEGORIES} from './coursesId';
import {CourseScraper} from './services/scraper';

async function main() {
  const scraper = new CourseScraper();
  console.log('\nScraping multiple courses...');
  const keys = [
    'core',
    //  'elective',
    // 'seminar',
    // 'workshops'
  ] as (keyof typeof CATEGORIES)[];
  for (const category of keys) {
    const courseIds = CATEGORIES[category] as string[];
    console.log(
        `Scraping ${courseIds.length} courses in category: ${category}`);

    const result = await scraper.scrapeMultipleCourses(courseIds);

    if (result.success) {
      // Create data directory if it doesn't exist
      await fs.mkdir(path.join(__dirname, '../data'), {recursive: true});

      // Save multiple courses result
      await fs.writeFile(
          path.join(__dirname, `../data/${category}-courses.json`),
          JSON.stringify(result.data, null, 2), 'utf-8');
      console.log('Successfully scraped and saved all courses');
    } else {
      console.error('Failed to scrape courses:', result.error);
    }
  }
}

main().catch(console.error);