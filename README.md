# Informatika — dars laboratoriyasi

GitHub Pages uchun sayt. Bosh sahifa: O‘qituvchi va O‘quvchi.

## O‘qituvchi

1. O‘qituvchi bo‘limiga 12345 paroli bilan kiring.
2. Tayyor mavzulardan birini tanlab Darsni tayyorlash tugmasini bosing.
3. GitHub repository egasi, repository nomi, Pages branchi (odatda main) va papkasini (/ yoki /docs) kiriting.
4. GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens orqali token yarating. Faqat sayt repositorysini tanlang; Repository permissions → Contents → Read and write bering. Tokenni ushbu saytning o‘qituvchi oynasiga kiriting, hech kimga yubormang.
5. Darsni GitHub’ga e’lon qilish tugmasini bosing. Bu tanlangan branch/papkadagi current-lesson.json faylini yaratadi yoki almashtiradi va commit hosil qiladi.
6. Pages yangilanishini kuting. Saytda yangilanganini tekshirish tugmasi aynan tayyorlangan dars ochiqligini tasdiqlaydi. GitHub’ga yozilganlik sayt allaqachon yangilanganini anglatmaydi.

GitHub Pages Settings → Pages da Deploy from a branch, mos branch va / (root) yoki /docs tanlangan bo‘lishi kerak. Maxsus Actions orqali deploy alohida sozlashni talab qilishi mumkin. Branch himoyasi bevosita yozishni taqiqlasa, e’lon qilish xato qaytaradi.

GitHub API qo‘llanmasi: https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents

## O‘quvchi

O‘quvchilar bitta oddiy sayt manzilini ochadi. O‘quvchi tugmasidan keyin sinf va ism-familiya kiritiladi. Topshiriqlarga o‘tish bosilganda e’lon qilingan dars avtomatik yuklanadi. Alohida havola kiritilmaydi, token kerak emas.

Hali dars e’lon qilinmagan yoki internet uzilgan bo‘lsa, tushunarli xabar chiqadi; boshqa mavzu o‘rniga ko‘rsatilmaydi. Davom etayotgan urinish o‘qituvchi keyingi darsni e’lon qilganda o‘zgarmaydi. Bitta saytda bitta joriy dars mavjud.

## Metodlar

- Krossvord: 5 savol, har to‘g‘ri so‘zga 2 ball.
- Xatoni top: 5 savol, har to‘g‘ri javobga 2 ball.
- Algoritmni yig‘: bitta algoritm, to‘liq to‘g‘ri ketma-ketlik uchun 10 ball, aks holda 0.

Har metodga Boshlash tugmasidan 5 daqiqa. Tugaganda avtomatik baholanadi. Keyingi metod alohida boshlanadi. Uchinchi metod yakunlanganda natija va tabrik oynasi ochiladi. Jami 30 ball; o‘rtacha = jami / 3, maksimal 10 ball.

Tayyor mavzular: kompyuter tarmoqlari; algoritmlar va dasturlash; kompyuter qurilmalari. AI ishlatilmaydi.

## Saqlash va kirish

GitHub’da faqat mavzu identifikatori, dars versiyasi va topshiriqlarni bir xil yaratadigan seed saqlanadi. Tayyor savollar sayt fayllarida mavjud. Dars sozlamasi va eski commitlar GitHub’da saqlanib qoladi.

Ism, sinf, javob va natija GitHub’ga yuborilmaydi; faqat sahifa xotirasida. Yangilash yoki yopish urinishni o‘chiradi. Cookie, localStorage, sessionStorage, IndexedDB yo‘q. Token faqat e’lon qilish so‘rovida api.github.com manziliga yuboriladi, maydoni darhol tozalanadi va diskka yozilmaydi.

12345 oddiy interfeys to‘sig‘i; kodni tekshirgan odam chetlab o‘tishi mumkin. GitHub’ga yozish haqiqiy ruxsati token orqali tekshiriladi.

## Saytni yuklash

Repositorydagi Pages papkasiga index.html, style.css, app.js, session-core.js, lesson-data.js, lesson-builder.js, crossword.js va publishing.js fayllarini joylang. current-lesson.json birinchi muvaffaqiyatli e’lon qilishda yaratiladi. Oldin mavjud bo‘lsa, oddiy sayt yangilashda uni o‘chirmang.

Bu paket GitHub’ga hali yuklanmagan. Haqiqiy repository va token bilan e’lon qilish sinovdan o‘tkazilmagan.

## Tekshirish

node --test --experimental-test-coverage tests/*.test.cjs

GitHub API testlari soxta javoblar bilan ishlaydi, haqiqiy repositoryni o‘zgartirmaydi.
