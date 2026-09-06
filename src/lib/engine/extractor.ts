import * as cheerio from "cheerio";
import type { ExtractedInfo } from "./types";
import { extractBoardFromUrl, extractClassLevel, extractYear } from "./classifier";

export function extractDateSheet(html: string, url: string, title: string): ExtractedInfo {
  const $ = cheerio.load(html);
  const board = extractBoardFromUrl(url);
  const classLevel = extractClassLevel(title + " " + html);
  const year = extractYear(title + " " + html);

  const entries: { subject: string; date: string; time: string }[] = [];

  $("table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length >= 2) {
      const subject = $(cells[0]).text().trim();
      const date = $(cells[1]).text().trim();
      const time = cells.length >= 3 ? $(cells[2]).text().trim() : "";

      if (subject && date && !subject.toLowerCase().includes("subject")) {
        entries.push({ subject, date, time });
      }
    }
  });

  const structuredData = {
    entries,
    total_entries: entries.length,
    raw_text: $.root().text().replace(/\s+/g, " ").trim().substring(0, 3000),
  };

  return {
    document_type: "date_sheet",
    title,
    board: board || undefined,
    class_level: classLevel || undefined,
    year: year || undefined,
    confidence: board && classLevel && year ? 90 : board ? 70 : 50,
    structured_data: structuredData,
  };
}

export function extractResult(html: string, url: string, title: string): ExtractedInfo {
  const $ = cheerio.load(html);
  const board = extractBoardFromUrl(url);
  const classLevel = extractClassLevel(title + " " + html);
  const year = extractYear(title + " " + html);

  const positionHolders: { position: number; name: string; marks: string; school?: string }[] = [];

  $("table tr, .result-row, .position-holder").each((_, el) => {
    const text = $(el).text().trim();
    if (text.match(/1st|2nd|3rd|first|second|third/i)) {
      const cells = $(el).find("td");
      if (cells.length >= 2) {
        const name = $(cells[0]).text().trim();
        const marks = $(cells[1]).text().trim();
        const school = cells.length >= 3 ? $(cells[2]).text().trim() : undefined;
        const position = positionHolders.length + 1;
        positionHolders.push({ position, name, marks, school });
      }
    }
  });

  const resultLinks: string[] = [];
  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().toLowerCase();
    if (text.includes("check result") || text.includes("view result") || href.includes("result")) {
      try {
        resultLinks.push(new URL(href, url).href);
      } catch { /* invalid URL */ }
    }
  });

  const structuredData = {
    position_holders: positionHolders,
    result_links: resultLinks,
    announcement_text: $(".announcement, .notice, .highlight").first().text().trim().substring(0, 500),
    raw_text: $.root().text().replace(/\s+/g, " ").trim().substring(0, 3000),
  };

  return {
    document_type: "result",
    title,
    board: board || undefined,
    class_level: classLevel || undefined,
    year: year || undefined,
    confidence: board && classLevel && year ? 85 : board ? 65 : 45,
    structured_data: structuredData,
  };
}

export function extractMeritList(html: string, url: string, title: string): ExtractedInfo {
  const $ = cheerio.load(html);
  const board = extractBoardFromUrl(url);
  const classLevel = extractClassLevel(title + " " + html);
  const year = extractYear(title + " " + html);

  const entries: { roll_no: string; name: string; marks: string; program?: string }[] = [];

  $("table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length >= 3) {
      const rollNo = $(cells[0]).text().trim();
      const name = $(cells[1]).text().trim();
      const marks = $(cells[2]).text().trim();
      const program = cells.length >= 4 ? $(cells[3]).text().trim() : undefined;

      if (rollNo && name) {
        entries.push({ roll_no: rollNo, name, marks, program });
      }
    }
  });

  const structuredData = {
    entries,
    total_entries: entries.length,
    raw_text: $.root().text().replace(/\s+/g, " ").trim().substring(0, 3000),
  };

  return {
    document_type: "merit_list",
    title,
    board: board || undefined,
    class_level: classLevel || undefined,
    year: year || undefined,
    confidence: board && year ? 80 : 50,
    structured_data: structuredData,
  };
}

export function extractGenericPage(html: string, url: string, title: string): ExtractedInfo {
  const $ = cheerio.load(html);
  const board = extractBoardFromUrl(url);
  const classLevel = extractClassLevel(title + " " + html);
  const year = extractYear(title + " " + html);

  const links: { text: string; href: string }[] = [];
  $("a").each((_, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr("href") || "";
    if (text && href) {
      try {
        links.push({ text, href: new URL(href, url).href });
      } catch { /* invalid URL */ }
    }
  });

  const structuredData = {
    links: links.slice(0, 50),
    raw_text: $.root().text().replace(/\s+/g, " ").trim().substring(0, 3000),
  };

  return {
    document_type: "other",
    title,
    board: board || undefined,
    class_level: classLevel || undefined,
    year: year || undefined,
    confidence: 30,
    structured_data: structuredData,
  };
}

export function extractByType(html: string, url: string, title: string, documentType: string): ExtractedInfo {
  switch (documentType) {
    case "date_sheet":
      return extractDateSheet(html, url, title);
    case "result":
      return extractResult(html, url, title);
    case "merit_list":
      return extractMeritList(html, url, title);
    default:
      return extractGenericPage(html, url, title);
  }
}
