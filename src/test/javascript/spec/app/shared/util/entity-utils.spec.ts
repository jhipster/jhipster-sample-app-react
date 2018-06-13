import { cleanEntity } from 'app/shared/util/entity-utils';

describe('Entity utils', () => {
  describe('cleanEntity', () => {
    it('should not remove fields with an id', () => {
      const entityA = {
        a: {
          id: 5
        }
      };
      const entityB = {
        a: {
          id: '5'
        }
      };

      expect(cleanEntity({ ...entityA })).toEqual(entityA);
      expect(cleanEntity({ ...entityB })).toEqual(entityB);
    });

    it('should remove fields with an empty id', () => {
      const entity = {
        a: {
          id: ''
        }
      };

      expect(cleanEntity({ ...entity })).toEqual({});
    });

    it('should not remove fields that are not objects', () => {
      const entity = {
        a: '',
        b: 5,
        c: [],
        d: '5'
      };

      expect(cleanEntity({ ...entity })).toEqual(entity);
    });
  });
});
