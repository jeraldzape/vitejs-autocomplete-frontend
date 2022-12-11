<template>
    <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <div class="w-100 header-wrapper p-3 pb-0">
            <div class="container">
                <div class="jumbotron text-center text-white py-4">
                    <h1>Books Directory</h1>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
            </div>
            <div class="search-wrapper mx-auto position-relative">
                <form class="form-inline" @submit="doSubmit">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="searchQuery" @focus="lookAheadState = true" @input="doSearch()"
                            autocomplete="off" placeholder="Type book title or author here" required>
                            <button type="submit">
                                <i class="icon icon-search"></i>
                            </button>
                    </div>
                </form>
                <div v-if="lookAheadState && booksLookAhead.length > 0"
                    class="search-wrapper__suggestions w-100 bg-white text-left">
                    <ul class="list-unstyled mb-0 w-100 h-100 overflow-auto scrollable">
                        <li @click="setSearch(book.name.toLowerCase())" v-for="book in booksLookAhead" v-html="highlightQuery(book.name)"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex-fill h-100 w-100 px-3 pb-3 pt-5 results-wrapper overflow-auto scrollable">
            <div class="container h-100 position-relative">
                <ul class="list-unstyled text-left d-flex flex-row flex-wrap justify-content-start p-2 position-relative">
                    <li class="result-item overflow-hidden" v-for="book in books">
                        <div class="card border-0">
                            <div class="card-body">
                                <h6 class="card-title">{{ book.name }}</h6>
                                <p class="card-text small text-muted"><i>by: {{ book.author }}</i></p>
                                <!-- <a href="javascript:" class="btn btn-primary">Read</a> -->
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            searchQuery: '',
            lookAheadState: false,
            booksLookAhead: [],
            books: [],
            state: {
                isSearching: false,
                searchTimer: null
            }
        }
    },
    methods: {
        doSubmit(e) {
            e.preventDefault()
            this.lookAheadState = false
            this.books = this.booksLookAhead
        },
        setSearch(value){
            this.searchQuery = value
            this.lookAheadState = false
            this.getBooks(-1)
        },
        doSearch() {
            if(!this.searchQuery){
                return false
            }
            this.lookAheadState = true

            if (this.state.searchTimer) {
                clearTimeout(this.state.searchTimer);
            }
            this.state.searchTimer = setTimeout(() => {
                this.getBooks(10)
            }, 300);
        },
        highlightQuery(query){
            let regex = new RegExp(this.searchQuery, 'ig')
            return query.toLowerCase().replace(regex, '<b>$&</b>')
        },
        getBooks(limit) {
            fetch('http://127.0.0.1:8000/api/books?q=' + this.searchQuery)
                .then(response => response.json())
                .then(data => {
                    this.booksLookAhead = limit > -1 ? data.slice(0, limit) : data
                    // if(limit > -1){
                    //     let regex = new RegExp(this.searchQuery.toLowerCase(), 'ig')
                    //     this.booksLookAhead = data.filter((item) => {
                    //         return item.name.replace(regex, '<b>$&</b>')
                    //     })
                    // }else{
                    //     this.books = data
                    // }
                })
        }
    }
}
</script>


<style scoped lang="scss">
.header-wrapper {
    background: linear-gradient(90deg, #7c93f3, #5b6fc0);
    z-index: 2;

    .search-wrapper {
        max-width: 600px;
        margin-bottom: -28px;

        &__suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 6px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            padding: 12px;

            ul{
                max-height: 300px;
                overflow: auto;
                padding: 6px;
                max-height: 300px;
            }

            li {
                text-align: left;
                padding: 8px 12px;
                border-radius: 3px;
                cursor: pointer;
                line-height: 120%;

                &:hover,
                &:focus,
                &:active {
                    background: var(--bs-gray-100);
                }
            }
        }

        input[type=text] {
            height: 56px;
            border-radius: 50px;
            padding: 16px 32px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
            border: 0;

            &:focus,
            &:active {
                outline: 0;
            }
        }
    }
}

.results-wrapper {
    background: var(--bs-gray-200);
    z-index: 0;
    &.scrollable{
        &::-webkit-scrollbar-track {
        background: var(--bs-gray-300);
    }
    }

    ul {
        .result-item {
            padding: 6px;
            width: 100%;
            @media (min-width: 576px){
                width: 50%;
            }
            @media (min-width: 768px){
                width: 33.33%;
            }
            @media (min-width: 992px){
                width: 25%;
            }
            .card{
                border-radius: 16px;
                min-height: 100%;
            }
        }
    }
}

.scrollable {
    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 500px;
        background: #7c93f3;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
}
</style>

