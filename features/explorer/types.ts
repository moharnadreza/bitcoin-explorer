export type SearchQueryType = 'ADDRESS' | 'TRANSACTION';

export type SearchQueryForm = {
  searchQuery: string;
};

export type SearchQuerySubmitParams = {
  searchQuery: SearchQueryForm['searchQuery'];
  type?: SearchQueryType;
};
