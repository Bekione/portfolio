import { z } from "zod";

/**
 * Curated list of common words and inquiry terms.
 * Legitimate project inquiries, job opportunities, or messages will almost always
 * contain at least one or two of these terms or stems.
 */
const COMMON_COMMUNICATION_WORDS = new Set([
  // Greetings
  "hi", "hello", "hey", "dear", "greetings", "morning", "afternoon", "evening",
  // Inquiry & Business
  "project", "proposal", "inquiry", "question", "help", "need", "build", "create",
  "develop", "work", "website", "web", "app", "application", "site", "system",
  "service", "services", "design", "software", "backend", "frontend", "fullstack",
  "freelance", "hire", "hiring", "job", "contract", "client", "company", "team",
  "business", "collaborate", "collaboration", "partner", "partnership", "offer",
  "budget", "rate", "rates", "price", "cost", "timeline", "estimate", "schedule",
  "meet", "meeting", "call", "discuss", "discussion", "talk", "chat", "reach",
  "out", "regarding", "about", "portfolio", "resume", "bereket", "developer",
  "engineer", "opportunity", "role", "position", "stack", "tech", "react", "next",
  "node", "typescript", "javascript", "python", "api", "database", "ui", "ux",
  // Common grammatical & connector words
  "i", "we", "you", "your", "our", "my", "me", "us", "they", "them", "he", "she",
  "would", "like", "want", "hope", "thank", "thanks", "please", "appreciate",
  "let", "know", "looking", "interested", "hear", "from", "with", "have", "has",
  "can", "could", "will", "are", "is", "was", "were", "be", "been", "this",
  "that", "these", "those", "for", "of", "the", "and", "in", "on", "at", "to",
  "it", "as", "am", "do", "does", "did", "so", "if", "or", "by", "an", "any",
  "all", "new", "good", "great", "best", "well", "some", "more", "time", "day",
  "week", "month", "soon", "possible", "information", "details", "contact"
]);

/**
 * Checks for 3 or more identical characters in a row (e.g. "aaaa", "kkkkkk", "ddddddd").
 * Valid human text in western languages practically never has 3 identical consecutive letters.
 */
export const hasConsecutiveRepeats = (text: string, limit = 2): boolean => {
  const regex = new RegExp(`(.)\\1{${limit},}`, "i");
  return regex.test(text);
};

/**
 * Checks for repeated short patterns (e.g. "kfjakfjakfja", "fjadfjadfjad").
 */
export const hasRepeatedPatterns = (text: string): boolean => {
  return /(.{2,6})\1{2,}/i.test(text);
};

/**
 * Checks if a string contains too many structural/code characters.
 */
