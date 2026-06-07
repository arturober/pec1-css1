const lazyElements = document.querySelectorAll("img.lazy-load, iframe.lazy-load");

const elementObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;

      if (element.tagName === "IFRAME") {
        if (element.dataset.src) {
          element.src = element.dataset.src;
        }
      } 
      else if (element.tagName === "IMG") {
        const picture = element.parentElement;
        if (picture && picture.tagName === "PICTURE") {
          const sources = picture.querySelectorAll("source");
          sources.forEach(source => {
            if (source.dataset.srcset) source.srcset = source.dataset.srcset;
          });
        }
        if (element.dataset.srcset) element.srcset = element.dataset.srcset;
        if (element.dataset.src) element.src = element.dataset.src;
      }

      observer.unobserve(element);
    }
  });
}, {
  rootMargin: "0px 0px 300px 0px", 
  threshold: 0
});

lazyElements.forEach(el => elementObserver.observe(el));
