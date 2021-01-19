const Telegrambot = require('node-telegram-bot-api');
const token = //token nya bg
const Command = require('telegram-command-handler');
const moment = require('moment-timezone')
const bot = new Telegrambot(token, {polling: true});
const fetch = require('node-fetch')
const { bapackfont, namaindos, namaninjas, liriklagu } = require('./lib/functions')
const fs = require('fs')
const get = require('got');
const { on, report } = require('process');
const { start } = require('repl');
const { resolve } = require('path');
const color = require('./lib/color')
const TelegramBot = require('node-telegram-bot-api');
const template = require('./lib/text');
var times = require('timestamp-zoned');
const { spawn, exec } = require('child_process')
const { italic } = require('chalk');
const pantun = require('./lib/pantun')
const gradient = require('gradient-string');
const { time } = require('console');
var request = require('request').defaults({ encoding: null });

const totalHit = JSON.parse(fs.readFileSync('./lib/totalHit.json'))

console.log(gradient.rainbow(template.CONSOLE()))

moment.tz.setDefault('Asia/Jakarta').locale('id')

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
    console.log(msg)
    jojo.reply(chatId, resp);
});


/***
 * FUNCTION
 */
function time_now (){
  var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var d = new Date();
  var day = days[d.getDay()];
  var hr = d.getHours();
  var mint = d.getMinutes();
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  const waktue = day + "," + " " + date + " " + month + " " + year + " "+ "Jam" + " " + hr + ":" + mint + " " + "WIB"
  return waktue
}
function runtime() {
  function format(seconds){
      function pad(s){
      return (s < 10 ? '0' : '') + s;
      }
      var hours = Math.floor(seconds / (60*60));
       var minutes = Math.floor(seconds % (60*60) / 60);
       var seconds = Math.floor(seconds % 60);

       return `${pad(hours)} Jam || ${pad(minutes)} Menit || ${pad(seconds)} Detik`;
        }

      var uptime = process.uptime();
  return format(uptime)
}
function AddHit(){
  totalHit[0].total += 1;
  fs.writeFileSync('./lib/totalHit.json',JSON.stringify(totalHit));
}

