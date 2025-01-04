import axios from 'axios';
import iconv from 'iconv-lite';

import {Course, ScrapingResult} from '../types';
import {parseCourseHtml} from '../utils/parser';

export class CourseScraper {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://www.openu.ac.il/courses';
  }

  async scrapeSingleCourse(courseId: string): Promise<ScrapingResult> {
    try {
      const url = `${this.baseUrl}/${courseId}.htm`;
      console.log(`Fetching course from ${url}`);

      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'Accept':
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'he,en-US;q=0.9,en;q=0.8',
          'Connection': 'keep-alive',
          'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      // Convert from Windows-1255 to UTF-8
      const html = iconv.decode(Buffer.from(response.data), 'windows-1255');
      const parseResult = await parseCourseHtml(html);

      if (!parseResult.success) {
        return {success: false, error: parseResult.error};
      }

      return {success: true, data: [parseResult.course!]};

    } catch (error) {
      return {
        success: false,
        error: `Failed to scrape course ${courseId}: ${error}`
      };
    }
  }

  async scrapeMultipleCourses(courseIds: string[]): Promise<ScrapingResult> {
    try {
      const courses: Course[] = [];
      const errors: string[] = [];

      for (const courseId of courseIds) {
        const result = await this.scrapeSingleCourse(courseId);

        if (result.success && result.data) {
          courses.push(result.data[0]);
        } else {
          errors.push(`Failed to scrape course ${courseId}: ${result.error}`);
        }

        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (courses.length === 0) {
        return {
          success: false,
          error: `Failed to scrape any courses. Errors: ${errors.join('; ')}`
        };
      }

      return {success: true, data: courses};

    } catch (error) {
      return {success: false, error: `Failed to scrape courses: ${error}`};
    }
  }
}