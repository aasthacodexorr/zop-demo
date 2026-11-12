import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter/src/TypesenseInstantsearchAdapter";

export const typesenseInstantsearchAdapter = (apiKey) => {
  const appConfig = useAppConfig();

  const { inventory_search_only_key, typesense_host, typesense_port, typesense_protocol } = appConfig.site;
  return new TypesenseInstantSearchAdapter({
    server: {
      apiKey: apiKey || inventory_search_only_key,
      nodes: [
        {
          host: typesense_host || "localhost",
          port: parseInt(typesense_port || "8108"),
          protocol: typesense_protocol || "http",
        },
      ],
    },
    additionalSearchParameters: {
      query_by: "make,model,year_search,trim,vin,stock_no,exterior_color",
      num_typos: 0,
    },
  });
};