bot.on('message', async (msg) => {

  if (msg.sticker) return
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  try{
  const prefix = '/'
  const quotedMsg = msg.reply_to_message
  const tesk = msg.text || msg.caption
  const pushname = msg.chat.first_name
  const commands = tesk.toLowerCase().replace('(', '').replace(')', '').split(' ')[0] || ''
  const text = tesk.slice(commands.length+1)
  const text2 = tesk.substring(tesk.indexOf(' ') + 1)
  const from = msg.chat.id
  const isGroupMsg = msg.chat.type === "group"
  const mess = {
    wait: 'Tunggu sebentar, sedang di proses...!',
    done: 'Berhasil di proses!\n\nSupport admin yuk dengan cara follow ig\nhttps://instagram.com/call_me.jojo'
  }


  if (isGroupMsg) {
    console.log(`${color('[RECEIVED]', 'green')} ${color(commands, 'yellow')} ${color('From', 'green')} ${color(msg.from.first_name, 'yellow')} ${color('In', 'green')} ${color(msg.chat.title, 'yellow')} ${color('On', 'green')} ${color(time_now(), 'yellow')}`)
  }else{
    if (tesk.startsWith(prefix)){
      console.log(`${color('[RECEIVED]', 'green')} ${color(commands, 'yellow')} ${color('From', 'green')} ${color(msg.from.first_name, 'yellow')} ${color('On', 'green')} ${color(time_now(), 'yellow')}`)
    } else {
      console.log(`${color('[RECEIVED]', 'green')} ${color(tesk, 'yellow')} ${color('From', 'green')} ${color(msg.from.first_name, 'yellow')} ${color('On', 'green')} ${color(time_now(), 'yellow')}`)
    }
  }

  const jojo = {
    reply: async function(to, mess){
      await bot.sendMessage(to, mess, { reply_to_message_id: msg.message_id })
      await AddHit()
    },
    sendImage: async function(to, PhotoUrl, ImageCaption){
      await bot.sendPhoto(to, PhotoUrl, { caption: ImageCaption, reply_to_message_id: msg.message_id })
      await AddHit()
    },
    sendVideos: async function(to, VideoUrl, VideoCaption) {
      await bot.sendVideo(to, VideoUrl, {caption: VideoCaption, reply_to_message_id: msg.message_id})
      await AddHit()
    },
    sendPtt: async function(to, Path_Url) {
      await bot.sendVoice(to, Path_Url, {reply_to_message_id: msg.message_id})
      await AddHit()
    }
  }


  switch (commands){
    case 'hai':
      jojo.reply(from, 'Hai, aku jojo bot, silahkan ketik /menu untuk melihat fitur ku!')
      break
    case '/start':
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['/menu'],
            ['/tips']
          ]
        })
      };
      bot.sendMessage(from, template.START(pushname), opts);
      break
    case '/tips':
      await jojo.sendImage(from, './media/tutor.jpg', `[TIPS]
seperti di atas sama juga dengan lain nya
jika di menu harus beragumen text atau link, maka isi lah text/link
cth : /hilih tesk
/hilih aku sayang kamu

harus ada spasi sebelum memasukkan argumen!

argumen:
-text
-link
-query
-pertanyaan
-dll`)
break
    case '/menu':
      await jojo.reply(from, template.MENU(runtime, totalHit[0].total))
      break
    case '/tiktok':
      await jojo.reply(from, mess.wait)
      if (!text) return jojo.reply(from, 'Masukkan link tiktok!')
      try {
        const apitiktok = await get.get('https://docs-jojo.herokuapp.com/api/tiktok_nowm?url='+text).json()
        await jojo.sendVideos(from, apitiktok.result[0].url, apitiktok.title)
        await jojo.reply(from, mess.done)
      } catch (error) {
        console.log(error)
        jojo.reply(from, 'Gagal, mungkin link yang kamu kirim tidak valid!')
      }
      break
    case '/fb':
      if (!text) return jojo.reply(from, 'Masukkan link facebook!')
      await jojo.reply(from,mess.wait)
      try {
        const apifb = await get.get('https://fbdown.now.sh/?url='+text).json()
        await jojo.sendVideos(from, apifb.url, apifb.title)
        await jojo.reply(from, mess.done)
      } catch (error) {
        console.log(error)
        jojo.reply(from, 'Gagal, mungkin link yang kamu kirim tidak valid!')
      }
      break
    case '/pin':
      if (!text) return jojo.reply(from, 'Masukkan link pinterest!')
      await jojo.reply(from, mess.wait)
      const apipin = await get.get('https://scrap.terhambar.com/pin?url='+ text).json()
      if (apipin.status == true) {
        const { response } = apipin
        if (response.links[0].ext === 'mp4'){
          await jojo.sendVideos(from,  response.links[0].url, response.title)
        }else{
          await jojo.sendImage(from,  response.links[0].url, response.title)
        }
      } else {
        jojo.reply(from, 'Gagal, mungkin link yang kamu kirim tidak valid!', id)
      }
      break
    case '/alay':
      if (!text) return jojo.reply(from, 'Masukkan text!')
      const alay = await bapackfont(text)
      await jojo.reply(from, alay)
      break
    case '/randomnama':
      if (text === 'cowo'){
        var namarandom = await namaindos(text.replace('cowo', 'male'))
      } else if (text === 'cewe'){
        var namarandom = await namaindos(text.replace('cewe', 'female'))
      } else {
        var namarandom = 'Masukkan jenis! cowo/cewe'
      }
      await jojo.reply(from, namarandom)
      break
    case '/namaninja':
      if (!text) return jojo.reply(from, 'Masukkan namamu!')
      await jojo.reply(from, await namaninjas(text))
      break
    case '/quotes':
      const quotes = await get.get('http://docs-jojo.herokuapp.com/api/randomquotes').json()
      await jojo.reply(from, `${quotes.quotes}

~${quotes.author}`)
break
case '/pantun':
  await jojo.reply(from, pantun())
  break
  case '/gombal':
    const { getGombal } = require('./lib/getGombal')
    await jojo.reply(from, getGombal())
    break
  case '/hilih':
    if (!text) return jojo.reply(from, 'Masukkan text!')
    const hilih = text.replace(/[aiueo]/g, 'i').replace(/[AIUEO]/g, 'I')
    await jojo.reply(from, hilih)
    break
  case '/jodoh':
    const jodoh = await get.get(`https://rest.farzain.com/api/jodoh.php?id=${text}&apikey=PxQoVU8QqrdsQfy2eZJvik5Jv`).json()
    await jojo.reply(from, jodoh.result)
    break
  case '/pasangan':
    const nama1 = text2.split('-')[0]
    if (!nama1) return jojo.reply(from, 'Masukkan nama mu!')
    const nama2 = text2.split('-')[1]
    if (!nama2) return jojo.reply(from, 'Masukkan nama pasangan!')
    const apipsg = await get.get(`http://scrap.terhambar.com/jodoh?n1=${nama1}&n2=${nama2}`).json()
    const { nama_anda, nama_pasangan, gambar } = apipsg.result
    const { positif, negatif } = apipsg.result.sisi 
    const pasangan = `Nama anda : ${nama_anda}
Nama pasangan : ${nama_pasangan}

Sisi Positif : 
${positif}

Sisi Negatif :
${negatif}`
    await jojo.sendImage(from, gambar, pasangan)
    break
  case '/cewe':
    const scewe = ["ullzang girl", "cewe cantik", "korean girl"]
    const ptlcewe = await get.get(`https://api.fdci.se/rep.php?gambar=${scewe[Math.floor(Math.random() * scewe.length)]}`).json()
    const emojicwe = ['🥰', '🥺', '🤪', '😳', '🤗']
    jojo.sendImage(from, ptlcewe[Math.floor(Math.random() * ptlcewe.length)], 'Hai ganteng'+emojicwe[Math.floor(Math.random() * emojicwe.length)])
    break
  case '/cowo':
    const scowo = ["cowo ganteng", "korean boy", "cowo keren"]
    const ptlcowo = await get.get(`https://api.fdci.se/rep.php?gambar=${scowo[Math.floor(Math.random() * scowo.length)]}`).json()
    const emojicwo = ['🥰', '🥺', '🤪', '😳', '🤗']
    jojo.sendImage(from, ptlcowo[Math.floor(Math.random() * ptlcowo.length)], 'Hai cantik'+emojicwo[Math.floor(Math.random() * emojicwo.length)])
    break
    case '/apakah':
      if (!text) return jojo.reply(from, 'Masukkan pertanyaan!')
      const jwbn = ["iya", "tidak", "iya", "iya", "tidak", "iya", "tidak", "tidak", "hmm apayah", "gak tau dah gw", "bingung gw anjir", "mungkin iya", "coba tanya gugel"]
      let rndmyg = jwbn[Math.floor(Math.random() * jwbn.length)]
      const jwbnya = `Apakah ${text}

Jawaban : ${rndmyg}`
      await jojo.reply(from, jwbnya)
      break
    case '/gay':
      if (!text) return jojo.reply(from, 'Masukkin nama!')
      const rndmgay = Math.floor(Math.random() * 100)
      const persen = rndmgay+'%'
      if (rndmgay < 10){
        var jawaban = `Hmmm 🤔, ${persen} sih tapi aman lah njir`
      } else if (rndmgay < 20){
        var jawaban = 'Bused bahaya juga nih si anjir😑'
      } else if (rndmgay < 40){
        var jawaban = 'dih anjir lu gay jg ngeri gw  😣'
      } else if (rndmgay < 60){
        var jawaban = '😐bjir ati ati ada gay woi walaupun'+' '+persen
      } else if (rndmgay < 85){
        var jawaban = 'anjiiirrr jauh jauh dh lu amsu🤬'
      } else if (rndmgay < 90){
        var jawaban = 'Lari woi ada gay amsu lariiiiiii😫😱'
      } else if (rndmgay < 100){
        var jawaban = 'Anjiirr parah gay bnget si anjir jauh jauh lu anjir😤😤🤬'
      }
      jojo.reply(from, `Tingkat gay ${text} adalah ${persen}\n\n${jawaban}`)
      break
    case '/fakta':
      fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
      .then(res => res.text())
      .then(body => {
          let splitnix = body.split('\n')
          let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
          jojo.reply(from, randomnix)
      })
      break
    case '/meme':
      const meme = await get.get('https://meme-api.herokuapp.com/gimme/indonesia').json()
      await jojo.sendImage(from, meme.url, meme.title)
      break
    case '/katacinta':
      const apiktacin = await get.get('http://docs-jojo.herokuapp.com/api/katacinta').json()
      await jojo.reply(from, apiktacin.result)
      break
    case '/twitchquote':
      const twitchquote = await get.get('http://docs-jojo.herokuapp.com/api/twichquote').json()
      await jojo.reply(from, twitchquote.result)
      break
    case '/fml':
      const fml = await get.get('http://docs-jojo.herokuapp.com/api/fml').json()
      await jojo.reply(from, fml.result.fml)
      break
    case '/news':
      const apiberita = await get.get('http://newsapi.org/v2/top-headlines?country=id&apiKey=f87da45269a24b37945ec076bf6fd87c').json()
      let Nberita = []
      for (let i = 0; i < apiberita.articles.length; i++){
          Nberita.push(i)
      }
      const rBerita = Nberita[Math.floor(Math.random() * Nberita.length)]
      const resberita =  `
Source : ${apiberita.articles[rBerita].source.name}

Author : ${apiberita.articles[rBerita].author}

Judul : ${apiberita.articles[rBerita].title}

Deskripsi : ${apiberita.articles[rBerita].description}

Di Upload : ${apiberita.articles[rBerita].publishedAt}

Link : ${apiberita.articles[rBerita].url}

${apiberita.articles[rBerita].content}`
await jojo.sendImage(from, apiberita.articles[rBerita].urlToImage, resberita)
break
case '/corona':
  const korona = await get.get('https://api.kawalcorona.com/indonesia/').json()
  await jojo.reply(from, `DATA CORONA INDONESIA

Positif : ${korona[0].positif}☹️
Sembuh : ${korona[0].sembuh}😃
Meninggal : ${korona[0].meninggal}😭
Dirawat : ${korona[0].dirawat}😔`)
break
case '/covid':
  try {
    if (!text) return jojo.reply(from, 'Masukkan nama negara!')
    const covid = await get.get('https://coronavirus-19-api.herokuapp.com/countries/'+text).json()
    const { cases, todayCases, deaths, todayDeaths, recovered, active, totalTests, country } = covid
    await jojo.reply(from, `${country.toUpperCase()}

Total Kasus : ${cases}
Kasus hari ini : ${todayCases}
Total Kematian : ${deaths}
Kematian hari ini : ${todayDeaths}
Sembuh : ${recovered}
Aktif : ${active}
Total test : ${totalTests}`)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Data tidak di temukan!\nNama negara yang kamu tentukan salah!')
  }
  break
  case '/wiki':
    try{
      if (!text) return jojo.reply(from, 'Masukkan pencarian!')
    const wiki = await get.get('http://docs-jojo.herokuapp.com/api/wiki?q='+text).json()
    await jojo.reply(from, wiki.result)
    }catch(e){
      console.log(e)
      jojo.reply(from, 'Tidak dapat di temukan di wikipedia')
    }
    break
  case '/tvnow':
    const tvnow = await get.get('http://docs-jojo.herokuapp.com/api/jadwaltvnow').json()
    await jojo.reply(from, tvnow.result.jadwalTV)
    break
  case '/tv':
    if (!text) return jojo.reply(from, 'Masukkan nama saluran!')
    try{
      const apijadwaltv = await get.get('http://docs-jojo.herokuapp.com/api/jadwaltv?ch='+ text).json()
      let resjdwl = `JADWAL TV [${text.toUpperCase()}]\n\n`
      for (let i=0; i < apijadwaltv.result.length; i++){
          resjdwl+= `${apijadwaltv.result[i]}\n`
      }
      await jojo.reply(from, resjdwl)
    }catch(e){
      console.log(e)
      jojo.reply(from, 'Nama saluran salah!')
    }
    break
  case '/bmkg':
    const bmkg = await get.get('http://docs-jojo.herokuapp.com/api/infogempa').json()
    const { map, waktu, magnitude, kedalaman, koordinat, lokasi, potensi } = bmkg
    await jojo.sendImage(from, map, `${waktu}
Magnitude : ${magnitude}
Kedalaman : ${kedalaman}
Koordinat : ${koordinat}
Lokasi : ${lokasi}
Potensi : ${potensi}`)
break
case '/biografi':
  if (!text) return jojo.reply(from, 'Masukkan nama tokoh!')
  try {
    const bioorg = await get.get(`https://rest.farzain.com/api/biografi.php?id=${text}&apikey=PxQoVU8QqrdsQfy2eZJvik5Jv`).json()
    const resimgbio = `${bioorg[0].img}`
    const resultbio = `*Tittle :* ${bioorg[0].title}\n*Link :* ${bioorg[0].link}`
    await jojo.sendImage(from, resimgbio, resultbio)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Biografi tidak di temukan')
  }
  break
  case '/film':
    if (!text)return jojo.reply(from, 'Masukkan judul film!')
    try {
const findfilm = await get.get(`https://rest.farzain.com/api/film.php?id=${text}&apikey=PxQoVU8QqrdsQfy2eZJvik5Jv`).json()
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Metascore, imdbRating, imdbID, Type, DVD, BoxOffice, Production, Website } = await findfilm
    const capfilm = `Title : ${Title}
Year: ${Year}
Rated: ${Rated}
Released: ${Released}
Runtime: ${Runtime}
Genre: ${Genre}
Director: ${Director}
Writer: ${Writer}
Actors: ${Actors}
Metascore: ${Metascore}
imdbRating: ${imdbRating}
imdbID: ${imdbID}
Type: ${Type}
DVD: ${DVD}
BoxOffice: ${BoxOffice}
Production: ${Production}
Website: ${Website}`
await jojo.sendImage(from, Poster, capfilm)
    } catch (error) {
      console.log(error)
      jojo.reply(from, 'Film tidak di temukan!')
    }
    break
  case '/beasiswa':
    try {
      if (!text) return jojo.reply(from, 'Masukkan negara!\nContoh : #beasiswa jepang')
      const apibsw = await get.get(`https://rest.farzain.com/api/special/beasiswa.php?id=${text}&apikey=rambu`).json()
      let besiswa = `*Hasil Pencarian beasiswaindo.com*\n\n`
      for (let i = 0; i < 5; i++) {
          besiswa += `Title : ${apibsw[i].title}

Url : ${apibsw[i].url}

Desc : ${apibsw[i].desc}
==========================
`
      }
      await jojo.reply(from, besiswa)
    } catch (error) {
      console.log(error)
      jojo.reply(from, 'Beasiswa di negara tersebut tidak di temukan')
    }
    break
