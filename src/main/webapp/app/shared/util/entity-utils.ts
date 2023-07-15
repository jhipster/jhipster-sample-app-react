import pick from 'lodash/pick';
import { IPaginationBaseState, ISortBaseState } from 'react-jhipster';

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) => idList.filter((id: any) => id !== '').map((id: any) => ({ id }));

export const overrideSortStateWithQueryParams = (paginationBaseState: ISortBaseState, locationSearch: string) => {
  const params = new URLSearchParams(locationSearch);
  const sort = params.get('sort');
  if (sort) {
    const sortSplit = sort.split(',');
    paginationBaseState.sort = sortSplit[0];
    paginationBaseState.order = sortSplit[1];
  }
  return paginationBaseState;
};

export const overridePaginationStateWithQueryParams = (paginationBaseState: IPaginationBaseState, locationSearch: string) => {
  const sortedPaginationState: IPaginationBaseState = <IPaginationBaseState>(
    overrideSortStateWithQueryParams(paginationBaseState, locationSearch)
  );
  const params = new URLSearchParams(locationSearch);
  const page = params.get('page');
  if (page) {
    sortedPaginationState.activePage = +page;
  }
  return sortedPaginationState;
};