export const hasSuspiciousSymbols = (text: string, maxAllowed = 2): boolean => {
  const symbols = text.match(/['";[\]{}|\\`~<>]/g) || [];
  return symbols.length > maxAllowed;
};

/**
 * Checks if a text has any non-Latin scripts (e.g., Ethiopic/Amharic, Arabic, CJK, Cyrillic).
 * If non-Latin characters are present, we avoid enforcing English-only dictionary heuristics.
 */
export const hasNonLatinScript = (text: string): boolean => {
  return /[\u1200-\u137F\u0400-\u04FF\u0600-\u06FF\u4E00-\u9FFF]/.test(text);
};

/**
 * Validates whether a Name input is realistic:
 * - No 3+ consecutive repeated characters (e.g. "aaaaaa", "kkkkk")
 * - No single word exceeding 20 characters (e.g. "uioaufeopiFPOifoawjfdkajfa")
 * - No long consonant runs (e.g. "jfdk", "kfj")
 * - Reasonable vowel balance if Latin
 */
export const validateNameString = (name: string): { valid: boolean; message?: string } => {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters" };
  }
  if (trimmed.length > 70) {
    return { valid: false, message: "Name cannot exceed 70 characters" };
  }

  // Allowed characters: letters, spaces, standard name punctuation
  if (!/^[a-zA-Z\s.'\-\u00C0-\u024F\u1200-\u137F]+$/.test(trimmed)) {
    return { valid: false, message: "Name can only contain letters, hyphens, and apostrophes" };
  }

  // Check repeated letters (e.g. "dkfjafkjkkkkkkk...")
  if (hasConsecutiveRepeats(trimmed, 2)) {
    return { valid: false, message: "Name contains unnatural repeated characters" };
  }

  // Check repeated patterns
  if (hasRepeatedPatterns(trimmed)) {
    return { valid: false, message: "Name contains repeated character patterns" };
  }

  // Word length check: individual words in names should not exceed 20 characters
  const words = trimmed.split(/[\s-]+/);
  for (const word of words) {
    if (word.length > 20) {
      return { valid: false, message: "Name contains an unusually long unbroken word (max 20 characters per name part)" };
    }
  }

  // If Latin letters, verify vowel presence and consonant clusters
  if (!hasNonLatinScript(trimmed)) {
    const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (lettersOnly.length >= 5) {
      // 4 or more consonants in a row without vowels
      if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(lettersOnly)) {
        return { valid: false, message: "Name contains unpronounceable consonant clusters" };
      }

      // Check vowel ratio
      const vowels = lettersOnly.match(/[aeiou]/g)?.length || 0;
      const ratio = vowels / lettersOnly.length;
      if (ratio < 0.18 || ratio > 0.85) {
        return { valid: false, message: "Please enter a valid, recognizable human name" };
      }
    }
  }

  return { valid: true };
};

/**
 * Recognized and standard top-level domains.
 */
const KNOWN_TLDS = new Set([
  "com", "org", "net", "edu", "gov", "mil", "io", "co", "dev", "me", "ai", "app",
  "tech", "info", "xyz", "biz", "design", "agency", "online", "site", "store", "pro",
  "live", "cloud", "digital", "space", "top", "link", "club", "vip", "work", "zone",
  "shop", "ltd", "press", "global", "media", "world", "center", "email", "life",
  "today", "news", "group", "solutions", "services", "expert", "software", "systems",
  "network", "studio", "cc", "tv", "fm", "so", "to"
]);

/**
 * Validates Email string with strict RFC formatting and anti-mash checks.
 */
export const validateEmailString = (email: string): { valid: boolean; message?: string } => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, message: "Email is required" };
  }
  if (trimmed.length > 255) {
    return { valid: false, message: "Email address is too long" };
  }

  // Strict email regex forbidding semicolons, quotes, brackets, and ensuring valid domain structure
  const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!strictEmailRegex.test(trimmed)) {
    return { valid: false, message: "Please provide a valid email address (e.g. name@company.com)" };
  }

  const [prefix, domain] = trimmed.split("@");
  if (!prefix || !domain) {
    return { valid: false, message: "Please provide a valid email address" };
  }

  // Check prefix for illegal characters
  if (/[;'"[\]{}<>\\]/.test(prefix)) {
    return { valid: false, message: "Email prefix contains forbidden characters" };
  }

  // Check repeated characters in prefix (e.g. "zzzzzzzzzzzz")
  if (hasConsecutiveRepeats(prefix, 2)) {
    return { valid: false, message: "Email prefix contains unnatural repeated characters" };
  }

  // Prefix anti-mash check
  const prefixLetters = prefix.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (prefixLetters.length >= 6) {
    // Check for 4 or more consonants in a row (e.g. "JHDFLKJFH")
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(prefixLetters)) {
      return { valid: false, message: "Email address appears to be random keyboard mash" };
    }
    // Check vowel balance
    const vowels = prefixLetters.match(/[aeiou]/g)?.length || 0;
    if (vowels / prefixLetters.length < 0.15) {
      return { valid: false, message: "Email address prefix must resemble a valid name or identifier" };
    }
  }

  // Domain structure checks
  const parts = domain.toLowerCase().split(".");
  const tld = parts[parts.length - 1];

  // TLD must be either a 2-letter country code (e.g. .io, .co, .uk, .de, .et) or a recognized TLD
  const isCountryCode = /^[a-z]{2}$/.test(tld);
  if (!isCountryCode && !KNOWN_TLDS.has(tld)) {
    return { valid: false, message: `Email domain has an unrecognized top-level domain (.${tld})` };
  }

  // Domain name (first part) check: e.g. "djkfakfj"
  const domainName = parts[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (domainName.length >= 5) {
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(domainName)) {
      return { valid: false, message: "Email domain contains unpronounceable consonant clusters" };
    }
    const domVowels = domainName.match(/[aeiou]/g)?.length || 0;
    if (domVowels / domainName.length < 0.18) {
      return { valid: false, message: "Email domain appears to be random keyboard mash" };
    }
  }

  return { valid: true };
};