case '/ptn':
try {
  if (!text) return jojo.reply(from, 'Masukkan daerah!\nContoh : /ptn medan')
  const apiptn = await get.get(`https://rest.farzain.com/api/special/ptn.php?id=${text}&apikey=rambu`).json()
  const resptn = `Kode : ${apiptn[0].kode}
Nama singkatan : ${apiptn[0].nama_s}
Nama Universitas : ${apiptn[0].nama}
Prodi : ${apiptn[0].prodi}
wilayah : ${apiptn[0].wilayah}
PanLok : ${apiptn[0].panlok}
Website : ${apiptn[0].website}`
await jojo.reply(from, resptn)
} catch (error) {
  console.log(error)
  jojo.reply(from, 'Ptn di kota yang kamu masukkan tidak tersedia')
}
break
case '/indoxxi':
  if (!text) return jojo.reply(from, 'Masukkan nama film!\nContoh: /indoxxi comic 8')
  try {
    const apindox = await get.get(`https://rest.farzain.com/api/special/indoxxi.php?id=${text}&apikey=rambu`).json()
  const resindoxxi = `Title : ${apindox[0].title}
Url : ${apindox[0].url}
Duration : ${apindox[0].duration}
Rating : ${apindox[0].rating}
Quality : ${apindox[0].quality}`
await jojo.reply(from, resindoxxi)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Maaf, judul yang anda masukkan tidak di temukan!')
  }
