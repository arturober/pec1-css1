const { Optimizer } = require('@parcel/plugin');
const { replaceURLReferences, blobToString } = require('@parcel/utils');

module.exports = new Optimizer({
  async optimize({ bundle, bundleGraph, contents, map }) {
    const contentsStr = await blobToString(contents);
    const replaced = replaceURLReferences({
      bundle,
      bundleGraph,
      contents: contentsStr,
    });
    return {
      contents: replaced.contents,
      map,
    };
  }
});
