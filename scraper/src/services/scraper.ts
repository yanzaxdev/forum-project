import axios from 'axios';

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

      const response = await axios.get(url);
      const parseResult = await parseCourseHtml(response.data);

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

      // Process courses sequentially with delay
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