break
case '/bioskop':
  if (!text) return jojo.reply(from, 'Masukkan nama mall!\nContoh : #bioskop plaza medan fair', id)
  try {
    const apibkp = await get.get(`https://rest.farzain.com/api/special/bioskop/bioskop.php?id=${text}&apikey=rambu`).json()
    let biskop = `Hasil Pencarian Jadwal Bioskop\n\n`
    for (let i = 0; i < 3; i++) {
        biskop += `Title : ${apibkp[i].title}

Url : ${apibkp[i].url}

Img : ${apibkp[i].img}
==========================\n`
    }
await jojo.sendImage(from, apibkp[0].img, biskop)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Tidak dapat menemukan jadwal bioskop')
  }
      break
case '/pribahasa':
  if (!text) return jojo.reply(from, 'Masukkan pribahasa yang ingin di cari artinya!')
  const apirbhs = await get.get('http://docs-jojo.herokuapp.com/api/pribahasa?q='+ text).json()
  let resprb = ''
  for (let i=0; i < apirbhs.result.length; i++){
      resprb+=`${i+1}. ${apirbhs.result[i]}\n\n`
  }
  await jojo.reply(from, resprb)
  break
case '/trendingtwt':
  const twiters = await get.get('http://docs-jojo.herokuapp.com/api/trendingtwitter').json()
  let trendt = 'Trending Hastag Twitter Hari Ini\n\n'
  for (let i=0; i < twiters.result.length; i++){
      trendt+=`Peringkat : ${twiters.result[i].rank}
Hastag : ${twiters.result[i].hastag}
Tweet : ${twiters.result[i].tweet}
Link : ${twiters.result[i].link.replace(' ', '%20')}
========================\n`
  }
