import DTO_Search from "../../DTOs/dto_search";
import DTO_SearchResult from "../../DTOs/dto_searchResult";

export default interface Search {
    search(_search: DTO_Search): Promise<DTO_SearchResult>;
}