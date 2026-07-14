export class HeaderNormalizer {
  normalize(header: string): string {
    return header
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  normalizeHeaders(
    headers: string[]
  ): string[] {
    return headers.map((header) =>
      this.normalize(header)
    );
  }
}

export const headerNormalizer =
  new HeaderNormalizer();