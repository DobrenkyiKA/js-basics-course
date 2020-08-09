/**
 * Array to List
 */
export const arrayToList = (array) => {
  let list = {};
  if (array.length === 1) {
    list.value = array[array.length - 1];
    list.rest = null;
    return list;
  }
  list.value = array[0];
  array.splice(0, 1);
  list.rest = arrayToList(array);
  return list;
};
export const listToArray = (list) => {
  let array = [];
  if (list === null) {
    return array;
  } else {
    array.push(list.value);
    return array.concat(listToArray(list.rest));
  }
};

/**
 * Keys and values to list
 */
export const getKeyValuePairs = (object) => {
  return Object.entries(object);
};

/**
 * Invert keys and values
 */
export const invertKeyValue = (object) => {
  let invertedObject = {};
  Object.entries(object).
      forEach(entryArray => invertedObject[entryArray[1]] = entryArray[0]);
  return invertedObject;
};

/**
 * Get all methods from object
 */
export const getAllMethodsFromObject = (object) => {
  return Object.getOwnPropertyNames(object).
      filter(propertyAsString => propertyAsString.toUpperCase() !==
          propertyAsString);
};

/**
 * Groups
 */
export class Groups {
  values = []
  length = this.values.length;

  add(value) {
    if (this.has(value)) {
      return;
    }
    this.values.push(value);
    this.length++;
}

  delete(value) {
    if (this.has(value)) {
      this.values.splice(this.values.indexOf(value), 1);
      this.length--;
      return true;
    }
    return false;
  }

  has(value) {
    return this.values.indexOf(value) > -1;
  }

  static from(object) {
    const group = new Groups();
    object.forEach((a) => group.add(a));
    return group;
  }
}
