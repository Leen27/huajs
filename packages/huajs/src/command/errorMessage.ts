enum types {
    UN_IMPLEMENTATION = 1,
    NO_COMPONENT_NAME
}

const messages = {
  [types.UN_IMPLEMENTATION]: 'Should implement a method: ',
  [types.NO_COMPONENT_NAME]: 'Should set a component name',
};

const map = {
  UN_IMPLEMENTATION(methodName: string) {
    return messages[types.UN_IMPLEMENTATION] + methodName;
  },
  NO_COMPONENT_NAME() {
    return messages[types.NO_COMPONENT_NAME];
  },
};

export default {
  types,

  create(type: key, ...args: any[]) {
    type = type.toLowerCase();
    const func = map[type];

    return func(...args);
  },
};
