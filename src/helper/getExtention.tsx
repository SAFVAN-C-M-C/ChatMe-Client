export function getFileExtension(url: string): string | null {
    const matches = url.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
    return matches ? matches[1] : null;
}