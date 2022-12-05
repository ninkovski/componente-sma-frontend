export class PageSearch {
	
    constructor(
    	public current_page: number,
	    public page_size:    number,
	    public last_page:    number,
	    public search?:      string,
	    public ordering?:    string){}

    static inicial(search: string, page_size: number,){
    	return new PageSearch(
    		1, 
    		page_size, 
    		1, 
    		search,
    		""
    	);
    }
}

export class PageLimit {
    
    constructor(
        public limit:    number,
        public search?:      string,
        public ordering?:    string){}

    static inicial(search: string, limit: number,ordering:string){
        return new PageLimit(
            limit, 
            search,
            ordering
        );
    }
}