/**
 * Validates Subject string:
 * - Min 3, max 150 characters
 * - No excessive suspicious symbols
 * - No consecutive repeated characters
 * - Max unbroken word <= 25 characters
 * - No unpronounceable consonant clusters
 * - Recognizable communication words / natural language presence
 */
export const validateSubjectString = (subject: string): { valid: boolean; message?: string } => {
  const trimmed = subject.trim();
  if (trimmed.length < 3) {
    return { valid: false, message: "Subject must be at least 3 characters" };
  }
  if (trimmed.length > 150) {
    return { valid: false, message: "Subject cannot exceed 150 characters" };
  }

  if (hasSuspiciousSymbols(trimmed, 2)) {
    return { valid: false, message: "Subject contains too many special punctuation characters" };
  }

  if (hasConsecutiveRepeats(trimmed, 2)) {
    return { valid: false, message: "Subject contains unnatural repeated characters" };
  }

  if (hasRepeatedPatterns(trimmed)) {
    return { valid: false, message: "Subject contains repeated character sequences" };
  }

  const words = trimmed.split(/\s+/);
  for (const word of words) {
    if (word.length > 25) {
      return { valid: false, message: "Subject contains an unusually long unbroken word (max 25 characters)" };
    }
  }

  // Anti-mash & natural language validation for Latin text
  if (!hasNonLatinScript(trimmed)) {
    const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, "").toLowerCase();
    
    // Check consonant clusters in individual words (e.g. "jjhdjahfjjhdf")
    // Split sub-words on hyphens or slashes (e.g. "Full-stack", "Contract // Architecture")
    const subWords = trimmed
      .toLowerCase()
      .split(/[\s\-/\\_]+/)
      .filter((w) => w.length >= 3);

    for (const w of subWords) {
      // If it's a known common/tech word, it's valid
      if (COMMON_COMMUNICATION_WORDS.has(w)) continue;

      // 5 or more consonants in a row without vowels in an unknown word
      if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(w)) {
        return { valid: false, message: "Subject contains unpronounceable words or keyboard mash" };
      }

      // Check single unknown word vowel ratio (e.g. "jjhdjahfjjhdf" has 1 vowel out of 13 letters)
      if (w.length >= 6) {
        const wVowels = w.match(/[aeiou]/g)?.length || 0;
        if (wVowels / w.length < 0.15) {
          return { valid: false, message: "Subject contains unpronounceable words or keyboard mash" };
        }
      }
    }

    // Overall vowel ratio check
    if (lettersOnly.length >= 8) {
      const vowels = lettersOnly.match(/[aeiou]/g)?.length || 0;
      const ratio = vowels / lettersOnly.length;
      if (ratio < 0.18 || ratio > 0.85) {
        return { valid: false, message: "Subject appears to be random text. Please enter a meaningful title" };
      }
    }

    // Check recognizable vocabulary in multi-word or long subjects
    const cleanWords = trimmed
      .toLowerCase()
      .split(/[\s\-/\\_]+/)
      .filter((w) => w.length >= 2);

    if (cleanWords.length >= 2 || trimmed.length >= 15) {
      const recognizableCount = cleanWords.filter((w) => COMMON_COMMUNICATION_WORDS.has(w)).length;
      if (recognizableCount === 0) {
        return {
          valid: false,
          message: "Please enter a meaningful subject line describing your project or inquiry",
        };
      }
    }
  }

  return { valid: true };
};

