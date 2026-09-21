# Yangilangan dars oqimi tekshiruvi
2026-09-21: talablar — 5/5/1 topshiriq, har metodga 300 soniya, 2/2/10 ball.
Testlar avval bajarildi: 7 ta talab testi yiqildi. Amalga oshirishdan keyin 17/17 test o'tdi.
Buyruq: node --test --experimental-test-coverage tests/*.test.cjs
Session-core: 100% qator, 94.83% shox; builder 100% qator; crossword 98.33% qator.
UI qamrovi avtomatik coverage hisobiga kiritilmagan.
Brauzer: rol tanlash, o'qituvchining dars yaratishi, o'quvchi bo'limida havolani kiritish, ism/sinf, beshta krossvord savoli, beshta xatoni top savoli, bitta algoritm va har uch Start uchun 05:00 tekshirildi. Uch metod qo'lda yakunlanib natija oynasi ochildi.
Timeout chegaralari sof qoidalar testida tekshirildi; brauzerda 15 daqiqa kutilmadi.
Sayt tashqi hostingga joylanmagan.

Parol yangilanishi: brauzerda noto‘g‘ri parol xabar chiqarishi va 12345 o‘qituvchi bo‘limini ochishi tekshirildi. 17/17 regressiya testi o‘tdi.

GitHub publishing update: 23/23 tests passed. New publishing module was absent at RED, then implemented; mock API tests cover create/update, sha, permission denial, conflict, invalid configuration, public payload and loading errors. Publishing module line coverage 100%, branch coverage 95.24%. No live GitHub write performed.
Browser verified: Student opens name/class directly; absent lesson displays an error; temporary local published JSON loads the network topic and all three method stages. Fixture removed after test. Teacher password, preparation and publishing fields verified. Actual GitHub credentials and repository are not configured.
