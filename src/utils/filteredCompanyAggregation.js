export const buildCompanyCountAggregation = ({
  search = "",
  location = "",
  tags = [],
}) => {
  const filter = {};

  if (search.trim()) {
    filter.name = { $regex: search.trim(), $options: "i" };
  }

  if (location.trim()) {
    filter.location = { $regex: location.trim(), $options: "i" };
  }

  if (Array.isArray(tags) && tags.length > 0) {
    filter.tags = { $in: tags };
  }

  return [{ $match: filter }];
};
