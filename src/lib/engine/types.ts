export type SourceCategory = "board" | "university" | "hec" | "scholarship_portal" | "government" | "other";
export type SourceStatus = "active" | "paused" | "disabled" | "error";
export type CrawlFrequency = "hourly" | "6h" | "12h" | "daily" | "weekly";
export type DocumentType = "result" | "date_sheet" | "roll_number_slip" | "past_paper" | "syllabus" | "model_paper" | "merit_list" | "admission_notice" | "scholarship" | "exam_schedule" | "notification" | "prospectus" | "other";
export type VerificationStatus = "new" | "pending_review" | "verified" | "published" | "needs_correction" | "outdated" | "archived" | "rejected";
export type ContentType = "html" | "pdf" | "image" | "json";

export interface CrawlSourceConfig {
  _id?: string;
  name: string;
  slug: string;
  organization: string;
  country: string;
  province: string;
  education_level: string;
  category: SourceCategory;
  official_website: string;
  urls: {
    results?: string;
    date_sheets?: string;
    roll_number_slips?: string;
    past_papers?: string;
    syllabus?: string;
    admissions?: string;
    scholarships?: string;
    announcements?: string;
    merit_lists?: string;
  };
  status: SourceStatus;
  crawl_frequency: CrawlFrequency;
  last_checked?: Date;
  last_successful_crawl?: Date;
  last_content_change?: Date;
  http_status?: number;
  parser_status?: string;
  verification_status: string;
  error_count: number;
  last_error?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CrawledDocumentConfig {
  source_id: string;
  source_name: string;
  url: string;
  title: string;
  document_type: DocumentType;
  content_type: ContentType;
  content_hash: string;
  raw_content?: string;
  extracted_text?: string;
  file_size?: number;
  http_status: number;
  detected_at: Date;
  content_changed: boolean;
  previous_hash?: string;
  verification_status: VerificationStatus;
  confidence_score: number;
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: Date;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ExtractedDataConfig {
  document_id: string;
  source_id: string;
  data_type: DocumentType;
  board?: string;
  class_level?: string;
  subject?: string;
  year?: string;
  structured_data: Record<string, unknown>;
  raw_text?: string;
  verification_status: VerificationStatus;
  confidence_score: number;
  published_page_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface DataVersionConfig {
  entity_type: string;
  entity_id: string;
  field_name: string;
  previous_value: string;
  new_value: string;
  changed_at: Date;
  source?: string;
  verified_by?: string;
}

export interface CrawlJob {
  source_id: string;
  source_name: string;
  url: string;
  crawl_frequency: CrawlFrequency;
  last_checked?: Date;
  priority: number;
}

export interface CrawlResult {
  success: boolean;
  url: string;
  status_code: number;
  content_hash: string;
  content_changed: boolean;
  new_documents: number;
  error?: string;
  duration_ms: number;
}

export interface ExtractedInfo {
  document_type: DocumentType;
  title: string;
  board?: string;
  class_level?: string;
  subject?: string;
  year?: string;
  date?: string;
  confidence: number;
  structured_data: Record<string, unknown>;
}

export interface ClassifierResult {
  document_type: DocumentType;
  confidence: number;
  title: string;
  keywords: string[];
}