/**
 * Validates Message body:
 * - Min 15, max 3000 characters
 * - No 3+ consecutive repeated characters (e.g. "dddddddddddd")
 * - No unbroken token > 28 characters (unless valid URL)
 * - Must contain recognizable natural language / common inquiry words (if Latin)
 */
export const validateMessageString = (message: string): { valid: boolean; message?: string } => {
  const trimmed = message.trim();
  if (trimmed.length < 15) {
    return { valid: false, message: "Message must be at least 15 characters to provide adequate context" };
  }
  if (trimmed.length > 3000) {
    return { valid: false, message: "Message cannot exceed 3000 characters" };
  }

  if (hasSuspiciousSymbols(trimmed, 5)) {
    return { valid: false, message: "Message contains too many structural characters like brackets or semicolons" };
  }

  if (hasConsecutiveRepeats(trimmed, 2)) {
    return { valid: false, message: "Message contains unnatural repeated characters (e.g. 'aaaa', 'ddddd')" };
  }

  if (hasRepeatedPatterns(trimmed)) {
    return { valid: false, message: "Message contains repeated character sequences" };
  }

  // Token length check: words shouldn't exceed 28 characters unless it's a URL
  const tokens = trimmed.split(/\s+/);
  for (const token of tokens) {
    if (token.startsWith("http://") || token.startsWith("https://")) continue;
    if (token.length > 28) {
      return { valid: false, message: "Message contains unusually long words without spaces (max 28 characters per word)" };
    }
  }

  // Check unique characters
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, "")).size;
  if (uniqueChars < 5 && trimmed.length > 15) {
    return { valid: false, message: "Message contains too few unique characters" };
  }

  // Check natural language / recognizable words (if Latin text)
  if (!hasNonLatinScript(trimmed)) {
    const cleanWords = trimmed
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 2);

    if (cleanWords.length >= 2) {
      // Count how many words match common communication words
      const recognizableCount = cleanWords.filter((w) => COMMON_COMMUNICATION_WORDS.has(w)).length;
      
      // If none of the words match any common words and text is > 25 chars, it's keyboard mash
      if (recognizableCount === 0 && trimmed.length > 25) {
        return {
          valid: false,
          message: "Please write a coherent message with recognizable words describing your project or question",
        };
      }
    }
  }

  return { valid: true };
};

/**
 * Unified Zod schema for contact inquiry form validation.
 */
export const contactSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(70, "Name cannot exceed 70 characters")
    .superRefine((val, ctx) => {
      const res = validateNameString(val);
      if (!res.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.message || "Please enter a valid, recognizable name",
        });
      }
    }),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .max(255, "Email address is too long")
    .superRefine((val, ctx) => {
      const res = validateEmailString(val);
      if (!res.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.message || "Please provide a valid email address",
        });
      }
    }),

  subject: z
    .string({ error: "Subject is required" })
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject cannot exceed 150 characters")
    .superRefine((val, ctx) => {
      const res = validateSubjectString(val);
      if (!res.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.message || "Please provide a meaningful subject line",
        });
      }
    }),

  message: z
    .string({ error: "Message is required" })
    .trim()
    .min(15, "Message must be at least 15 characters to provide context")
    .max(3000, "Message cannot exceed 3000 characters")
    .superRefine((val, ctx) => {
      const res = validateMessageString(val);
      if (!res.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.message || "Please write a coherent message text",
        });
      }
    }),

  token: z.string().optional(),
  honeypot: z.string().optional().default(""),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
