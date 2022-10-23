// export default class ApiService {
//     constructor() {
//         this.searchQuery = '';
//   }

//   fetchArticles() {
//     const options = {
//       headers: {
//         Authorization: '30783584-a1be3f956269c817fc7780fef',
//       },
//     };
//     const url =
//       'https://pixabay.com/api/?key=30783584-a1be3f956269c817fc7780fef&q=${this.searchQuery}&image_type=photo';

//     fetch(url, options)
//       .then(r => r.json())
//       .then(console.log);
//   }
    
//     get query() { 
//         return this.query;
//     }

//     set query(newQuery) { 
//         this.searchQuery = newQuery;
//     }
// }