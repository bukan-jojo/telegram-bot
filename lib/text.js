exports.CONSOLE = () => {
    return `
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     ██╗ █████╗      ██╗ █████╗       ██████╗  █████╗ ████████╗
     ██║██╔══██╗     ██║██╔══██╗      ██╔══██╗██╔══██╗╚══██╔══╝
     ██║██║  ██║     ██║██║  ██║█████╗██████╦╝██║  ██║   ██║
██╗  ██║██║  ██║██╗  ██║██║  ██║╚════╝██╔══██╗██║  ██║   ██║
╚█████╔╝╚█████╔╝╚█████╔╝╚█████╔╝      ██████╦╝╚█████╔╝   ██║
 ╚════╝  ╚════╝  ╚════╝  ╚════╝       ╚═════╝  ╚════╝    ╚═╝
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
}


exports.START = (name) => {
    return `
Hai ${name},
Selamat datang di jojo bot!
Silahkan ketik /menu

Lihat tips nya yah 🥺
biar ngerti cara pake bot nya..
ketik /tips

Created By Jo
https://instagram.com/call_me.jojo`
}

exports.MENU = (runtime, Hit) => {
    return `
ஜ۩۞۩ஜ ĴØĴØ-βØŦ ஜ۩۞۩ஜ
Created By Jo
https://instagram.com/call_me.jojo/

BERJALAN SELAMA
${runtime()}

Total Hit : ${Hit}

Fitur yang tersedia
➥1./tiktok 𝒍𝒊𝒏𝒌
➥2./fb 𝒍𝒊𝒏𝒌
➥3./pin 𝒍𝒊𝒏𝒌
➥4./alay 𝒕𝒆𝒙𝒕
➥5./randomnama 𝒄𝒐𝒘𝒐/𝒄𝒆𝒘𝒆
➥6./namaninja 𝒏𝒂𝒎𝒂
➥7./quotes
➥8./pantun
➥9./gombal
➥10./hilih 𝒕𝒆𝒙𝒕
➥11./jodoh 𝒏𝒂𝒎𝒂1-𝒏𝒂𝒎𝒂2 
➥12./jodoh 𝒏𝒂𝒎𝒂1-𝒏𝒂𝒎𝒂2-𝒏𝒂𝒎𝒂3
➥13./pasangan 𝒏𝒂𝒎𝒂 𝒎𝒖-𝒏𝒂𝒎𝒂 𝒑𝒂𝒔𝒂𝒏𝒈𝒂𝒏
➥14./cowo
➥15./cewe
➥16./apakah 𝙥𝙚𝙧𝙩𝙖𝙣𝙮𝙖𝙖𝙣
➥17./gay 𝒏𝒂𝒎𝒂
➥18./fakta
➥19./meme
➥20./katacinta
➥21./twitchquote
➥22./fml
➥23./news
➥24./corona
➥25./covid 𝙣𝙚𝙜𝙖𝙧𝙖
➥26./wiki 𝙦𝙪𝙚𝙧𝙮
➥27./tvnow
➥28./tv 𝙨𝙖𝙡𝙪𝙧𝙖𝙣
➥29./bmkg
➥30./biografi 𝙩𝙤𝙠𝙤𝙝
➥31./film 𝙟𝙪𝙙𝙪𝙡
➥32./beasiswa 𝙣𝙚𝙜𝙖𝙧𝙖
➥33./ptn 𝙠𝙤𝙩𝙖
➥34./indoxxi 𝙟𝙪𝙙𝙪𝙡
➥35./bioskop 𝙢𝙖𝙡𝙡
➥36./pribahasa 𝙦𝙪𝙚𝙧𝙮
➥37./trendingtwt
➥38./infohoax
➥39./quran 𝙦𝙪𝙚𝙧𝙮
➥40./renungan
➥41./alkitab 𝙦𝙪𝙚𝙧𝙮
➥42./alkitabharian
➥43./waifu
➥44./anime 𝙟𝙪𝙙𝙪𝙡
➥45./quoteanime
➥46./kusonime 𝙟𝙪𝙙𝙪𝙡
➥47./neonime
➥48./cat
➥49./pokemon
➥50./dog
➥51./qrcode 𝙩𝙚𝙭𝙩
➥52./makememe 𝒈𝒂𝒎𝒃𝒂𝒓 + 𝒄𝒂𝒑𝒕𝒊𝒐𝒏 𝒎𝒂𝒌𝒆𝒎𝒆𝒎𝒆 𝒂𝒕𝒂𝒔-𝒃𝒂𝒘𝒂𝒉
➥53./blackpink 𝙩𝙚𝙭𝙩
➥54./pornhub 𝙩𝙚𝙭𝙩1-𝙩𝙚𝙭𝙩2
➥55./retro 𝙩𝙚𝙭𝙩1-𝙩𝙚𝙭𝙩2-𝙩𝙚𝙭𝙩3
➥56./tahta 𝙣𝙖𝙢𝙖𝙢𝙪
➥57./thunder 𝙩𝙚𝙭𝙩
➥58./text3d 𝙩𝙚𝙭𝙩
➥59./glitch 𝙩𝙚𝙭𝙩1-𝙩𝙚𝙭𝙩2
➥60./lirik 𝙟𝙪𝙙𝙪𝙡
➥61./igstalk 𝙪𝙨𝙚𝙧𝙣𝙖𝙢𝙚
➥62./twtstalk 𝙪𝙨𝙚𝙧𝙣𝙖𝙢𝙚
➥63./searchimg 𝙦𝙪𝙚𝙧𝙮
➥64./iptracker 𝙞𝙥 𝙖𝙙𝙙𝙧𝙚𝙨𝙨
➥65./shorten 𝙡𝙞𝙣𝙠
➥66./wp 𝙦𝙪𝙚𝙧𝙮
➥67./kbbi 𝙦𝙪𝙚𝙧𝙮
➥68./fs 𝙣𝙖𝙢𝙖
➥69./f2 𝙣𝙖𝙢𝙖
➥70./tts 𝙠𝙤𝙙𝙚 𝙗𝙖𝙝𝙖𝙨𝙖-𝙩𝙚𝙨𝙠
`
}