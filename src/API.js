export default async (data, pageNumber = 1) => {
    const artist = data.artist;
    const title = data.title;

    let res = await fetch(`https://api.discogs.com/database/search?key=IMBBSOewhouYZHfLjhQE&secret=CobXxvOVhUPnuQxicEHompPEcVGBnvzw&per_page=10&page=${pageNumber}&artist=${artist}&title=${title}`);
    if (!res.ok) {
        throw Error("Error: Server replied with status " + res.status);
    }

    let json = await res.json();
    console.log(json);
    const {results} = json;
    const pagination = Object.assign({}, json.pagination);
    const query = {artist, title};

    return {results, pagination, query};
}