await jojo.reply(from, trendt)
  break
case '/infohoax':
  const apihox = await get.get('http://docs-jojo.herokuapp.com/api/infohoax').json()
  let reshoax = 'Info Hoax Terbaru\n'
  for(let i=0; i < 3; i++){
      reshoax+=`Title : ${apihox.result[i].title}
TAG : ${apihox.result[i].tag}
Link : ${apihox.result[i].link}
Image : ${apihox.result[i].image}
==================\n`
  }
await jojo.sendImage(from, apihox.result[0].image, reshoax)
  break
  case '/quran':
    if (!text) return jojo.reply(from, 'Masukkan query!')
    try {
      const apiqrn = await get.get(`http://ariapi.herokuapp.com/api/quran/search?q=${text}&key=beta`).json()
      const {result} = apiqrn
          let quran = ''
          for (let i = 0; i < 5; i++) {
              quran += `Text : ${result.matches[i].text}
  Surah :\n${result.matches[i].quransurah.name}
  Latin :\n${result.matches[i].quransurah.latin}
  ==========================\n`
          }
          await jojo.reply(from, quran)
    } catch (error) {
      console.log(error)
      jojo.reply(from, 'query yang anda masukkan tidak di temukan!')
    }
        break
  case '/renungan':
    const apirng = await get.get(`http://docs-jojo.herokuapp.com/api/renungan`).json()
    const { judul, pesan, Isi } = apirng
    await jojo.reply(from, `${judul}

${Isi}

${pesan}`)
break
case '/alkitab':
  if (!text) return jojo.reply(from, 'Masukkan query!')
  try {
    const alkitab1 = await get.get('http://docs-jojo.herokuapp.com/api/alkitabsearch?q='+ text).json()
  const alkitab = alkitab1.result
  let kitab = ''
  for (let i = 0; i < 5; i++) {
      kitab += `Ayat : ${alkitab[i].ayat}
Isi : ${alkitab[i].isi}
Link : ${alkitab[i].link}
======================\n`
  }
  await jojo.reply(from, kitab)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Tidak di temukan!')
  }
  break
