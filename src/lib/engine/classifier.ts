import type { ClassifierResult, DocumentType } from "./types";

const DOCUMENT_PATTERNS: Record<DocumentType, { urlPatterns: string[]; titlePatterns: string[]; keywords: string[] }> = {
  result: {
    urlPatterns: ["result", "results", "nateeja", "nataij"],
    titlePatterns: ["result", "declared", "announced", "nateeja"],
    keywords: ["result", "declared", "announced", "position holders", "gazette", "marksheet", "ssc", "matric result", "inter result"],
  },
  date_sheet: {
    urlPatterns: ["date-sheet", "datesheet", "date_sheet", "schedule", "exam-schedule"],
    titlePatterns: ["date sheet", "datesheet", "exam schedule", "time table", "timetable"],
    keywords: ["date sheet", "exam schedule", "time table", "examination schedule", "paper date"],
  },
  roll_number_slip: {
    urlPatterns: ["roll-number", "rollno", "admit-card", "roll_slip", " slips"],
    titlePatterns: ["roll number slip", "admit card", "roll slip", "registration slip"],
    keywords: ["roll number", "admit card", "registration slip", "roll no", "candidate slip"],
  },
  past_paper: {
    urlPatterns: ["past-paper", "pastpaper", "previous-paper", "old-paper", "model-paper"],
    titlePatterns: ["past paper", "previous paper", "old paper", "model paper", "specimen"],
    keywords: ["past paper", "previous year paper", "model paper", "specimen paper", "old paper", "guess paper"],
  },
  syllabus: {
    urlPatterns: ["syllabus", "curriculum", "course-outline"],
    titlePatterns: ["syllabus", "curriculum", "course outline", "course structure"],
    keywords: ["syllabus", "curriculum", "course outline", "chapter list", "topics"],
  },
  model_paper: {
    urlPatterns: ["model-paper", "modelpaper", "sample-paper", "guess-paper"],
    titlePatterns: ["model paper", "sample paper", "guess paper", "practice paper"],
    keywords: ["model paper", "sample paper", "guess paper", "practice paper", "specimen"],
  },
  merit_list: {
    urlPatterns: ["merit-list", "meritlist", "select-list", "provisional"],
    titlePatterns: ["merit list", "select list", "provisional list", "first merit list"],
    keywords: ["merit list", "select list", "provisional", "first list", "cut off", "aggregate"],
  },
  admission_notice: {
    urlPatterns: ["admission", "apply", "registration", "enrollment"],
    titlePatterns: ["admission open", "admission notice", "apply now", "registration", "enrollment"],
    keywords: ["admission", "apply", "registration", "enrollment", "last date", "admission form"],
  },
  scholarship: {
    urlPatterns: ["scholarship", "financial-aid", "bursary"],
    titlePatterns: ["scholarship", "financial aid", "bursary", "stipend"],
    keywords: ["scholarship", "financial aid", "bursary", "stipend", "need based", "merit based"],
  },
  exam_schedule: {
    urlPatterns: ["exam-schedule", "examdate", "examination-schedule"],
    titlePatterns: ["exam schedule", "examination schedule", "exam dates"],
    keywords: ["exam schedule", "examination date", "paper starting", "exam starting"],
  },
  notification: {
    urlPatterns: ["notification", "notice", "announcement", "circular"],
    titlePatterns: ["notification", "notice", "announcement", "circular", "important"],
    keywords: ["notification", "notice", "announcement", "circular", "important notice"],
  },
  prospectus: {
    urlPatterns: ["prospectus", "brochure", "handbook"],
    titlePatterns: ["prospectus", "brochure", "handbook", "information手册"],
    keywords: ["prospectus", "brochure", "handbook", "program guide"],
  },
  other: {
    urlPatterns: [],
    titlePatterns: [],
    keywords: [],
  },
};

const TITLE_KEYWORD_WEIGHTS: Record<string, string[]> = {
  result: ["result", "declared", "announced", "nateeja"],
  date_sheet: ["date sheet", "datesheet", "schedule", "time table"],
  roll_number_slip: ["roll number", "admit card", "slip"],
  past_paper: ["past paper", "model paper", "old paper"],
  syllabus: ["syllabus", "curriculum", "course"],
  merit_list: ["merit list", "select list", "cut off"],
  admission_notice: ["admission", "apply", "register"],
  scholarship: ["scholarship", "financial aid", "stipend"],
};

export function classifyDocument(url: string, title: string, text: string): ClassifierResult {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  const textLower = text.toLowerCase().substring(0, 2000);

  const scores: Record<string, number> = {};

  for (const [type, patterns] of Object.entries(DOCUMENT_PATTERNS)) {
    if (type === "other") continue;

    let score = 0;

    for (const pattern of patterns.urlPatterns) {
      if (urlLower.includes(pattern)) score += 30;
    }

    for (const pattern of patterns.titlePatterns) {
      if (titleLower.includes(pattern)) score += 40;
    }

    for (const keyword of patterns.keywords) {
      if (textLower.includes(keyword)) score += 10;
    }

    scores[type] = score;
  }

  let bestType: DocumentType = "other";
  let bestScore = 0;

  for (const [type, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestType = type as DocumentType;
    }
  }

  const confidence = Math.min(100, bestScore);

  const keywords = TITLE_KEYWORD_WEIGHTS[bestType] || [];

  return {
    document_type: bestType,
    confidence,
    title,
    keywords,
  };
}

export function extractBoardFromUrl(url: string): string | null {
  const boardSlugs = [
    "lahore", "gujranwala", "rawalpindi", "faisalabad", "sargodha",
    "multan", "bahawalpur", "dg-khan", "sahiwal", "fbise", "fbise-islamabad",
    "abbottabad", "bannu", "di-khan", "kohat", "malakand", "mardan", "peshawar", "swat",
    "karachi", "hyderabad", "sukkur", "mirpurkhas", "larkana",
    "quetta", "ajk",
  ];

  const urlLower = url.toLowerCase();
  for (const slug of boardSlugs) {
    if (urlLower.includes(slug)) return slug;
  }
  return null;
}

export function extractClassLevel(text: string): string | null {
  const lower = text.toLowerCase();

  if (lower.includes("10th class") || lower.includes("class 10") || lower.includes("ssc-ii") || lower.includes("ssc part ii") || lower.includes("matric part ii")) {
    return "10";
  }
  if (lower.includes("9th class") || lower.includes("class 9") || lower.includes("ssc-i") || lower.includes("ssc part i") || lower.includes("matric part i")) {
    return "9";
  }
  if (lower.includes("matric") || lower.includes("ssc")) {
    return "matric";
  }
  if (lower.includes("inter") || lower.includes("hssc") || lower.includes("fsc") || lower.includes("11th") || lower.includes("12th") || lower.includes("1st year") || lower.includes("2nd year")) {
    return "intermediate";
  }
  return null;
}

export function extractYear(text: string): string | null {
  const matches = text.match(/\b(20[2-3]\d)\b/);
  return matches ? matches[1] : null;
}

export function extractSubject(text: string): string | null {
  const subjects = [
    "english", "urdu", "mathematics", "math", "physics", "chemistry",
    "biology", "computer science", "cs", "islamiat", "pakistan studies",
    "general science", "education", "economics", "geography", "history",
    "arabic", "pashto",
  ];

  const lower = text.toLowerCase();
  for (const subject of subjects) {
    if (lower.includes(subject)) return subject;
  }
  return null;
}
