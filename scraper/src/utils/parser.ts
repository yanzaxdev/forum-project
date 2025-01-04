import {load} from 'cheerio';

import {Course, CourseParseResult} from '../types';

export async function parseCourseHtml(htmlContent: string):
    Promise<CourseParseResult> {
  try {
    const $ = load(htmlContent);

    // Extract course ID and Hebrew title
    const titleElement = $('h1#course_title').first();
    const fullTitle = titleElement.text().trim();
    const idMatch = fullTitle.match(/^(\d+)/);

    if (!idMatch) {
      return {success: false, error: 'Could not extract course ID'};
    }

    const id = idMatch[1];
    const titleHe = fullTitle.replace(/^\d+\s/, '').replace(/‏/g, '').trim();

    // Extract credit points
    const creditText = $('p:contains("נקודות זכות")').first().text();
    const creditMatch = creditText.match(/(\d+)/);
    const creditPoints = creditMatch ? parseInt(creditMatch[1]) : 0;

    // Extract level
    const levelText = creditText.includes('רגילה') ? 'רגיל' :
        creditText.includes('מתקדמת')              ? 'מתקדם' :
        creditText.includes('מתקדם סמינריוני') ? 'מתקדם סמינריוני' :
                                                 'רגיל';

    // Extract department
    const departmentText = $('p:contains("שיוך:")').first().text();
    const department = departmentText.replace('שיוך:', '').trim();

    // Extract description
    const description = $('p:contains("מטרת הקורס")').first().text().trim();

    // Extract topics
    const topics: string[] = [];
    $('ul li.bullets').each((_, elem) => {
      const topic = $(elem).text().trim();
      if (topic) topics.push(topic);
    });

    // Extract prerequisites
    const prerequisites: string[] = [];
    $('p:contains("ידע קודם")').each((_, elem) => {
      const prereq = $(elem).text().trim();
      if (prereq) prerequisites.push(prereq);
    });

    const courseData: Course = {
      id,
      titleHe,
      creditPoints,
      level: levelText,  // Changed from level to levelText
      department,
      descriptionHe: description,
      topics,
      prerequisites
    };

    return {success: true, course: courseData};
  } catch (error) {
    return {success: false, error: `Error parsing course HTML: ${error}`};
  }
}