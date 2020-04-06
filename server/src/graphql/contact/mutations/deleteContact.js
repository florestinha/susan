export default async (
  _,
  args,
  {
    dataSources,
  },
) => {
  const result = await dataSources.contact.del(args.input);
  return {
    count: result
  };
};
