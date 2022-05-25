import {
  getFirestore,
  DocumentData,
  QueryDocumentSnapshot,
  FirestoreDataConverter,
  WithFieldValue,
  SnapshotOptions,
} from 'firebase/firestore';

import { app } from '.';
import _ from 'lodash';

export const firestore = getFirestore(app);

export const createConverter = function <T>() {
  type K = T & QueryDocumentSnapshot;

  const converter: FirestoreDataConverter<K> = {
    toFirestore(entity: WithFieldValue<K>): DocumentData {
      return _.omit(entity, 'id', 'ref');
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): K {
      const data = snapshot.data(options) as T;
      return {
        ...data,
        ...snapshot,
      };
    },
  };
  return converter;
};
