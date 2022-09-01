const a = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
          },
          {
            id: 4,
            children: [
              {
                id: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    children: [
      {
        id: 7,
        children: [
          {
            id: 8,
          },
          {
            id: 9,
            children: [
              {
                id: 10,
              },
            ],
          },
        ],
      },
    ],
  },
];

const res: string[] = [];
// Object.getOwnPropertyNames
function getPropertyPath(
  demo: Record<string, any[] | Record<string, any> | string | number> | any[],
  prefixPath: string,
  res: string[]
) {
  if (Array.isArray(demo)) {
    demo.forEach((item, index) =>
      getPropertyPath(item, `${prefixPath}[${index}]`, res)
    );
  } else if (Object.prototype.toString.call(demo) === "[object Object]") {
    Object.entries(demo).forEach(([key]: [string, any]) => {
      getPropertyPath(
        (demo as Record<string, any>)[key],
        `${prefixPath}.${key}`,
        res
      );
    });
  } else {
    res.push(prefixPath);
  }
}
getPropertyPath(
  {
    a: 1,
    b: [{ a: 1 }],
  },
  "a",
  res
);
console.log(res);
