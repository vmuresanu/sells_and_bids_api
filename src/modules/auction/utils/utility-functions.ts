import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export function constructFilters(filters) {
  let filterObject = {
    ...vehicleStateTransformer(filters.simpleFilters.vehicleState),
    ...startEndYearTransformer(filters.simpleFilters.fromYear, filters.simpleFilters.toYear),
    ...mileageTransformer(filters.simpleFilters.mileage),
  };

  return makeModelTransformer(filters.makeModels, filterObject);
}

export function makeModelTransformer(makeModels: string, filterObject) {
  let resultArray = [];
  if (!makeModels) {
    return filterObject;
  }
  const a = makeModels.split(',');
  a.forEach(e => {
    let arr = e.split('+');
    if (arr[1]) {
      return resultArray.push({ make: arr[0], model: arr[1], ...filterObject });
    }
    return resultArray.push({ make: arr[0], ...filterObject });
  });
  return resultArray;
}

export function startEndYearTransformer(startYear: string, endYear: string) {
  if (!startYear && !endYear) {
    return;
  }
  if (!startYear && endYear) {
    return { year: LessThanOrEqual(endYear) };
  } else if (startYear && !endYear) {
    return { year: MoreThanOrEqual(startYear) };
  } else {
    return { year: Between(startYear, endYear) };
  }
}

export function mileageTransformer(mileage) {
  if (!mileage) {
    return;
  }
  return { mileage: LessThanOrEqual(mileage) }
}

export function vehicleStateTransformer(vehicleState) {
  if (!vehicleState) {
    return;
  }
  return { vehicleState }
}