case '/alkitabharian':
  const apikitab = await get.get('http://docs-jojo.herokuapp.com/api/alkitab').json()
  await jojo.sendImage(from, apikitab.result.img, `${apikitab.result.ayat}\n\n${apikitab.result.isi}`)
break
case '/waifu':
  const datawfu = fs.readFileSync('./lib/waifu.json')
  const dataJson = JSON.parse(datawfu)
  const randIndex = Math.floor(Math.random() * dataJson.length)
  const randKey = dataJson[randIndex]
  jojo.sendImage(from, randKey.image, randKey.teks)
  break
case '/anime':
  {
    if (!text) return jojo.reply(from, 'Masukkan judul anime!')
  try {
    const apinime = await get.get('https://api.jikan.moe/v3/search/anime?q='+tesk).json()
    const { url, image_url, title, synopsis, episodes, score } = apinime.results[0]
    await jojo.sendImage(from, image_url, `Title : ${title}
Episode : ${episodes}
Score : ${score}
Synopsis : 
${synopsis}`)
  } catch (error) {
    console.log(error)
    jojo.reply(from, 'Anime yang kamu cari tidak dapat di temukan!')
  }
  }
  break
  case '/quoteanime':
    const apiqtnime = await get.get('https://rest.farzain.com/api/animequotes.php?apikey=Y56H7moHah3CvfiLGCGW33gjK').json()
    const { result } = apiqtnime
    jojo.reply(from, `Quotes : ${result.quote}\nAuthor : ${result.author}\nAnime : ${result.anime}`)
    break
  case '/kusonime':
    try {
      if (!text) return jojo.reply(from, 'Masukkan judul!', id)
      const apikuso = await get.get('http://docs-jojo.herokuapp.com/api/kuso?q='+ text).json()
      if (apikuso.error) return jojo.reply(from, apikuso.error, id)
      const { info, link_dl, sinopsis, thumb, title } = apikuso
      const reskuso = `Title : ${title}
Info : ${info}
Link Download : ${link_dl}`
  await jojo.sendImage(from, thumb, reskuso)
    } catch (error) {
      console.log(error)
      jojo.reply(from, 'Anime tidak di temukan')
    }
    break
  case '/neonime':
    const apineonime = await get.get('http://docs-jojo.herokuapp.com/api/neonime_lastest').json()
    let resnonime = 'NeoNime Lastest'
    for (let i=0; i < 3; i++){
        resnonime+= `
Judul : ${apineonime.result[i].judul}
Rilis : ${apineonime.result[i].rilis}
Link : ${apineonime.result[i].link}
Img : ${apineonime.result[i].img}
======================\n`
    }
    await jojo.sendImage(from, apineonime.result[0].img, resnonime)
    break
  case '/cat':
    q2 = Math.floor(Math.random() * 900) + 300;
    q3 = Math.floor(Math.random() * 900) + 300;
    jojo.sendImage(from, 'http://placekitten.com/'+q3+'/'+q2, '')
    break
  case '/pokemon':
    q7 = Math.floor(Math.random() * 890) + 1;
    jojo.sendImage(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','')
    break
  case '/dog':
const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            jojo.sendImage(from, kya, '')
          break
  case '/qrcode':
    if (!text) return jojo.reply(from, 'Masukkan tesk!')
    await jojo.sendImage(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`, '')
    break
  case '/makememe':
    const top = text2.split('-')[0]
    const bottom = text2.split('-')[1]
    const filememe1 = await get.get(`https://api.telegram.org/bot${token}/getFile?file_id=${msg.photo[0].file_id}`).json()
    const apimeme = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=https://api.telegram.org/file/bot${token}/${filememe1.result.file_path}`
    await jojo.sendImage(from, apimeme)
    break
    case '/blackpink':
      if (!text) return jojo.reply(from, 'Masukkan tesk!')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/blackpink?text=${text}`, mess.done)
      break
    case '/pornhub':
      const putih = text2.split('-')[0]
      const oren = text2.split('-')[1]
      if (!text2) return jojo.reply(self, 'Text 2 nya mana???\ncth : #phlogo jojo-gamteng')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/phblogo?text1=${putih}&text2=${oren}`, mess.done)
      break
    case '/retro':
      if (!text) return jojo.reply(from, 'Masukkan tesk1-tesk2-tesk3')
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/neon?text1=${text2.split('-')[0]}&text2=${text2.split('-')[1]}&text3=${text2.split('-')[2]}`, mess.done)
      break
    case '/tahta':
      if (!text) return jojo.reply(from, 'Masukkan tesk!')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `https://api.vhtear.com/hartatahta?text=${text}&apikey=KEY`, mess.done)
      break
    case '/thunder':
      if (!text) return  jojo.reply(from, 'Masukkan tesk!')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/thunder?text=${text}`, mess.done)
      break
    case '/text3d':
      if (!text) return  jojo.reply(from, 'Masukkan tesk!')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/text3d?text=${text}`, mess.done)
      break
    case '/glitch':
      if (!text) return  jojo.reply(from, 'Masukkan tesk!')
      await jojo.reply(from, mess.wait)
      await jojo.sendImage(from, `http://docs-jojo.herokuapp.com/api/ttlogo?text1=${text2.split('-')[0]}&text2=${text2.split('-')[1]}`, mess.done)
      break
    case '/lirik':
      if (!text) return jojo.reply(from, 'Masukkan judul lagu!')
      try {
        const lirik = await liriklagu(text)
        await jojo.reply(from, lirik)
      } catch (error) {
        console.log(error)
        jojo.reply(from, 'Lirik tidak di temukan!')
      }
      break
    case '/igstalk':
      if (!text) return jojo.reply(from, 'Masukkan username!')
      try {
        const igstalk = await get.get('http://docs-jojo.herokuapp.com/api/stalk?username='+text).json()
        const { biography, edge_followed_by, edge_follow, full_name, is_private, profile_pic_url_hd, username, is_verified } = igstalk.graphql.user
        await jojo.sendImage(from, profile_pic_url_hd, `Username : ${username}
Name : ${full_name}
Bio : ${biography}
Follower : ${edge_followed_by.count}
Following : ${edge_follow.count}
Private : ${is_private}
Verified : ${is_verified}`)
      } catch (error) {
        console.log(error)
        jojo.reply(from, 'Username salah!')
      }
      break
    case '/twtstalk':
      if (!text) return jojo.reply(from, 'Masukkan username twitter!')
      try {
        const twtstalking = await get.get(`https://rest.farzain.com/api/twitter.php?id=${text}&apikey=PxQoVU8QqrdsQfy2eZJvik5Jv`).json()
        const { result } = await twtstalking
        const resulttwt = `Name : ${result.name}\nScreen Name: ${result.screen_name}\nDescription : ${result.description}\nFollowers : ${result.followers}\nFollowing : ${result.following}\nLikes : ${result.likes}\nTweet : ${result.tweet}\nJoined : ${result.joined}`
        await jojo.sendImage(from, result.profilepicture, resulttwt)
      } catch (error) {
        console.log(error)
        jojo.reply(from, 'Username salah!')
      }
      break
    case '/searchimg':
      if (!text) return jojo.reply(from, 'Masukkan query!')
      try {
        const gambarrndm = await get.get(`http://api.fdci.se/rep.php?gambar=${text}`).json()
        let rndomgmbr = gambarrndm[Math.floor(Math.random() * gambarrndm.length)]
        jojo.sendImage(from, rndomgmbr, '')
      } catch (error) {
        jojo.reply(from, 'Gambar tidak di temukan!')
      }
      break
    case '/iptracker':
      if (!text) return jojo.reply(from, 'Masukkan ip!')
      try {
        const trackaipi = await get.get(`http://ip-api.com/json/${text}?fields=66846719`).json()
        const { continent, continentCode, country, countryCode, region, regionName, city, district, zip, lat, lon, timezone, offset, currency, isp, org, as, PT, asname, reverse, mobile, proxy, hosting, query } = await trackaipi
        const trackiprslt = `Continent : ${continent}\nContinent Code : ${continentCode}\nCountry : ${country}\nCountry Code : ${countryCode}\nRegion : ${region}\nRegion Name : ${regionName}\nCity : ${city}\nDistrict : ${district}\nZip : ${zip}\nLatitude : ${lat}\nLongitude : ${lon}\nTimeZone : ${timezone}\nOffset : ${offset}\nCurrency : ${currency}\nISP : ${isp}\nORG : ${org}\nAS : ${as}\nAS Name : ${asname}\nReverse : ${reverse}\nMobile : ${mobile}\nProxy : ${proxy}\nHosting : ${hosting}\nQuery : ${query}`
        await jojo.reply(from, trackiprslt)
      } catch (error) {
        jojo.reply(from, 'IP Tidak valid!')
      }
      break
    case '/shorten':
      if (!text) return jojo.reply(from, 'Masukkan link')
      try {
        const shortener4 = await get.get(`https://rest.farzain.com/api/url.php?id=${text}&apikey=PxQoVU8QqrdsQfy2eZJvik5Jv`).json()
        const { url } = await shortener4
        const resultiny = `Original Url ${text}\n\nShortened link : ${url}`
        await jojo.reply(from, resultiny)
      } catch (error) {
        jojo.reply(from, 'Link tidak valid!')
      }
      break
    case '/wp':
      if (!text) return jojo.reply(from, 'Masukkan query wallpaper!')
      try {
        const wprndm = await get.get(`https://api.fdci.se/rep.php?gambar=wallpaper ${text}`).json()
        let wprndom = wprndm[Math.floor(Math.random() * wprndm.length)]
        await jojo.sendImage(from, wprndom, '')
      } catch (error) {
        jojo.reply(from, 'Wallpaper tidak di temukan')
      }
      break
    case '/kbbi':
      if (!text) return jojo.reply(from, 'Masukkan query pencarian kbbi!')
      try {
        const apikbbi = await get.get('https://mnazria.herokuapp.com/api/kbbi?search='+ text).json()
        await jojo.reply(from, apikbbi.result[0])
      } catch (error) {
        jojo.reply(from, 'Tidak di temukan!')
      }
      break
    case '/fs':
      if (!text) return jojo.reply(from, 'Masukkan namamu!')
      await jojo.sendImage(from, `https://rest.farzain.com/api/special/fansign/indo/viloid.php?apikey=rambu&text=${text}`)
      break
    case '/fs2':
      if (!text) return jojo.reply(from, 'Masukkan namamu!')
      await jojo.sendImage(from, `https://rest.farzain.com/api/special/fansign/cosplay/cosplay.php?apikey=rambu&text=${text}`)
      break 
    case '/tts':
      const ttsId = require('node-gtts')('id')
      const ttsEn = require('node-gtts')('en')
      const ttsJp = require('node-gtts')('ja')
      const ttsAr = require('node-gtts')('ar')
      const ttsRu = require('node-gtts')('ru')
      const dataText = text2.split('-')[1]
      if (msg.text.match('/tts jp ah')) return jojo.sendPtt(from, './media/desah.mp3')
      if (dataText === '') return jojo.reply(from, 'apaan?')
      if (dataText.length > 250) return jojo.reply(from, 'Teks terlalu panjang!')
      var dataBhs = text2.split('-')[0]
      if (!dataBhs) return jojo.reply(from, 'Masukkan kode bahasa!')
      if (dataBhs == 'id') {
          ttsId.save('./tts/resId.mp3', dataText, function () {
              jojo.sendPtt(from, './tts/resId.mp3')
          })
      } else if (dataBhs == 'en') {
          ttsEn.save('./tts/resEn.mp3', dataText, function () {
              jojo.sendPtt(from, './tts/resEn.mp3')
          })
      } else if (dataBhs == 'jp') {
          ttsJp.save('./tts/resJp.mp3', dataText, function () {
              jojo.sendPtt(from, './tts/resJp.mp3')
          })
      } else if (dataBhs == 'ar') {
          ttsAr.save('./tts/resAr.mp3', dataText, function () {
              jojo.sendPtt(from, './tts/resAr.mp3')
          })
      } else if (dataBhs == 'ru') {
          ttsAr.save('./tts/resRu.mp3', dataText, function () {
              jojo.sendPtt(from, './tts/resRu.mp3')
          })
      } else {
          jojo.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab')
      }
      break
      //BELLOW
    default:
      if (tesk.startsWith(prefix)){
        jojo.reply(from, `Maaf ${pushname}, Perintah ${commands}  Tidak Tersedia`)
      }
  }
}catch (e){
}
})
