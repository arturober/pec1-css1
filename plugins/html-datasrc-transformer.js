const { Transformer } = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({ asset }) {
    let code = await asset.getCode();
    let isDirty = false;

    // 1. Process data-src and data-background-image attributes
    const srcRegex = /(data-src|data-background-image)=["']([^"']+)["']/g;
    code = code.replace(srcRegex, (match, attrName, url) => {
      const decodedUrl = url.replace(/&amp;/g, '&').trim();
      if (decodedUrl.startsWith('.') || decodedUrl.startsWith('/')) {
        const placeholder = asset.addURLDependency(decodedUrl);
        isDirty = true;
        return `${attrName}="${placeholder}"`;
      }
      return match;
    });

    // 2. Process data-srcset attributes (supports multiline and multiple spaces)
    const srcsetRegex = /data-srcset=["']([^"']+)["']/g;
    code = code.replace(srcsetRegex, (match, srcset) => {
      const parts = srcset.split(',').map(part => {
        const trimmed = part.trim();
        const tokens = trimmed.split(/\s+/);
        if (tokens.length > 0) {
          const url = tokens[0];
          const decodedUrl = url.replace(/&amp;/g, '&');
          if (decodedUrl.startsWith('.') || decodedUrl.startsWith('/')) {
            const placeholder = asset.addURLDependency(decodedUrl);
            tokens[0] = placeholder;
            isDirty = true;
          }
        }
        return tokens.join(' ');
      });
      return `data-srcset="${parts.join(', ')}"`;
    });

    if (isDirty) {
      asset.setCode(code);
    }
    return [asset];
  }
});
