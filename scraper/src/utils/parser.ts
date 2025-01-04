import {load} from 'cheerio';
import iconv from 'iconv-lite';

import {Course, CourseParseResult} from '../types';

function cleanText(text: string): string {
  return text
      .replace(
          /[\u200e\u200f\u202a-\u202e]/g,
          '')                       // Remove direction formatting chars
      .replace(/\s+/g, ' ')         // Normalize spaces
      .replace(/[^\S\r\n]+/g, ' ')  // Replace multiple spaces with single space
      .trim();
}

function cleanTitle(title: string): string {
  return title
      .replace(/^\d+\s/, '')  // Remove course number from start
      .replace(/1$/, '')      // Remove trailing "1"
      .replace(
          /[\u200e\u200f\u202a-\u202e]/g,
          '')                // Remove direction formatting chars
      .replace(/‏/g, '')   // Remove special characters
      .replace(/\s+/g, ' ')  // Normalize spaces
      .trim();
}

export async function parseCourseHtml(htmlContent: string):
    Promise<CourseParseResult> {
  try {
    const $ = load(htmlContent);

    // Extract course ID and Hebrew title
    const titleElement = $('h1#course_title').first();
    const fullTitle = titleElement.text();
    const idMatch = fullTitle.match(/^(\d+)/);

    if (!idMatch) {
      return {success: false, error: 'Could not extract course ID'};
    }

    const id = idMatch[1];
    const titleHe = cleanTitle(fullTitle);  // Using the new cleanTitle function

    // Rest of the code remains the same
    const creditPointsText = $('p:contains("נקודות זכות")').first().text();
    const creditPointsMatch =
        creditPointsText.match(/(\d+)\s*נקודות\s*זכות/);
    const creditPoints = creditPointsMatch ? parseInt(creditPointsMatch[1]) : 0;

    // Extract level
    const levelText = creditPointsText.includes('רגילה') ? 'רגיל' :
        creditPointsText.includes('מתקדמת')              ? 'מתקדם' :
        creditPointsText.includes('מתקדם סמינריוני') ? 'מתקדם סמינריוני' :
                                                       'רגיל';

    // Extract department/שיוך
    const departmentElement = $('p:contains("שיוך:")').first();
    const department = cleanText(departmentElement.text().replace('שיוך:', ''));

    // Extract course description
    const descriptionText = $('p')
                                .filter(function() {
                                  return $(this).text().includes('מטרת הקורס');
                                })
                                .text();
    const description = cleanText(descriptionText);

    // Extract topics (under נושאי הלימוד)
    const topics: string[] = [];
    $('ul li.bullets').each((_, elem) => {
      const topic = cleanText($(elem).text());
      if (topic && !topic.includes('נושאי הלימוד')) {
        topics.push(topic);
      }
    });

    // Extract prerequisites
    const prerequisites: string[] = [];
    $('p:contains("ידע קודם")').each((_, elem) => {
      const prereqText = cleanText($(elem).text());
      if (prereqText && !prereqText.includes('לא נדרש ידע קודם')) {
        prerequisites.push(prereqText);
      }
    });

    // Get development team
    const developmentTeam = cleanText($('p:contains("פיתוח הקורס:")').text());
    const advisors = cleanText($('p:contains("יועצים:")').text());

    const courseData: Course = {
      id,
      titleHe,
      creditPoints,
      level: levelText,
      department,
      descriptionHe: description,
      topics,
      prerequisites,
      developmentTeam: developmentTeam.replace('פיתוח הקורס:', '').trim(),
      advisors: advisors.replace('יועצים:', '').trim()
    };

    return {success: true, course: courseData};
  } catch (error) {
    return {success: false, error: `Error parsing course HTML: ${error}`};
  }
}