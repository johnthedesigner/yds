import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

const ProductFilters = ({ options, queryTags, type }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = (options) => {
    if (options.length === 0) {
      router.push(pathname);
    } else {
      let tagsConcatenated = _.concat(options);
      router.push(`${pathname}?tags=${tagsConcatenated}`);
    }
  };

  useEffect(() => {
    let tagsConcatenated = queryString.parse(query).tags;
    if (tagsConcatenated) {
      let tags = tagsConcatenated.split(",");
      updateFilters(tags);
    }
  }, [query, updateFilters]);

  const FilterGroup = ({ option, optionKey, selected }) => {
    const [groupExpanded, setGroupExpanded] = useState(false);

    // Get keys for facets, and shorten the list unless expanded
    const facetKeys = _.keys(option);
    var displayedFacetKeys = [];
    if (Object.keys(facetKeys).length > 5 && !groupExpanded) {
      displayedFacetKeys = _.take(facetKeys, 5);
    } else {
      displayedFacetKeys = facetKeys;
    }

    // Get the right set of facets to display
    const displayedFacets = {};
    _.each(displayedFacetKeys, (key) => {
      displayedFacets[key] = option[key];
    });

    // Hide the show more button when it's not needed
    const expandStyles = {
      display: groupExpanded || option.length <= 5 ? "none" : "block",
    };

    return (
      <div className="product-filters__set">
        <h4 className="product-filters__group-name">{optionKey}</h4>
        {_.map(displayedFacets, (facet, facetKey) => {
          let tag = `${optionKey}-${facetKey}`;
          return (
            <div key={facetKey} className="product-filters__facet">
              <label className="product-filters__label" htmlFor={tag}>
                <input
                  className="product-filters__checkbox"
                  name={tag}
                  type="checkbox"
                  checked={_.includes(queryTags, tag)}
                  onChange={() => {
                    let nextTags = _.xor([tag], queryTags);
                    updateFilters(nextTags);
                  }}
                />
                <span className="product-filters__facet-text">{facet}</span>
              </label>
            </div>
          );
        })}
        <p
          style={expandStyles}
          className="product-filters__expand"
          onClick={() => setGroupExpanded(true)}>
          Show more...
        </p>
      </div>
    );
  };

  // Variations for mobile vs. desktop
  if (type === "mobile") {
    // Mobile Version
    return (
      <div className="product-filters--mobile">
        <div
          className="product-filters__mobile-header"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
          <p className="product-filters__mobile-title">Apply Product Filters</p>
          <button
            className="product-filters__mobile-close-button"
            onClick={() => setMobileFiltersOpen(false)}
            style={{ display: mobileFiltersOpen ? "inline-block" : "none" }}>
            <b>×</b> Close
          </button>
        </div>
        <div
          className="product-filters__mobile-body"
          style={{ height: mobileFiltersOpen ? "80vh" : "0vh" }}>
          <button
            className="button product-filters__clear-button"
            onClick={() => {
              updateFilters([]);
            }}>
            Clear Filters
          </button>
          {_.map(options, (option, optionKey) => {
            return (
              <FilterGroup
                key={optionKey}
                option={option}
                optionKey={optionKey}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    // Desktop Version
    return (
      <div className="product-filters">
        <h4>Filter Options</h4>
        <button
          className="product-filters__clear-button"
          onClick={() => {
            updateFilters([]);
          }}>
          Clear Filters
        </button>
        {_.map(options, (option, optionKey) => {
          return (
            <FilterGroup
              key={optionKey}
              option={option}
              optionKey={optionKey}
            />
          );
        })}
      </div>
    );
  }
};

export default ProductFilters;
