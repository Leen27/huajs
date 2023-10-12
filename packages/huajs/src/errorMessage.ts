enum types {
    UN_IMPLEMENTATION = 1,
    NO_COMPONENT_NAME,
    ISLOCK,
    UNDO_FAILED
}

const messages = {
  [types.UN_IMPLEMENTATION]: 'Should implement a method: ',
  [types.NO_COMPONENT_NAME]: 'Should set a component name',
  [types.ISLOCK]: '无法运行指令，因为已经锁住',
  [types.UNDO_FAILED]: '撤销失败',
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

  messages,

  create(type: keyof typeof map, ...rest: any) {
    const func = map[type];

    //@ts-ignore
    return func(...rest);
  },
};
