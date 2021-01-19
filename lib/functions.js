const { default: got } = require('got/dist/source');
const fetch = require('node-fetch')
const get = require('got')
const { getBase64 } = require("./fetcher")

const liriklagu = async (lagu) => {
    const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
    return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
}

const mostfilmid = async () => {
	const film = await got.get('https://api.haipbis.xyz/mostviewedmovieid').json()
	console.log(film[0].title)
}

const artinamamu = async (nama) => {
    const response = await fetch(`https://scrap.terhambar.com/nama?n=${nama}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Arti Dari ${nama}\n\n${json.result.arti}`
	return `Error, ${nama} tidak dapat di proses`
}

const bapackfont = async (kata) => {
    const response = await fetch(`https://api.terhambar.com/bpk?kata=${kata}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `${json.text}`
	return `Error, ${kata} tidak dapat di proses`
}

const namaindos = async (jenis) => {
    const response = await fetch(`https://api.terhambar.com/nama?jenis=${jenis}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `${json.result.nama}`
	return `Error, ${jenis} tidak dapat di proses`
}

const namaninjas = async (namamu) => {
    const response = await fetch(`https://api.terhambar.com/ninja?nama=${namamu}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `${json.result.ninja}`
	return `Error, ${namamu} tidak dapat di proses`
}

const kurensi = (curr, bal) => new Promise((resolve, reject) => {
    fetchJson('https://api.terhambar.com/currency?curr=' + curr + '&bal=' + bal)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const jodohlah = (n1, n2) => new Promise((resolve, reject) => {
    fetchJson('scrap.terhambar.com/jodoh?n1=' + n1 + '&n2=' + n2)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const kalkulatorjmodoh = async (nama1, nama2) => {
    const response = await fetch(`http://scrap.terhambar.com/jodoh?n1=${nama1}&n2=${nama2}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Nama pasangan : ${nama1} & ${nama2}\n\nSisi Positif\n${json.result.sisi.positif}\n\nSisi Negatif:\n${json.result.sisi.negatif}`
	return `Error, ${nama1} & ${nama2} gagal di proses`
}

const infonomors = async (nomor) => {
    const response = await fetch(`https://api.haipbis.xyz/phonenumber?no=${nomor}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
}

const quotemaker = async (quotes, author = 'Zelda', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}
/*const fb = async (url) => {
    const response = await fetch(`http://scrap.terhambar.com/fb?link=${url}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    console.log(json)
    if (json.status === true) return {
        'capt': json.result.title, 'exts': '.mp4', 'url': json.result.linkVideo.sdQuality
    }
    return {
        'capt': '[ ERROR ] Not found!', 'exts': '.jpg', 'url': 'https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg'
    }
}*/

const fb = async (url) => {
    const response = await fetch(`http://scrap.terhambar.com/fb?link=${url}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `*Judul : ${json.result.linkVideo.title}\n*Link Download :*\n${json.result.linkVideo.sdQuality}`
    return `Error, ${url} tidak dapat di proses`
}

const ytmp3d = async (urlyta) => {
    const response = await fetch(`http://scrap.terhambar.com/yt?link=${urlyta}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `*Title :* ${json.title}\n*Duration :* ${json.duration.inText}`
    return `Error, ${urlyta} tidak dapat di proses`
}

const ytmp3 = async (urlyta) => {
    const response = await fetch(`http://scrap.terhambar.com/yt?link=${urlyta}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `${json.linkAudioOnly}`
    return `Error, ${urlyta} tidak dapat di proses`
}

const tiktod = async (linktt) => {
    const response = await fetch(`http://scrap.terhambar.com/tiktokfull?link=${linktt}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `*Username :* ${json.result.username}\n*Caption :* ${json.result.caption}\n\n*VIDEO DATA*\n*Share :* ${json.result.videoData.shareCount}\n*View :* ${json.result.videoData.playCount}\n*Comment :* ${json.result.videoData.commentCount}\n*Duration :* ${json.result.videoData.duration}\n\n*MUSIC DATA*\n*Song :* ${json.result.musicData.song}\n*Author Song :* ${json.result.musicData.authorSong}\n\n*DOWNLOAD LINK*\n*WITH WM :* ${json.result.videoData.linkVideo.withWatermark}\n*NO WM :* ${json.result.videoData.linkVideo.withoutWatermark}`
    return `Error, ${linktt} tidak dapat di proses`
}

const pinterest = async (pinlink) => {
    const response = await fetch(`https://scrap.terhambar.com/pin?url=${pinlink}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `${json.response.links[0].url}`
    return `Error, ${pinlink} tidak dapat di proses`
}

const ramaljdh = async (n1, n2) => {
    const response = await fetch(`http://scrap.terhambar.com/jodoh?n1=${n1}&n2=${n2}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `*Nama 1 :* ${json.result.nama_anda}\n*Nama 2 :* ${json.result.nama_pasangan}`
    return `Error, ${n1} ${n2} tidak dapat di proses`
}

const randomNimek = async (type) => {
    var url = 'https://api.computerfreaker.cf/v1/'
    switch(type) {
        case 'nsfw':
            const nsfw = await fetch(url + 'nsfwneko')
            if (!nsfw.ok) throw new Error(`unexpected response ${nsfw.statusText}`)
            const resultNsfw = await nsfw.json()
            return resultNsfw.url
            break
        case 'hentai':
            const hentai = await fetch(url + 'hentai')
            if (!hentai.ok) throw new Error(`unexpected response ${hentai.statusText}`)
            const resultHentai = await hentai.json()
            return resultHentai.url
            break
        case 'anime':
            let anime = await fetch(url + 'anime')
            if (!anime.ok) throw new Error(`unexpected response ${anime.statusText}`)
            const resultNime = await anime.json()
            return resultNime.url
            break
        case 'neko':
            let neko = await fetch(url + 'neko')
            if (!neko.ok) throw new Error(`unexpected response ${neko.statusText}`)
            const resultNeko = await neko.json()
            return resultNeko.url
            break
        case 'trap':
            let trap = await fetch(url + 'trap')
            if (!trap.ok) throw new Error(`unexpected response ${trap.statusText}`)
            const resultTrap = await trap.json()
            return resultTrap.url
            break
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*const shortlink = async (url) => {
	const response = await got.get(`https://api.haipbis.xyz/bitly?url=${url}`).json()
	if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `pendekan link dari ${url}\n\n${json.result.result}`
}*/

const alkitabverse = async (querynya) => {
    const res = await got.get(`https://api.haipbis.xyz/searchalkitab?q=${querynya}`).json()
    if (res.status === true) return `${res.result}`
	return `Error, ${querynya} tidak dapat di proses`
}

const jadwalTv = async (query) => {
    const res = await got.get(`http://localhost:5000/api/jadwaltv?ch=${query}`).json()
    if (res.error) return res.error
    switch(query) {
        case 'antv':
            return `\t\t[ ANTV ]\n${res.result.join('\n')}`
            break
        case 'gtv':
            return `\t\t[ GTV ]\n${res.result.join('\n')}`
            break
        case 'indosiar':
            return `\t\t[ INDOSIAR ]\n${res.result.join('\n')}`
            break
        case 'inewstv':
            return `\t\t[ iNewsTV ]\n${res.result.join('\n')}`
            break
        case 'kompastv':
            return `\t\t[ KompasTV ]\n${res.result.join('\n')}`
            break
        case 'mnctv':
            return `\t\t[ MNCTV ]\n${res.result.join('\n')}`
            break
        case 'metrotv':
            return `\t\t[ MetroTV ]\n${res.result.join('\n')}`
            break
        case 'nettv':
            return `\t\t[ NetTV ]\n${res.result.join('\n')}`
            break
        case 'rcti':
            return `\t\t[ RCTI ]\n${res.result.join('\n')}`
            break
        case 'sctv':
            return `\t\t[ SCTV ]\n${res.result.join('\n')}`
            break
        case 'rtv':
            return `\t\t[ RTV ]\n${res.result.join('\n')}`
            break
        case 'trans7':
            return `\t\t[ Trans7 ]\n${res.result.join('\n')}`
            break
        case 'transtv':
            return `\t\t[ TransTV ]\n${res.result.join('\n')}`
            break
        default:
            return '[ ERROR ] Channel TV salah! silahkan cek list channel dengan mengetik perintah *#listChannel*'
            break
    }
}

exports.liriklagu = liriklagu;
exports.mostfilmid = mostfilmid;
exports.artinamamu = artinamamu;
exports.bapackfont = bapackfont;
exports.namaindos = namaindos;
exports.namaninjas = namaninjas;
exports.currToIdr = kurensi;
exports.mp3detl = ytmp3d;
exports.mp3dl = ytmp3;
exports.jodohsisi = jodohlah
exports.kalkulatorjmodoh = kalkulatorjmodoh;
exports.infonomors = infonomors;
exports.quotemaker = quotemaker;
exports.randomNimek = randomNimek
exports.pesbuk = fb
exports.tiktod = tiktod
exports.pinterest = pinterest
exports.rmljdh = ramaljdh
exports.sleep = sleep
exports.alkitabverse = alkitabverse
exports.jadwalTv = jadwalTv