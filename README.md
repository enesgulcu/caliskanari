<<<<<<< HEAD
=======
## UNUTULMAMASI GEREKEN KONTROLE TABİ AYARLAR VE YERLER!

1- functions / other / Rate limit yapısında sayfalar ve api isteklerinin sürelerini iş bitiminde ekle

2- functions / other / regularCheckSystemData içinde "dataUpdateChecker" config dosyasını çekeceğin verilere göre yenile

3- "newSystemDataProcess" içerisinde "cookieTimeUpdate" fonksiyonu ile hangi aralıkta yenileme kontrol yapacağını belirleriz. süreyi oradan kontrol edebilirsin.

4- heroku gibi bir apiye adres sistemini entegre etmen gerekiyor (adreslerdeki benzer isimlendirmeyi düzeltmen gerekiyor)




NTOE:

###############################################################################################################
1- veri tabanına sürekli istek atan herkesin kullandığı componentleri 1 kere istek atıp veriyi localstorage yada cookie içinde depolarız ve belirli aralıklar ile bu verinin güncelliğini kontrol ederiz.

## bu şekilde çalışacak olan yapıları aşağıdaki gibi verilerini getirtebilirsin...

// verileri (cookie | localstorage | database) yönetimini sağlayan fonksiyon
//(database ismi | cookie veya localstorage ismi | api url)

-> const {data} = await NewSystemDataProcess("GeneralTopPageBanner", "localStorage", "localStorage", "/other/generalTopPageBanner");
###############################################################################################################