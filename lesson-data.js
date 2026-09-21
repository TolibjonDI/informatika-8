const LESSON_TOPICS = [
  {
    "id": "networks",
    "title": "Kompyuter tarmoqlari va asosiy tushunchalar",
    "keywords": [
      "tarmoq",
      "internet",
      "network"
    ],
    "words": [
      [
        "TARMOQ",
        "Ma’lumot almashish va resurslardan birgalikda foydalanish uchun bog‘langan qurilmalar tizimi nima?"
      ],
      [
        "INTERNET",
        "Dunyo bo‘ylab ko‘plab kompyuter tarmoqlarini birlashtiruvchi global tizim nima?"
      ],
      [
        "LAN",
        "Cheklangan hududdagi lokal tarmoqning uch harfli inglizcha qisqartmasi qanday?"
      ],
      [
        "WAN",
        "Uzoq hududlardagi tarmoqlarni bog‘laydigan keng hududli tarmoqning inglizcha qisqartmasi qanday?"
      ],
      [
        "SERVER",
        "Tarmoqdagi mijozlarga xizmat yoki resurs taqdim etuvchi kompyuter yoki dastur nima?"
      ],
      [
        "MIJOZ",
        "Serverga so‘rov yuborib, undan xizmat oladigan dastur yoki qurilma qanday ataladi?"
      ],
      [
        "KABEL",
        "Simli tarmoqda qurilmalarni bog‘lash uchun ishlatiladigan uzatish vositasi nima?"
      ],
      [
        "WIFI",
        "Qurilmalarni lokal tarmoqqa simsiz ulash texnologiyasining nomi nima? Defissiz yozing."
      ],
      [
        "PAKET",
        "Tarmoq orqali uzatiladigan, ma’lumot va xizmat axborotini o‘z ichiga olgan birlik nima?"
      ],
      [
        "PROTOKOL",
        "Tarmoqda ma’lumot almashish qoidalari majmui nima?"
      ]
    ],
    "errors": [
      {
        "title": "LAN va WAN almashib qolgan",
        "text": "O‘quvchi lokal va keng hududli tarmoqlarni quyidagicha tushuntirdi. Xatoni tuzatuvchi javobni tanlang.",
        "code": "“LAN uzoq hududlarni qamrab oladi, WAN esa faqat bitta sinf ichida ishlaydi.”",
        "options": [
          "LAN cheklangan hududdagi lokal tarmoq, WAN esa keng hududlarni bog‘lovchi tarmoq.",
          "LAN ham, WAN ham faqat bitta kompyuterdan iborat.",
          "LAN simsiz, WAN esa faqat simli tarmoq degani."
        ],
        "correct": 0,
        "why": "LAN sinf, bino yoki yaqin hududdagi qurilmalarni birlashtiradi. WAN esa uzoq hududlardagi tarmoqlarni bog‘laydi. Bu atamalar simli yoki simsiz ulanishni bildirmaydi."
      },
      {
        "title": "Wi-Fi internet deganimi?",
        "text": "Noutbuk Wi-Fi tarmog‘iga ulangan, ammo internet saytlari ochilmayapti. O‘quvchining quyidagi fikrini tuzating.",
        "code": "“Wi-Fi ga ulansam, internet har doim ishlashi shart.”",
        "options": [
          "Wi-Fi belgisi ko‘rinsa, barcha saytlar albatta ochiladi.",
          "Wi-Fi lokal tarmoqqa simsiz ulanishni beradi; internetga chiqish alohida ulanishga ham bog‘liq.",
          "Internetdan faqat kabel bilan foydalanish mumkin."
        ],
        "correct": 1,
        "why": "Wi-Fi qurilmani simsiz tarmoqqa ulaydi. Shu tarmoqda internetga chiqish bo‘lmasa yoki u ishlamasa, qurilma Wi-Fi ga ulangan bo‘lsa ham internet saytlari ochilmasligi mumkin."
      },
      {
        "title": "IP-manzilning vazifasi",
        "text": "O‘quvchi IP-manzilni Wi-Fi paroli bilan adashtirdi. Qaysi javob uning xatosini tuzatadi?",
        "code": "“IP-manzil — Wi-Fi tarmog‘iga kirish uchun yoziladigan maxfiy parol.”",
        "options": [
          "IP-manzil — foydalanuvchining elektron pochta paroli.",
          "IP-manzil — faqat veb-saytning nomi.",
          "IP-manzil — IP tarmog‘ida qurilma interfeysini manzillash va ma’lumot yetkazishda ishlatiladigan manzil."
        ],
        "correct": 2,
        "why": "IP-manzil ma’lumotni kerakli tarmoq manziliga yetkazishda ishlatiladi. Wi-Fi paroli esa himoyalangan simsiz tarmoqqa ulanish uchun kerak. Ularning vazifalari boshqa-boshqa."
      },
      {
        "title": "Router va kommutator",
        "text": "O‘quvchi router vazifasini quyidagicha izohladi. To‘g‘ri tuzatishni tanlang.",
        "code": "“Router faqat bitta lokal tarmoq ichidagi qurilmalarni bog‘laydi, boshqa tarmoqqa paket uzatmaydi.”",
        "options": [
          "Router turli IP tarmoqlari orasida paketlarni yo‘naltiradi.",
          "Router faqat kompyuterga matn kiritish uchun ishlatiladi.",
          "Router faqat fayllarni qog‘ozga chiqaradi."
        ],
        "correct": 0,
        "why": "Router paketlarni turli IP tarmoqlari orasida yo‘naltiradi. Kommutator esa odatda bitta lokal tarmoqdagi qurilmalarni bog‘laydi. Uy routeri bitta korpusda kommutator va Wi-Fi kirish nuqtasi vazifalarini ham bajarishi mumkin."
      },
      {
        "title": "Server va mijoz",
        "code": "Server mijozdan xizmat so‘raydi, mijoz esa barcha so‘rovlarga xizmat ko‘rsatadi.",
        "options": [
          "Mijoz serverdan xizmat so‘raydi, server so‘rovga javob beradi.",
          "Server faqat klaviatura degani.",
          "Mijoz va serverning tarmoqqa aloqasi yo‘q."
        ],
        "correct": 0,
        "why": "Mijoz so‘rov yuboradi, server esa xizmat yoki resurs taqdim etadi."
      },
      {
        "title": "DNS vazifasi",
        "code": "DNS kompyuter ekranining yorqinligini o‘zgartiradi.",
        "options": [
          "DNS faylni chop etadi.",
          "DNS domen nomiga mos IP-manzilni aniqlashga yordam beradi.",
          "DNS monitorni yoqadi."
        ],
        "correct": 1,
        "why": "DNS domen nomlarini tarmoq manzillari bilan bog‘lashda ishlatiladi."
      },
      {
        "title": "Paket nima?",
        "code": "Tarmoq paketi — kompyuterning qog‘oz qutisi.",
        "options": [
          "Paket faqat kompyuter qutisi.",
          "Paket — ekran turi.",
          "Paket — tarmoqda uzatiladigan ma’lumot va xizmat axboroti birligi."
        ],
        "correct": 2,
        "why": "Ma’lumotlar tarmoq orqali paketlar ko‘rinishida uzatilishi mumkin."
      },
      {
        "title": "Yulduz topologiyasi",
        "code": "Yulduz topologiyasida barcha qurilmalar yopiq halqa hosil qiladi.",
        "options": [
          "Yulduzda qurilmalar markaziy qurilmaga ulanadi.",
          "Yulduzda qurilmalar umuman ulanmaydi.",
          "Yulduz faqat bitta monitordan iborat."
        ],
        "correct": 0,
        "why": "Yopiq aylana halqa topologiyasiga, markaziy qurilma esa yulduz topologiyasiga xos."
      },
      {
        "title": "Brauzer nima?",
        "code": "Brauzer — internet kabelining nomi.",
        "options": [
          "Brauzer elektr rozetkasidir.",
          "Brauzer veb-sahifalarni ko‘rish dasturidir.",
          "Brauzer faqat printer turi."
        ],
        "correct": 1,
        "why": "Brauzer dastur, kabel esa jismoniy ulanish vositasidir."
      },
      {
        "title": "Umumiy resurs",
        "code": "Tarmoqda printerni bir nechta kompyuter birgalikda ishlata olmaydi.",
        "options": [
          "Printer faqat internet sayti.",
          "Har bir hujjat uchun alohida printer kerak.",
          "Ruxsat va sozlamalar bo‘lsa, tarmoq printeridan bir nechta kompyuter foydalanadi."
        ],
        "correct": 2,
        "why": "Tarmoq fayl, printer va boshqa resurslardan birgalikda foydalanish imkonini beradi."
      }
    ],
    "algorithms": [
      {
        "title": "LAN — lokal tarmoqqa kabel orqali ulanish",
        "steps": [
          "Kompyuterning Ethernet porti va kommutatorning bo‘sh portini topish",
          "Tarmoq kabelining bir uchini kompyuterning Ethernet portiga ulash",
          "Kabelning ikkinchi uchini kommutatorning bo‘sh portiga ulash",
          "Qurilmalar orasida ulanish indikatori yonganini tekshirish",
          "Tarmoq sozlamalarida simli ulanish holatini ko‘rish"
        ]
      },
      {
        "title": "Wi-Fi — simsiz tarmoqqa ulanish",
        "steps": [
          "Qurilmada Wi-Fi funksiyasini yoqish",
          "Mavjud simsiz tarmoqlar ro‘yxatini ochish",
          "O‘qituvchi ko‘rsatgan tarmoq nomini tanlash",
          "Tanlangan himoyalangan tarmoq parolini kiritish",
          "Ulanishni tasdiqlash",
          "Tanlangan tarmoqqa ulanish holatini tekshirish"
        ]
      },
      {
        "title": "IP-manzil — qurilmaning tarmoq manzilini ko‘rish",
        "steps": [
          "Qurilmaning sozlamalarini ochish",
          "Tarmoq va internet sozlamalari bo‘limiga kirish",
          "Hozir faol bo‘lgan tarmoq ulanishini tanlash",
          "Tanlangan ulanishning xususiyatlari yoki tafsilotlarini ochish",
          "IP-manzil qatorini topib, ko‘rsatilgan manzilni yozib olish"
        ]
      },
      {
        "title": "Mijoz va server — ma’lumot so‘rash",
        "steps": [
          "Mijoz dasturida kerakli ma’lumot uchun so‘rov tayyorlanadi",
          "Mijoz so‘rovni tarmoq orqali serverga yuboradi",
          "Server kelgan so‘rovni qabul qilib, qayta ishlaydi",
          "Server tayyor javobni mijozga yuboradi",
          "Mijoz javobni qabul qilib, foydalanuvchiga ko‘rsatadi"
        ]
      },
      {
        "title": "DNS — domen nomidan IP-manzilni topish",
        "steps": [
          "Brauzerga saytning domen nomi kiritiladi; bu misolda uning manzili keshda yo‘q",
          "Qurilma domen nomini aniqlash uchun DNS xizmatiga so‘rov yuboradi",
          "DNS xizmati so‘ralgan domen uchun IP-manzilni aniqlaydi",
          "DNS javobidagi IP-manzil qurilmaga qaytariladi",
          "Brauzer olingan IP-manzil yordamida sayt serveriga ulanishni boshlaydi"
        ]
      },
      {
        "title": "Paket — ma’lumotni qismlarga ajratib uzatish",
        "steps": [
          "Yuboruvchi qurilmada uzatiladigan ma’lumot tayyorlanadi",
          "Ma’lumot qismlarga ajratilib, uzatish uchun paketlarga joylanadi",
          "Paketlar tarmoq orqali qabul qiluvchi tomonga uzatiladi",
          "Qabul qiluvchi qurilma kelgan paketlarni qabul qiladi",
          "Kerakli qismlar tartiblanib, dastlabki ma’lumot qayta tiklanadi"
        ]
      },
      {
        "title": "Router — paketni boshqa tarmoqqa yo‘naltirish",
        "steps": [
          "Kompyuter boshqa tarmoqdagi manzilga atalgan paketni routerga yuboradi",
          "Router paketni qabul qiladi",
          "Router paketdagi qabul qiluvchining IP-manzilini ko‘rib chiqadi",
          "Router yo‘naltirish jadvali asosida mos keyingi yo‘lni tanlaydi",
          "Router paketni tanlangan yo‘l orqali uzatadi"
        ]
      },
      {
        "title": "Umumiy papka — lokal tarmoqdagi faylni olish",
        "steps": [
          "Kompyuterni maktabning ruxsat etilgan lokal tarmog‘iga ulash",
          "Fayl menejerida o‘qituvchi bergan umumiy papka manzilini ochish",
          "O‘qishga ruxsat berilgan kerakli faylni tanlash",
          "Tanlangan faylni nusxalash",
          "Kompyuterdagi shaxsiy dars papkasini ochish",
          "Nusxani joylashtirib, fayl ochilishini tekshirish"
        ]
      },
      {
        "title": "Tarmoq printeri — hujjatni chop etish",
        "steps": [
          "Kompyuter printer bilan bir tarmoqqa ulanganini tekshirish; printer oldindan sozlangan",
          "Chop etiladigan hujjatni ochish",
          "Hujjatda chop etish oynasini ochish",
          "Ro‘yxatdan o‘qituvchi ko‘rsatgan tarmoq printerini tanlash",
          "Sahifalar va nusxalar sonini belgilab, chop etishni tasdiqlash",
          "Chop etish tugagach, hujjatni printerdan olish"
        ]
      },
      {
        "title": "Internet — veb-sahifani ochish",
        "steps": [
          "Qurilmaning internetga ulanganini tekshirish",
          "Brauzerni ishga tushirish",
          "Manzil satriga o‘qituvchi bergan veb-manzilni kiritish",
          "Enter tugmasini bosib, sahifani so‘rash",
          "Sahifa yuklanishini kutish",
          "Ochilgan sahifa kerakli sayt ekanini tekshirish"
        ]
      }
    ]
  },
  {
    "id": "algorithms",
    "title": "Algoritmlar va dasturlash asoslari",
    "keywords": [
      "algoritm",
      "dasturlash",
      "python"
    ],
    "words": [
      [
        "ALGORITM",
        "Masalani yechish uchun aniq amallar ketma-ketligi nima?"
      ],
      [
        "DASTUR",
        "Kompyuter bajarishi uchun yozilgan buyruqlar to‘plami nima?"
      ],
      [
        "SIKL",
        "Amallarni qayta-qayta bajaradigan tuzilma nima?"
      ],
      [
        "SHART",
        "Tarmoqlanishda rost yoki yolg‘onligi tekshiriladigan ifoda nima?"
      ],
      [
        "BLOK",
        "Blok-sxemada alohida amalni ifodalovchi shakl nima deb ataladi?"
      ],
      [
        "KIRITISH",
        "Dasturga boshlang‘ich ma’lumotlarni berish amali nima?"
      ],
      [
        "NATIJA",
        "Algoritm bajarilgach olinadigan yakuniy ma’lumot nima?"
      ],
      [
        "BUYRUQ",
        "Ijrochiga bajarish uchun beriladigan ko‘rsatma nima?"
      ],
      [
        "IJROCHI",
        "Algoritm buyruqlarini bajaradigan shaxs yoki qurilma nima?"
      ],
      [
        "TAKRORLASH",
        "Amalni bir necha marta bajarish jarayoni nima?"
      ]
    ],
    "errors": [
      {
        "title": "Amallar tartibi",
        "code": "a + b / 2 har doim ikki sonning o‘rta arifmetigini beradi.",
        "options": [
          "(a + b) / 2 yozish kerak.",
          "a * b yozish kerak.",
          "a - b yozish kerak."
        ],
        "correct": 0,
        "why": "Qavs yig‘indini bo‘lishdan oldin hisoblashni ta’minlaydi."
      },
      {
        "title": "Algoritm aniqligi",
        "code": "Algoritm qadamlari ijrochi uchun noaniq bo‘lishi mumkin.",
        "options": [
          "Qadamlar umuman kerak emas.",
          "Qadamlar aniq va tushunarli bo‘lishi kerak.",
          "Natija doim tasodifiy bo‘ladi."
        ],
        "correct": 1,
        "why": "Ijrochi har bir buyruqni qanday bajarishini bilishi kerak."
      },
      {
        "title": "Boshlang‘ich ma’lumot",
        "code": "Son kiritilmasdan turib uning qiymatini hisobda ishlatish mumkin.",
        "options": [
          "Har doim mumkin.",
          "Son o‘rniga istalgan harf yetarli.",
          "Qiymat kiritilishi yoki oldindan berilishi kerak."
        ],
        "correct": 2,
        "why": "Amalda ishlatiladigan qiymat avval aniqlangan bo‘lishi kerak."
      },
      {
        "title": "Takrorlanish",
        "code": "Sikl faqat bir marta bajariladigan buyruqdir.",
        "options": [
          "Sikl amallarni takrorlashga xizmat qiladi.",
          "Sikl faqat matn rangi.",
          "Sikl kompyuter qurilmasi."
        ],
        "correct": 0,
        "why": "Sikl shartga yoki takrorlash soniga ko‘ra ishlaydi."
      },
      {
        "title": "Tarmoqlanish",
        "code": "Shart natijasi keyingi amallar tanloviga ta’sir qilmaydi.",
        "options": [
          "Har ikkala yo‘l doim birga bajariladi.",
          "Shartga qarab tegishli yo‘l tanlanadi.",
          "Shart faqat bezak uchun."
        ],
        "correct": 1,
        "why": "Tarmoqlanish rost va yolg‘on holatlar uchun yo‘l tanlaydi."
      },
      {
        "title": "Juft son",
        "code": "n % 2 = 1 bo‘lsa, n juft son.",
        "options": [
          "Barcha sonlar juft.",
          "Qoldiqning ahamiyati yo‘q.",
          "Juft butun sonni 2 ga bo‘lgandagi qoldiq 0 bo‘ladi."
        ],
        "correct": 2,
        "why": "Juft butun sonlar 2 ga qoldiqsiz bo‘linadi."
      },
      {
        "title": "Ijrochi",
        "code": "Algoritmni faqat odam bajarishi mumkin.",
        "options": [
          "Odam ham, mos qurilma ham ijrochi bo‘lishi mumkin.",
          "Faqat qog‘oz ijrochi bo‘ladi.",
          "Kompyuter buyruq bajarmaydi."
        ],
        "correct": 0,
        "why": "Ijrochi berilgan buyruqlarni bajarishga qodir bo‘lishi kerak."
      },
      {
        "title": "Yuza formulasi",
        "code": "To‘g‘ri to‘rtburchak yuzi S = a + b.",
        "options": [
          "S = a - b.",
          "S = a × b.",
          "S = a / b."
        ],
        "correct": 1,
        "why": "Uzunlik va en ko‘paytiriladi."
      },
      {
        "title": "Cheksiz sikl",
        "code": "Sikl sharti doim rost bo‘lsa ham, sikl albatta o‘zi tugaydi.",
        "options": [
          "Sikl bir marta ishlaydi.",
          "Sikl umuman boshlanmaydi.",
          "Chiqish yo‘li bo‘lmasa, sikl davom etaveradi."
        ],
        "correct": 2,
        "why": "Tugash uchun shart o‘zgarishi yoki chiqish buyrug‘i kerak."
      },
      {
        "title": "Natijani tekshirish",
        "code": "Dastur bir marta ishlasa, barcha kirishlar uchun to‘g‘ri ekani isbotlanadi.",
        "options": [
          "Turli, jumladan chegara qiymatlar bilan tekshirish kerak.",
          "Boshqa qiymat kiritish shart emas.",
          "Xatolarni tuzatib bo‘lmaydi."
        ],
        "correct": 0,
        "why": "Bitta sinov barcha holatlarni qamramaydi."
      }
    ],
    "algorithms": [
      {
        "title": "Ikki son yig‘indisi",
        "steps": [
          "Boshlash",
          "a va b sonlarini kiritish",
          "s = a + b ni hisoblash",
          "s ni ekranga chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "O‘rta arifmetik",
        "steps": [
          "Boshlash",
          "a va b ni kiritish",
          "Yig‘indi = a + b ni hisoblash",
          "m = Yig‘indi / 2 ni hisoblash",
          "m ni chiqarib, tugatish"
        ]
      },
      {
        "title": "To‘g‘ri to‘rtburchak yuzi",
        "steps": [
          "Boshlash",
          "Uzunlik a va en b ni kiritish",
          "S = a × b ni hisoblash",
          "S ni chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "Sonning juft yoki toqligi",
        "steps": [
          "Boshlash",
          "n butun sonini kiritish",
          "r = n % 2 qoldig‘ini hisoblash",
          "r = 0 bo‘lsa “Juft”, aks holda “Toq” chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "Ikki sondan kattasi",
        "steps": [
          "Boshlash",
          "a va b ni kiritish",
          "a > b shartini tekshirish",
          "Rost bo‘lsa a ni, aks holda b ni chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "1 dan 5 gacha chiqarish",
        "steps": [
          "i = 1 deb olish",
          "i ≤ 5 shartini tekshirish",
          "Shart rost bo‘lsa i ni chiqarish",
          "i ni 1 ga oshirib, shart tekshiruviga qaytish",
          "Shart yolg‘on bo‘lganda tugatish"
        ]
      },
      {
        "title": "Uch son yig‘indisi",
        "steps": [
          "Boshlash",
          "a, b va c sonlarini kiritish",
          "s = a + b ni hisoblash",
          "s = s + c ni hisoblash",
          "s ni chiqarib, tugatish"
        ]
      },
      {
        "title": "Musbat sonni tekshirish",
        "steps": [
          "Boshlash",
          "x sonini kiritish",
          "x > 0 shartini tekshirish",
          "Rost bo‘lsa “Musbat”, aks holda “Musbat emas” chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "Berilgan sonning kvadrati",
        "steps": [
          "Boshlash",
          "x sonini kiritish",
          "y = x × x ni hisoblash",
          "y ni chiqarish",
          "Tugatish"
        ]
      },
      {
        "title": "Dasturdagi xatoni tuzatish",
        "steps": [
          "Xato berayotgan dasturni ishga tushirish",
          "Xato xabarini o‘qib, tegishli qatorni topish",
          "Xato sababini aniqlash",
          "Koddagi xatoni tuzatish",
          "Dasturni qayta ishga tushirib, natijani tekshirish"
        ]
      }
    ]
  },
  {
    "id": "hardware",
    "title": "Kompyuter qurilmalari",
    "keywords": [
      "qurilma",
      "hardware",
      "kompyuter qismlari"
    ],
    "words": [
      [
        "MONITOR",
        "Tasvir va matnlarni ekranda ko‘rsatadigan qurilma nima?"
      ],
      [
        "KLAVIATURA",
        "Matn va buyruqlarni tugmalar bilan kiritadigan qurilma nima?"
      ],
      [
        "SICHQONCHA",
        "Ekrandagi ko‘rsatkichni boshqaradigan qurilma nima?"
      ],
      [
        "PROTSESSOR",
        "Asosiy hisoblashlar va buyruqlarni bajaradigan qism nima?"
      ],
      [
        "PRINTER",
        "Hujjatni qog‘ozga chiqaradigan qurilma nima?"
      ],
      [
        "SKANER",
        "Qog‘ozdagi tasvirni raqamlashtiradigan qurilma nima?"
      ],
      [
        "MIKROFON",
        "Ovozni kompyuterga kiritadigan qurilma nima?"
      ],
      [
        "XOTIRA",
        "Ma’lumot va buyruqlar saqlanadigan qism umumiy qanday ataladi?"
      ],
      [
        "MODEM",
        "Aloqa kanali uchun signallarni modulyatsiya va demodulyatsiya qiluvchi qurilma nima?"
      ],
      [
        "KAMERA",
        "Video va tasvirlarni kompyuterga kiritadigan qurilma nima?"
      ]
    ],
    "errors": [
      {
        "title": "Monitor vazifasi",
        "code": "Monitor matnni qog‘ozga chiqaradi.",
        "options": [
          "Monitor ma’lumotni ekranda ko‘rsatadi.",
          "Monitor ovoz yozadi.",
          "Monitor qog‘ozni skanerlaydi."
        ],
        "correct": 0,
        "why": "Qog‘ozga chiqarish printerning vazifasi."
      },
      {
        "title": "Klaviatura",
        "code": "Klaviatura faqat ma’lumot chiqarish qurilmasi.",
        "options": [
          "Klaviatura xotira turi.",
          "Klaviatura ma’lumot kiritish qurilmasi.",
          "Klaviatura ekran turi."
        ],
        "correct": 1,
        "why": "Tugmalar orqali matn va buyruqlar kiritiladi."
      },
      {
        "title": "Skaner",
        "code": "Skaner qog‘ozga siyoh sepib chop etadi.",
        "options": [
          "Skaner faqat ovoz chiqaradi.",
          "Skaner elektr manbai.",
          "Skaner qog‘ozdagi tasvirni raqamlashtiradi."
        ],
        "correct": 2,
        "why": "Skaner kiritish, printer esa chiqarish qurilmasidir."
      },
      {
        "title": "Mikrofon",
        "code": "Mikrofon ovozni foydalanuvchiga eshittiradi.",
        "options": [
          "Mikrofon ovozni kompyuterga kiritadi.",
          "Mikrofon faylni chop etadi.",
          "Mikrofon tasvir ko‘rsatadi."
        ],
        "correct": 0,
        "why": "Ovozni eshittirish karnay yoki quloqchinning vazifasi."
      },
      {
        "title": "Protsessor",
        "code": "Protsessor faqat qog‘oz saqlaydi.",
        "options": [
          "Protsessor faqat ekran.",
          "Protsessor buyruqlarni bajaradi va hisoblaydi.",
          "Protsessor sichqoncha tugmasi."
        ],
        "correct": 1,
        "why": "Protsessor hisoblash va boshqarish amallarini bajaradi."
      },
      {
        "title": "Tezkor xotira",
        "code": "Oddiy RAM quvvat uzilganda ham hamma ma’lumotni saqlaydi.",
        "options": [
          "RAM faqat qog‘oz nusxa.",
          "RAM monitor nomi.",
          "Odatdagi RAM quvvat uzilganda ma’lumotni yo‘qotadi."
        ],
        "correct": 2,
        "why": "Doimiy saqlash uchun SSD kabi saqlash qurilmasi kerak."
      },
      {
        "title": "Printer",
        "code": "Printer faqat kiritish qurilmasi.",
        "options": [
          "Printer ma’lumotni qog‘ozga chiqaradi.",
          "Printer matnni klaviaturada teradi.",
          "Printer ko‘rsatkichni boshqaradi."
        ],
        "correct": 0,
        "why": "Printer chiqarish qurilmasiga kiradi."
      },
      {
        "title": "Sichqoncha",
        "code": "Sichqoncha ekrandagi ko‘rsatkichga ta’sir qilmaydi.",
        "options": [
          "Sichqoncha faqat ovoz yozadi.",
          "Sichqoncha ko‘rsatkichni boshqaradi.",
          "Sichqoncha qog‘oz uzatadi."
        ],
        "correct": 1,
        "why": "Sichqoncha tanlash, bosish va sudrashda ishlatiladi."
      },
      {
        "title": "Kamera",
        "code": "Veb-kamera faqat matn chop etish uchun.",
        "options": [
          "Kamera faqat hisoblaydi.",
          "Kamera faqat qog‘oz saqlaydi.",
          "Kamera tasvir va videoni kiritadi."
        ],
        "correct": 2,
        "why": "Veb-kamera tasvirni raqamli shaklda qabul qilishga xizmat qiladi."
      },
      {
        "title": "Xavfsiz chiqarish",
        "code": "Fayl yozilayotgan paytda USB xotirani tortib olish xavfsiz.",
        "options": [
          "Yozish tugashini kutib, xavfsiz chiqarish kerak.",
          "Qancha tez uzilsa shuncha yaxshi.",
          "USB xotirada fayl bo‘lmaydi."
        ],
        "correct": 0,
        "why": "Yozish vaqtida uzish faylning buzilishiga olib kelishi mumkin."
      }
    ],
    "algorithms": [
      {
        "title": "Printerda hujjat chiqarish",
        "steps": [
          "Kompyuterda hujjatni ochish",
          "Chop etish oynasini ochish",
          "Kerakli printerni tanlash",
          "Sahifalar va nusxalar sonini belgilash",
          "Chop etishni tasdiqlab, nusxani olish"
        ]
      },
      {
        "title": "Skaner orqali rasm olish",
        "steps": [
          "Hujjatni skanerga to‘g‘ri joylashtirish",
          "Kompyuterda skanerlash dasturini ochish",
          "Skanerlash parametrlarini tanlash",
          "Skanerlashni boshlash va tugashini kutish",
          "Olingan tasvirni faylga saqlash"
        ]
      },
      {
        "title": "Mikrofon bilan ovoz yozish",
        "steps": [
          "Mikrofonni kompyuterga ulash",
          "Ovoz yozish dasturini ochish",
          "Dasturda mikrofonni kirish manbai sifatida tanlash",
          "Yozishni boshlab, gapirish",
          "Yozishni to‘xtatib, faylni saqlash"
        ]
      },
      {
        "title": "Kamera bilan surat olish",
        "steps": [
          "Kamerani kompyuterga ulash",
          "Kamera dasturini ochish",
          "Tasvir ko‘rinishini tekshirib, kamerani yo‘naltirish",
          "Suratga olish tugmasini bosish",
          "Olingan suratni tekshirish"
        ]
      },
      {
        "title": "USB xotiraga nusxa olish",
        "steps": [
          "USB xotirani kompyuterga ulash",
          "Manba faylni belgilab, nusxalash",
          "USB xotira papkasini ochish",
          "Faylni joylashtirib, yozish tugashini kutish",
          "Xavfsiz chiqarib, USB xotirani uzish"
        ]
      },
      {
        "title": "Sichqoncha bilan fayl ochish",
        "steps": [
          "Ko‘rsatkichni kerakli fayl belgisi ustiga olib borish",
          "Chap tugmani ikki marta tez bosish",
          "Faylga mos dastur ochilishini kutish",
          "Ochilgan fayl kerakli ekanini tekshirish"
        ]
      },
      {
        "title": "Klaviatura bilan matn kiritish",
        "steps": [
          "Matn muharririda yangi hujjat ochish",
          "Matn yozish joyini tanlash",
          "Klaviaturada kerakli matnni terish",
          "Xatolarni tekshirib, tuzatish",
          "Hujjatni saqlash"
        ]
      },
      {
        "title": "Quloqchinda ovozni tekshirish",
        "steps": [
          "Quloqchinni mos portga ulash",
          "Ovoz sozlamalarini ochish",
          "Quloqchinni chiqish qurilmasi sifatida tanlash",
          "Past ovozda sinov audiosini qo‘yish",
          "Ovozni qulay darajaga moslash"
        ]
      },
      {
        "title": "Monitor yorqinligini moslash",
        "steps": [
          "Monitor boshqaruv menyusini ochish",
          "Yorqinlik sozlamasini tanlash",
          "Yorqinlik qiymatini o‘zgartirish",
          "Ekran qulay ko‘rinayotganini tekshirish",
          "Menyudan chiqish"
        ]
      },
      {
        "title": "Kompyuterni to‘g‘ri o‘chirish",
        "steps": [
          "Ochiq hujjatlardagi o‘zgarishlarni saqlash",
          "Ishlayotgan dasturlarni yopish",
          "Tizim menyusidagi o‘chirish buyrug‘ini tanlash",
          "Kompyuter o‘chishini kutish"
        ]
      }
    ]
  }
];
if(typeof module === "object" && module.exports) module.exports=LESSON_TOPICS;
